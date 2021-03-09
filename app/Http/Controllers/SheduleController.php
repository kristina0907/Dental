<?php

namespace App\Http\Controllers;



use App\Events\AddRecordToShedule;
use App\Events\ChangeRecordStatus;
use App\Events\LiveFeedUpdate;
use App\Models\Branch;
use App\Models\Cabinet;
use App\Models\Directions;
use App\Models\Doctors;
use App\Models\DoctorShedule;
use App\Models\EmployerInfo;
use App\Models\LiveFeed;
use App\Models\PatientAdress;
use App\Models\PatientCard;
use App\Models\PatientContact;
use App\Models\PatientPolice;
use App\Models\Profession;
use App\Models\Shedule;
use App\Models\ToothCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SheduleController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getFiltersData(Request $request)
    {
        if (!empty($request)) {
            $professions = Profession::all();
            $branches = Branch::all();
            $output = array();
            $output['professions'] = $professions;
            $output['branches'] = $branches;

            if(!empty($request->branch_id) && !empty($request->profession_id))
            {
                $output['doctors'] = $this->getDoctorsFromFilters($request);
            }
            return response()->json([$output], 200);
        } else {
            return response()->json([
                'error' => 'Bad ID directions'
            ], 201);

        }
    }


    private function getDoctorsFromFilters(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'branch_id '=>$request->branch_id,
                'profession_id'=>$request->profession_id
            ]);
            if(!$errors)
            {

                $doctors = User::whereHas('employerInfos',function ($q) use ($request){
                    $q->where('branch_id',checkInput($request->branch_id));

                    $q->whereHas('professions',function ($r) use($request){
                        $r->where('profession_id',checkInput($request->profession_id));
                    });
                })->get();

                if(!empty($doctors))
                {
                    return $doctors;
                }
                else
                {
                    return array();
                }

            }
        }
        else
        {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getSheduleDirectionsAndLoading(Request $request)
    {

        if (!empty($request->current_date)) {
            $current = strtotime(checkInput($request->current_date));
            $current = date('Y-m-d', $current);
            if (!empty($current)) {
                $start = date('Y-m-01', strtotime($current));
                $end = date('Y-m-t', strtotime($current));
            }

            if (!empty($start) && !empty($end)) {
                $shedule = Shedule::where('date', '>=', $start)
                    ->where('date', '<=', $end)
                    ->where('active', true)
                    ->orderBy('date', 'asc')
                    ->get()->groupBy('date');

                $time_count = array();
                if (!empty($shedule)) {
                    foreach ($shedule as $key => $records) {
                        if (!empty($records) && count($records) > 0) {
                            foreach ($records as $record) {

                                $time_diff = (int)(strtotime($record->time_end) - strtotime($record->time_start)) / (int)60;
                                if (!empty($time_count[$record->date][$key])) {

                                    $time_count[$record->date][$key]['minutes'] = (int)$time_count[$record->date][$key]['minutes'] + (int)$time_diff;
                                    $time_count[$record->date][$key]['records'][] = $record;
                                } else {
                                    $time_count[$record->date][$key]['minutes'] = (int)$time_diff;
                                    $time_count[$record->date][$key]['records'][] = $record;
                                }

                            }
                        }
                    }
                }

                $doctors_shedule = DB::table('doctor_shedules')
                    ->select(DB::raw('count(id) as doctors_count, date'))
                    ->where('date', '>=', $start)
                    ->where('date', '<=', $end)
                    ->groupBy('date')
                    ->orderBy('date', 'asc')
                    ->get()->toArray();

                if (!empty($doctors_shedule) && !empty($shedule)) {
                    foreach ($doctors_shedule as $ds) {
                        $ds->max_loading = (int)$ds->doctors_count * (int)300;
                    }
                    foreach ($time_count as $key => $count) {

                        foreach ($doctors_shedule as $dh) {

                            if ($dh->date == $key) {
                                $dh->loading = round(((int)$count[$key]['minutes'] / (int)$dh->max_loading) * (int)100);
                                $dh->count_records = count($count[$key]['records']);
                                $dh->count_time = $count[$key]['minutes'];
                            }
                        }
                    }
                }
                $professions = Profession::all()->toArray();
                $output = array();
                $output['professions'] = $professions;
                $output['loading'] = $doctors_shedule;
                if (!empty($output)) {
                    return response()->json(['success' => 'Data successfully loaded', 'output' => $output, 'loading' => $output['loading']], 200);
                }
            }
        } else {
            return response()->json(['error' => 'Not valid data'], 201);
        }

    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function statusChange(Request $request)
    {
        if (!empty($request) && !empty($request->record_id) && !empty($request->status_id)) {
            $record = Shedule::find($request->record_id);
            if (!empty($record) && !empty($record->id)) {
                $record->status_id = checkInput($request->status_id);
                if ($record->save()) {
                    $output = $this->getDoctorsShedule($request);
                    if ($output) {
                        event(new ChangeRecordStatus($output));
                    }
                    return response()->json([
                        'success' => 'Record successfylly updated',
                        'record' => $record
                    ]);
                }
            } else {
                return response()->json([
                    'error' => 'Record not found check record_id param',
                    'request' => $request->record_id
                ]);
            }
        }
        return response()->json([
            'error' => 'record_id or status_id is invalid',
            'request' => $request
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDoctorsToFilters(Request $request)
    {


        if (!empty($request) && !empty($request->branch_id) && !empty($request->profession_id)) {
            $doctors = User::whereHas('roles', function ($q) {
                $q->where('name', 'doctor');
            })->whereHas('employerInfos.professions', function ($query) use ($request) {
                $query->where('profession_id', $request->profession_id);
            })->whereHas('employerInfos.branch', function ($b) use ($request) {
                $b->where('branch_id', $request->branch_id);
            })->with(['employerInfos', 'employerInfos.professions'])->get()->toArray();

            if (!empty($doctors) && count($doctors) > 0) {
                return response()->json(['success' => "doctors successfully found", 'doctors' => $doctors], 200);
            } else {
                return response()->json(['error' => "doctors not found", 'doctors' => $doctors], 201);
            }
        } else {
            return response()->json(['error' => 'branch_id or profession_id is invalid'], 201);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getLiveFeed()
    {

        $feeds = LiveFeed::where('active', true)->where('status', 'cancel')->with(['doctor', 'patient.contacts'])->orderBy('updated_at', 'desc')->get();

        $output = array();
        if (!empty($feeds)) {
            foreach ($feeds as $key => $feed) {
                if ($feed->patient()->exists()) {
                    $output[$key]['date'] = $feed->date;
                    $output[$key]['time'] = $feed->time;
                    $output[$key]['cancel_reason'] = $feed->cancel_reason;
                    $output[$key]['cancel_reason_detail'] = $feed->cancel_reason_detail;
                    if ($feed->doctor()->exists()) {
                        $output[$key]['doctor_name'] = $feed->doctor->family . ' ' . $feed->doctor->name . ' ' . $feed->doctor->surname;
                    } else {
                        $output[$key]['doctor_name'] = 'Он тут обязательно появится,когда мы переделаем расписание';
                    }

                    $output[$key]['user_name'] = $feed->patient->name;
                    if (!empty($feed->patient->contacts)) {
                        foreach ($feed->patient->contacts as $contact) {
                            $output[$key]['phone'][] = $contact->phone;
                        }
                    }
                }

            }
            return response()->json($output, 200);
        }
        return response()->json($output, 201);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getRecords(Request $request)
    {

        if (!empty($request->date) && !empty($request->branch_id)) {
            $output = array();

            $doctors = DoctorShedule::where('branch_id', checkInput($request->branch_id))
                ->where('date', checkInput($request->date))
                ->with(['cabinets', 'doctors', 'branches'])
                ->get()
                ->groupBy('smena');

            if (!empty($doctors)) {
                foreach ($doctors as $key => $smena) {

                    foreach ($smena as $shedule) {
                        if($shedule->doctors()->exists())
                        {
                            $output[$key]['cabinet'][$shedule->cabinets->id]['doctor'] = $shedule->doctors;
                            $output[$key]['cabinet'][$shedule->cabinets->id]['doctor_name'] = $this->cropName($shedule->doctors->name);
                        }
                       if($shedule->cabinets()->exists())
                       {
                           $output[$key]['cabinet'][$shedule->cabinets->id]['cabinet_name'] = $shedule->cabinets->name;
                           $output[$key]['cabinet'][$shedule->cabinets->id]['cabinet_color'] = $shedule->cabinets->color;
                       }
                        $output[$key]['cabinet'][$shedule->cabinets->id]['patients'] =
                            Shedule::where('doctor_id', $shedule->doctors->id)
                            ->where('date', checkInput($request->date))
                            ->where('active', true)
                            ->with(['patients'])
                            ->get();
                    }
                }
                return response()->json(['success' => 'Doctors successfully found', 'smena' => $output], 200);
            }
            return response()->json(['error' => 'Doctors not found', 'smena' => $output], 201);
        }
        return response()->json(['error' => 'Bad request'], 201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    //TODO проверить нужен еще этот метод или удалять
    public function getDoctorsSheduleFromDate(Request $request)
    {
        if(!empty($request))
        {
            if(!empty($request->branch_id) && !empty($request->current_date))
            {
                $current = strtotime(checkInput($request->current_date));
                $current = date('Y-m-d', $current);
                if (!empty($current)) {
                    $start = date('Y-m-01', strtotime($current));
                    $end = date('Y-m-t', strtotime($current));
                }

                if (!empty($start) && !empty($end)) {
                    $shedule = DoctorShedule::where('date', '>=', $start)
                        ->where('date', '<=', $end)
                        ->where('active', true)
                        ->orderBy('date', 'asc')
                        ->with(['cabinets', 'doctors'])
                        ->get()
                        ->groupBy('date');
                }
                $cabintets = Cabinet::where('branch_id',checkInput($request->branch_id))->get();
                $doctors = User::whereHas('roles',function ($q){
                    $q->where('name','doctor');
                })->get();
                if(!empty($shedule))
                {
                    return response()->json(['success' => 'Shedules successfully found','doctors'=>$doctors, 'cabinets'=>$cabintets,'shedules' => $shedule],200);
                }else{
                    return response()->json(['error' => 'Shedules not found'], 201);
                }
            }
            return response()->json(['error' => 'current_date or branch_id is invalid'], 201);
        }
        return response()->json(['error' => 'Bad request'], 201);
    }
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */

    public function addRecord(Request $request)
    {
        if(!empty($request->email))
        {
            $exist = User::where('email',$request->email)->first();
            if($exist)
            {
                return response()->json(['type'=>'error','error'=>'User with that email is exist','user'=>$exist],201);
            }
            else{
                $errors= checkParamsIsExists([
                    'email'    => $request->email,
                    'family'   => $request->family,
                    'name'     => $request->name,
                    'surname'  => $request->surname,
                    'birthday' => $request->birthday,
                    'gender'   => $request->gender,
                    'insurance'=> $request->insurance,
                    'insuranceFrom'=>$request->insuranceFrom,
                    'insuranceUntill'=>$request->insuranceUntill,
                    'city'=>$request->city,
                    'street'=>$request->street,
                    'house' =>$request->house,
                    'phone'=>$request->phone,
                ]);
                if(!$errors)
                {
                   $user = $this->createNewUser($request);
                   $patient_card = $this->createNewPatientCard($request);
                   $user->patientCards()->sync([$patient_card->id]);

                   $this->createNewToothCard($user,$patient_card);

                   $polices = $this->createNewPolices($request);
                   $user->polices()->sync([$polices->id]);

                   $adresses = $this->createNewAdress($request);
                   $user->adresses()->sync([$adresses->id]);

                   $contacts = $this->createNewContacts($request);
                   $user->contacts()->sync([$contacts->id]);
                   $shedule = [];
                   if(!empty($request->time_start) && !empty($request->time_end) && !empty($request->date) && !empty($request->doctor_id))
                   {
                       $shedule = $this->createNewSheduleRecord($request,$user);

                       if(!empty($shedule) && !empty($shedule['exist']))
                       {
                           return response()->json(['error'=>'Time is not empty','shedule'=>$shedule],201);
                       }

                       $output = $this->getDoctorsShedule($request);
                       if($output)
                       {
                           event(new AddRecordToShedule($output));
                       }
                   }
                   $user->card = $patient_card;
                   $user->contacts = $contacts;
                   $user->adresses = $adresses;
                   $user->shedule  = $shedule;

                    return response()->json(['type'=>'ok','patient'=>$user],200);
                }
                else{
                    return response()->json(['type'=>'error','message'=>$errors],201);
                }

            }
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateRecord(Request $request)
    {
        if(!empty($request->id))
        {
            $record = Shedule::find($request->id);
            if(!empty($record->id))
            {
                $exist = Shedule::where('date',checkInput($request->date))
                    ->where('branch_id',checkInput($request->branch_id))
                    ->where('doctor_id',checkInput($request->doctor_id))
                    ->where('active',true)
                    ->where('time_start','>=',checkInput($request->time_start))
                    ->where('time_end','<=',checkInput($request->time_end))->first();
                if(!empty($exist) && !empty($exist->id))
                {
                    return response()->json(['exist'=>$exist,'error'=>"This time is not empty"]);
                }
                $record->time_start = checkInput($request->time_start);
                $record->time_end = checkInput($request->time_end);
                $record->date = checkInput($request->date);
                $record->doctor_id = (int)checkInput($request->doctor_id);
                if(!empty($request->patient_id))
                {
                    $record->patient_id = (int)checkInput($request->patient_id);
                }
                $record->save();
                $output = $this->getDoctorsShedule($request);
                if($output)
                {
                    event(new AddRecordToShedule($output));
                }
                return response()->json(['type'=>'ok'],200);
            }
            return response()->json(['type'=>'error','errors'=>'not found record with that ID']);
        }
        return response()->json(['type'=>'error','errors'=>'Not valid ID']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function cancelRecord(Request $request)
    {
        if(!empty($request->id))
        {
            $record = Shedule::find($request->id);

            if(!empty($record->id))
            {
                $record->active = false;
                if(!empty($request->comment))
                {
                    $record->comment = checkInput($request->comment);
                }

                $record->date = checkInput($request->date);
                if($record->save())
                {
                    $output = $this->getDoctorsShedule($record);
                    if($output)
                    {
                        event(new AddRecordToShedule($output));
                    }
                    $livefeed = new LiveFeed();
                    $livefeed->date = checkInput($request->date);
                    $livefeed->time = checkInput($request->time_start);
                    $livefeed->cancel_reason = checkInput($request->reason);
                    $livefeed->cancel_reason_detail = checkInput($request->reasonDetails);
                    $livefeed->status = 'cancel';
                    $livefeed->active = true;
                    $livefeed->patient_id = $record->patients->id;
                    $livefeed->doctor_id = $record->doctors->id;
                    if($livefeed->save())
                    {
                        $feeds= LiveFeed::where('active',true)->where('status','cancel')->with(['doctor','patient.contacts'])->orderBy('updated_at','desc')->get();
                        $output = array();
                        if(!empty($feeds))
                        {
                            foreach ($feeds as $key => $feed)
                            {
                                if($feed->patient()->exists())
                                {
                                    $output[$key]['date'] = $feed->date;
                                    $output[$key]['time'] = $feed->time;
                                    $output[$key]['cancel_reason'] = $feed->cancel_reason;
                                    $output[$key]['cancel_reason_detail'] = $feed->cancel_reason_detail;
                                    if($feed->doctor()->exists())
                                    {
                                        $output[$key]['doctor_name'] = $feed->doctor->family . ' '. $feed->doctor->name . ' ' . $feed->doctor->surname;
                                    }else
                                    {
                                        $output[$key]['doctor_name'] = 'Он тут обязательно появится,когда мы переделаем расписание';
                                    }

                                    $output[$key]['user_name'] = $feed->patient->name;
                                    if(!empty($feed->patient->contacts))
                                    {
                                        foreach ($feed->patient->contacts as $contact)
                                        {
                                            $output[$key]['phone'][] = $contact->phone;
                                        }
                                    }
                                }
                            }
                        }
                        event(new LiveFeedUpdate($output));
                        return response()->json(['type'=>'ok'],200);
                    }
                }
            }
            return response()->json(['type'=>'error','errors'=>'not found record with that ID']);
        }
        return response()->json(['type'=>'error','errors'=>'Not valid ID']);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */


    public function updatePatient(Request $request)
    {
        if(!empty($request->user_id))
        {
            $exist = User::where('id',$request->user_id)->first();
            if($exist)
            {
                $errors= checkParamsIsExists([
                    'email'    => $request->email,
                    'family'   => $request->family,
                    'name'     => $request->name,
                    'surname'  => $request->surname,
                    'birthday' => $request->birthday,
                    'gender'   => $request->gender,
                    'insurance'=> $request->insurance,
                    'insuranceFrom'=>$request->insuranceFrom,
                    'insuranceUntill'=>$request->insuranceUntill,
                    'city'=>$request->city,
                    'street'=>$request->street,
                    'house' =>$request->house,
                    'phone'=>$request->phone,
                ]);
                if(!$errors)
                {
                    $user = $this->createNewUser($request);

                    $patient_card = $this->createNewPatientCard($request);
                    $user->patientCards()->sync([$patient_card->id]);

                    $this->createNewToothCard($user,$patient_card);

                    $polices = $this->createNewPolices($request);
                    $user->polices()->sync([$polices->id]);

                    $adresses = $this->createNewAdress($request);
                    $user->adresses()->sync([$adresses->id]);

                    $contacts = $this->createNewContacts($request);
                    $user->contacts()->sync([$contacts->id]);

                    return response()->json(['type'=>'ok'],200);
                }
                else{
                    return response()->json(['type'=>'error','message'=>$errors],201);
                }


            }
            return response()->json(['error'=>'User with that id is not exist'],201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */

    public function addPatientToShedule(Request $request)
    {
        if(!empty($request)  && !empty($request->doctor_id)  && !empty($request->date) && !empty($request->time_start) && !empty($request->time_end))
        {
            if(!empty($request->patient_id))
            {
                $user =  User::find($request->patient_id);
                if(!empty($user))
                {
                    $shedule = $this->createNewSheduleRecord($request,$user);
                    if(!empty($shedule) && !empty($shedule['exist']))
                    {
                        return response()->json(['error'=>'Time is not empty','shedule'=>$shedule],201);
                    }
                    $output = $this->getDoctorsShedule($request);
                    if($output)
                    {
                        event(new AddRecordToShedule($output));
                    }

                    return response()->json(['success'=>'Shedule succefully created','type'=>'ok','id'=>$user->id],200);
                }
            }
            else
            {
                $user = $this->createNewUser($request);

                $patient_card = $this->createNewPatientCard($request);
                $user->patientCards()->sync([$patient_card->id]);

                $this->createNewToothCard($user,$patient_card);

                $polices = $this->createNewPolices($request);
                $user->polices()->sync([$polices->id]);

                $adresses = $this->createNewAdress($request);
                $user->adresses()->sync([$adresses->id]);

                $contacts = $this->createNewContacts($request);
                $user->contacts()->sync([$contacts->id]);

                if(!empty($user))
                {
                    $shedule = $this->createNewSheduleRecord($request,$user);
                    if(!empty($shedule) && !empty($shedule['exist']))
                    {
                        return response()->json(['error'=>'Time is not empty','shedule'=>$shedule],201);
                    }
                    $output = $this->getDoctorsShedule($request);
                    if($output)
                    {
                        event(new AddRecordToShedule($output));
                    }
                    return response()->json(['success'=>'Shedule succefully created','type'=>'ok','id'=>$user->id],200);
                }

                return response()->json(['type'=>'ok'],200);
            }


        }
        return response()->json(['error'=>'doctor_id ,date,time_start or time_end is invalid'],201);
    }

    /**
     * @param $data
     * @return false
     */

    private function getDoctorsShedule($data)
    {
        if(!empty($data->branch_id) && !empty($data->date))
        {
            $doctors = DoctorShedule::where('branch_id',checkInput($data->branch_id))->where('date',checkInput($data->date))->with(['cabinets','doctors','branches'])->get()->groupBy('smena');

            if(!empty($doctors))
            {
                foreach ($doctors as  $key => $smena)
                {
                    foreach ($smena as $shedule)
                    {
                        $output[$key]['cabinet'][$shedule->cabinets->id]['doctor'] = $shedule->doctors;
                        $output[$key]['cabinet'][$shedule->cabinets->id]['doctor_name'] = $this->cropName($shedule->doctors->name);
                        $output[$key]['cabinet'][$shedule->cabinets->id]['cabinet_name'] = $shedule->cabinets->name;
                        $output[$key]['cabinet'][$shedule->cabinets->id]['cabinet_color'] = $shedule->cabinets->color;
                        $output[$key]['cabinet'][$shedule->cabinets->id]['patients'] = Shedule::where('doctor_id',$shedule->doctors->id)->where('date',checkInput($data->date))->where('active',true)->with(['patients'])->get(); ;
                    }
                }
                return $output;
            }
        }
        return false;

    }


    /**
     * @param $data
     * @return User
     * @throws \Exception
     */

    private function createNewUser($data)
    {
        $user = new User();
        $user->email = checkInput($data->email);
        $user->name = checkInput($data->family) . ' ' . checkInput($data->name) . ' ' . checkInput($data->surname);
        $user->password = Hash::make(random_bytes(42));
        $user->save();
        $user->roles()->sync([2]);
        return $user;
    }


    /**
     * @param $data
     * @return PatientCard
     */

    private function createNewPatientCard($data)
    {
        $patient_card = new PatientCard();
        $patient_card->status = '1';
        $patient_card->surname = checkInput($data->family);
        $patient_card->name = checkInput($data->name);
        $patient_card->patronymic = checkInput($data->surname);
        $patient_card->born_date = checkInput($data->birthday);
        $patient_card->gender = checkInput($data->gender);
        $patient_card->marketing = checkInput($data->marketing);
        $patient_card->parent = checkInput($data->parent);
        $patient_card->archive_info = 'false';
        $patient_card->save();
        return $patient_card;
    }

    /**
     * @param $user
     * @param $patient_card
     * @return ToothCard
     */

    private function createNewToothCard($user,$patient_card)
    {
        $toothCard = new ToothCard();
        $toothCard->name = "Зубная карта пациента " .$user->name . ".";
        $toothCard->patients_card_id = $patient_card->id;
        $toothCard->public = '1';
        $toothCard->save();

        return $toothCard;
    }

    /**
     * @param $data
     * @return PatientPolice
     */

    private function createNewPolices($data)
    {
        $polices = new PatientPolice();
        $polices->name = checkInput($data->insurance);
        $polices->description = checkInput($data->description);
        $polices->date_start = checkInput($data->insuranceFrom);
        $polices->date_end = checkInput($data->insuranceUntill);
        $polices->save();

        return $polices;
    }

    /**
     * @param $data
     * @return PatientAdress
     */

    private function createNewAdress($data)
    {
        $adresses = new PatientAdress();
        $adresses->city = checkInput($data->city);
        $adresses->street = checkInput($data->street);
        $adresses->house = checkInput($data->house);
        $adresses->corpus = checkInput($data->building);
        $adresses->flat = checkInput($data->flat);
        $adresses->save();
        return $adresses;
    }

    /**
     * @param $data
     * @return PatientContact
     */

    private function createNewContacts($data)
    {
        $contacts = new PatientContact();
        $contacts->phone = checkInput($data->phone);
        $contacts->sms_inform = '1';
        $contacts->save();
        return $contacts;
    }

    /**
     * @param $data
     * @param $user
     * @return Shedule
     */

    private function  createNewSheduleRecord($data,$user)
    {
        $errors = checkParamsIsExists([
            'date'=>$data->date,
            'time_start'=>$data->time_start,
            'time_end'=>$data->time_end,
            'patient_id'=>$user->id,
            'doctor_id'=>$data->doctor_id,
            'branch_id'=>$data->branch_id,
        ]);
        if(!$errors)
        {
            $exist = Shedule::where('date',checkInput($data->date))
                ->where('branch_id',checkInput($data->branch_id))
                ->where('doctor_id',checkInput($data->doctor_id))
                ->where('active',true)
                ->where('time_start','>=',checkInput($data->time_start))
                ->where('time_end','<=',checkInput($data->time_end))->first();
            if(!empty($exist) && !empty($exist->id))
            {
                return array('exist'=>$exist,'error'=>"This time is not empty");
            }
            else{
                $shedule = new Shedule();
                $shedule->date = checkInput($data->date);
                $shedule->time_start = checkInput($data->time_start);
                $shedule->time_end = checkInput($data->time_end);
                $shedule->patient_id = $user->id;
                $shedule->doctor_id = checkInput($data->doctor_id);
                $shedule->branch_id = checkInput($data->branch_id);
                $shedule->direction_id = 1;//TODO придумать че тут хранить
                $shedule->action_id = checkInput($data->action_id);
                $shedule->status_id = checkInput($data->status_id);
                $shedule->active = true;
                if(!empty($data->comment))
                {
                    $shedule->comment = checkInput($data->comment);
                }
                $shedule->save();

                return array('shedule'=>$shedule);
            }

        }
        return  false;
    }


    /**
     * @param $name
     * @return string
     */

    private function cropName($name)
    {
        $output = '';
        if (!empty($name))
        {
            $arr = explode(' ',$name);
            if(count($arr) > 0)
            {
                foreach ($arr as $key=> $a)
                {
                    if($key == 0)
                    {
                        $output = $a . " ";
                    }
                    else{
                        $output = $output .  mb_strimwidth($a, 0, 1) . '.';
                    }
                }
            }
        }
        return $output;
    }

    /**
     * @param $professions
     * @return array
     */

    /*
    private function filterBranches($professions)
    {
        $output = array();
        foreach ($professions as $p=> $profession)
        {
            if(!empty($profession->employers))
            {
                foreach ($profession->employers as $key => $employer)
                {
                    if($employer->exists('branch') && $employer->exists('professions') && $employer->exists('user'))
                    {
                        if(!empty($employer->user))
                        {
                            $output[$employer->branch->id]['branch']['id'] = $employer->branch->id;
                            $output[$employer->branch->id]['branch']['title'] = $employer->branch->title;
                            $output[$employer->branch->id]['branch']['professions'][$profession->id][$p] = array(
                                'id'=>$profession->id,
                                'name'=>$profession->name
                            );
                           // $output[$employer->branch->id]['branch']['professions'][$profession->id][$p]['id'] = $profession->id;
                            //$output[$employer->branch->id]['branch']['professions'][$profession->id][$p]['name'] = $profession->name;
                            $output[$employer->branch->id]['branch']['professions'][$profession->id][$p]['users'][] = $employer->user;
                        }

                    }
                }
            }

        }

        return $output;
    }
    */


}
