<?php

namespace App\Http\Controllers;

use App\Events\AddRecordToDoctorShedule;
use App\Models\Branch;
use App\Models\Cabinet;
use App\Models\DoctorShedule;
use App\Models\Profession;
use App\Models\User;
use Faker\Provider\PhoneNumber;
use http\Env\Response;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

class DoctorShedulesController extends Controller
{


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDoctorsSheduleFromFilters(Request $request)
    {
        if (!empty($request)) {
            $cabintets = Cabinet::all();
            $professions = Profession::all();
            $branches = Branch::all();

            if (!empty($request->branch_id) && !empty($request->current_date)) {

                $current = strtotime(checkInput($request->current_date));
                $current = date('Y-m-d', $current);

                if (!empty($current)) {
                    $start = date('Y-m-01', strtotime($current));
                    $end = date('Y-m-t', strtotime($current));
                }

                if (!empty($request->profession_id)) {
                    //search shedules with branch_id profession_id and doctor_id
                    if (!empty($request->doctor_id)) {
                        if (!empty($start) && !empty($end)) {
                            $shedule = $this->getDoctorsSheduleWithFiltersProfessionsAndDoctors($start, $end, $request);
                        }
                        if (!empty($shedule)) {
                            if (is_array($request->doctor_id)) {
                                $doctor_ids = $request->doctor_id;
                            } else {
                                $doctor_ids = json_decode($request->doctor_id);
                            }
                            $doctors =
                                User::whereHas('employerInfos.professions', function ($q) use ($request) {
                                    $q->where('profession_id', $request->profession_id);
                                })
                                    ->whereHas('roles', function ($q) {
                                        $q->where('name', 'doctor');
                                    })->whereIn('id', $doctor_ids)
                                    ->with(['employerInfos', 'employerInfos.professions'])
                                    ->get();

                            return response()->json(['success' => 'Shedules successfully found', 'doctors' => $doctors, 'cabinets' => $cabintets, 'professions' => $professions, 'branches' => $branches, 'shedules' => $shedule], 200);
                        } else {
                            return response()->json(['error' => 'Shedules not found'], 201);
                        }
                    } else {
                        //search shedules with branch_id profession_id
                        if (!empty($start) && !empty($end)) {
                            $shedule = $this->getDoctorsSheduleWithFiltersProfessions($start, $end, $request);
                        }

                        if (!empty($shedule)) {
                            $doctors = User::whereHas('employerInfos.professions', function ($q) use ($request) {
                                $q->where('profession_id', $request->profession_id);
                            })->whereHas('roles', function ($q) {
                                $q->where('name', 'doctor');
                            })->with(['employerInfos', 'employerInfos.professions'])
                                ->get();
                            return response()->json(['success' => 'Shedules successfully found', 'doctors' => $doctors, 'cabinets' => $cabintets, 'professions' => $professions, 'branches' => $branches, 'shedules' => $shedule], 200);
                        } else {
                            return response()->json(['error' => 'Shedules not found'], 201);
                        }
                    }
                } else {   //search only  branch_id
                    if (!empty($start) && !empty($end)) {
                        $shedule = $this->getDoctorsSheduleWithFiltersFromBranch($start, $end, $request);
                    }
                    if (!empty($shedule)) {
                        $doctors = User::whereHas('roles', function ($q) {
                            $q->where('name', 'doctor');
                        })
                            ->with(['employerInfos', 'employerInfos.professions'])
                            ->get();
                        return response()->json(['success' => 'Shedules successfully found', 'doctors' => $doctors, 'cabinets' => $cabintets, 'professions' => $professions, 'branches' => $branches, 'shedules' => $shedule], 200);
                    } else {
                        return response()->json(['error' => 'Shedules not found'], 201);
                    }
                }
            } else {
                return response()->json(['error' => 'current_date or branch_id is invalid'], 201);
            }
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDoctorsSheduleFromDate(Request $request)
    {
        if (!empty($request)) {
            if (!empty($request->branch_id) && !empty($request->current_date)) {
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
                $cabintets = Cabinet::where('branch_id', checkInput($request->branch_id))->get();
                $doctors = User::whereHas('roles', function ($q) {
                    $q->where('name', 'doctor');
                })->get();
                if (!empty($shedule)) {
                    return response()->json(['success' => 'Shedules successfully found', 'doctors' => $doctors, 'cabinets' => $cabintets, 'shedules' => $shedule], 200);
                } else {
                    return response()->json(['error' => 'Shedules not found'], 201);
                }
            }
            return response()->json(['error' => 'current_date or branch_id is invalid'], 201);
        }
        return response()->json(['error' => 'Bad request'], 201);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getBranchesWithCabinets()
    {
        $branches = Branch::with('cabinets')->get();
        if (!empty($branches)) {
            return response()->json(['success' => 'Branches with cabinets successfully loaded', 'branches' => $branches], 200);
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createRecord(Request $request)
    {
        if (!empty($request)) {

            $errors = checkParamsIsExists([
                'branch_id' => $request->branch_id,
                'cabinet_id' => $request->cabinet_id,
                'smena' => $request->smena,
                'doctor_id' => $request->doctor_id,
                'dates' => $request->dates
            ]);
            if (!$errors) {


                $dates = checkIsArrayOrString($request->dates);

                $records = $this->createSheduleRecord($request,$dates);

                if(!empty($records['errors']) && count($records['errors']) > 0)
                {
                    return response()->json(['error'=>'Date is not empty','errors'=>$records],404);
                }
                if (count($records['created']) > 0 || count($records['updated']) > 0 )
                {
                    return response()->json(['success' => 'Record successfully created', 'record' => $records], 200);
                }
            } else {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }



    /**
     * @param $exist_record
     * @param $request
     * @return array
     */

    private function updateExistsRecord($exist_record,$request)
    {
        $output = array();
        if(!empty($exist_record))
        {
            $exist = $this->checkIsHasEmptySmena($request,$exist_record);
            if(!empty($exist))
            {
                foreach ($exist as $e)
                {
                    if((bool)$e['value_smena'] !== (bool) $exist_record->active)
                    {
                        $exist_record->active = (bool)$e['value_smena'];
                        $exist_record->save();
                        $output[] = $exist_record;
                    }
                }
            }
        }

        return $output;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateRecord(Request $request)
    {
        if (!empty($request)) {
            $errors = checkParamsIsExists([
                'branch_id' => $request->branch_id,
                'cabinet_id' => $request->cabinet_id,
                'smena' => $request->smena,
                'doctor_id' => $request->doctor_id,
                'date' => $request->date,
                'id' => $request->id,
            ]);
            if (!$errors) {
                $record = DoctorShedule::find($request->id);
                if (!empty($record)) {
                    $record->date = checkInput($request->date);
                    $record->smena = checkInput($request->smena);
                    $record->doctor_id = checkInput($request->doctor_id);
                    $record->cabinet_id = checkInput($record->cabinet_id);
                    $record->active = true;

                    if (!empty($request->time_start)) {
                        $record->time_start = checkInput($request->time_start);
                    }

                    if (!empty($request->time_end)) {
                        $record->time_end = checkInput($request->time_end);
                    }

                    if (!empty($request->comment)) {
                        $record->comment = checkInput($request->comment);
                    }
                    if ($record->save()) {
                        $current = strtotime(checkInput($request->date));
                        $current = date('Y-m-d', $current);
                        if (!empty($current)) {
                            $start = date('Y-m-01', strtotime($current));
                            $end = date('Y-m-t', strtotime($current));
                        }
                        $output = DoctorShedule::where('date', '>=', $start)
                            ->where('date', '<=', $end)
                            ->where('branch_id', checkInput($request->branch_id))
                            ->get();
                        if ($output) {
                            event(new AddRecordToDoctorShedule($output));
                        }
                        return response()->json(['success' => 'Record successfully updated', 'record' => $record], 200);
                    }
                } else {
                    return response()->json(['error' => 'Doctor shedule not found with this ID'], 201);
                }
            } else {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteRecord(Request $request)
    {
        if (!empty($request)) {
            $errors = checkParamsIsExists([
                'branch_id' => $request->branch_id,
                'cabinet_id' => $request->cabinet_id,
                'doctor_id' => $request->doctor_id,
                'dates' => $request->dates,
            ]);

            if (!$errors) {
                if (is_array($request->dates)) {
                    $dates = $request->dates;
                } else {
                    $dates = json_decode($request->dates);
                }
                foreach ($dates as $date) {
                    $records = $this->findRecordsByDateAndDoctorId($date, checkInput($request->doctor_id), checkInput($request->cabinet_id), checkInput($request->branch_id));
                    if (count($records) > 0) {
                        foreach ($records as $record) {
                            $record->delete();
                        }
                        return response()->json(['success' => 'Records deleted successfully'], 200);
                    } else {
                        return response()->json(['error' => 'Records not found'], 201);
                    }
                }
            } else {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param $date
     * @param $doctor_id
     * @param $cabinet_id
     * @param $branch_id
     * @return array
     */

    private function findRecordsByDateAndDoctorId($date, $doctor_id, $cabinet_id, $branch_id)
    {
        if (!empty($date) && !empty($doctor_id)) {
            $output = DoctorShedule::where('doctor_id', $doctor_id)
                ->where('date', $date)
                ->where('cabinet_id', $cabinet_id)
                ->where('branch_id', $branch_id)
                ->get();
            if (!empty($output)) {
                return $output;
            }
        }
        return array();
    }

    /**
     * @param $request
     * @param $date
     * @return bool
     */

    private function checkIfDateNotEmpty($request, $date)
    {

        $exist = DoctorShedule::where('date', $date)
            ->where(function ($q) use ($request) {
                $q->where('branch_id', $request->branch_id);
                $q->where('cabinet_id', $request->cabinet_id);
            })
            ->get();

        if (!empty($exist)) {
            return $exist;
        } else {
            return false;
        }
    }

    /**
     * @param $request
     * @param $exist
     * @return array
     */

    private function checkIsHasEmptySmena($request, $exist)
    {

        $errors = array();
        $smenas = checkIsArrayOrString($request->smena);

        foreach ($smenas as $key => $smena) {
                $key_smena = mb_strimwidth($key, 0, 1);
                if ((int)$exist->smena === (int)$key_smena) {
                    $errors[$key]['id'] = $exist->id;
                    $errors[$key]['key'] = $key_smena;
                    $errors[$key]['date'] = $exist->date;
                    $errors[$key]['key_smena'] = $key;
                    $errors[$key]['value_smena'] = $smena;
                }
        }
        return $errors;
    }

    /**
     * @param $request
     * @param $date
     * @return array|\Illuminate\Http\JsonResponse
     */

    private function createSheduleRecord($request,$dates)
    {
        $output = array();
        $created = array();
        $updated = array();
        $errors = array();

        if(!empty($dates))
        {
            //TODO разбить код на приватки по человечески
            $smenas = checkIsArrayOrString($request->smena);
            $names_smena = array_keys($smenas);
            $nomer_smena = array();
            $values_smena = array_values($smenas);

            if(!empty($names_smena))
            {
                foreach ($names_smena as $key => $name)
                {
                    $nomer_smena[$key]['nomer'] = mb_strimwidth($name, 0, 1);
                }
                foreach ($values_smena as $key=> $value)
                {
                    $nomer_smena[$key]['value'] = $value;
                }
            }

            $existAndOwner = DoctorShedule::whereIn('date',$dates)
                ->where('branch_id',checkInput($request->branch_id))
                ->where('cabinet_id',checkInput($request->cabinet_id))
                ->where('doctor_id',checkInput($request->doctor_id))
                ->get();


            /**
             * IF owner changes
             */

            if(count($existAndOwner) > 0)
            {
                foreach ($existAndOwner as $owner)
                {
                    foreach ($nomer_smena as $smena)
                    {
                        if((int)$owner->smena === (int)$smena['nomer'])
                        {
                            if((bool)$owner->active !== (bool)$smena['value'])
                            {
                                $owner->active = (bool)$smena['value'];
                                $owner->save();
                                $updated[] = $owner;
                            }
                        }
                    }
                }
            }

            else
            {
                /**
                 * IF not Owner error
                 */
                $existAndNotOwner = DoctorShedule::whereIn('date',$dates)
                    ->where('branch_id',checkInput($request->branch_id))
                    ->where('cabinet_id',checkInput($request->cabinet_id))
                    ->where('active',true)
                    ->get();

                if(count($existAndNotOwner) > 0)
                {
                    foreach ($existAndNotOwner as $owner)
                    {
                        foreach ($nomer_smena as $smena)
                        {
                            if((int)$owner->smena === (int)$smena['nomer'])
                            {
                                //TODO тут логику проверить возврата ошибки
                                //$errors[] = $owner;
                            }
                            else
                            {
                                $exist = DoctorShedule::where('date',$owner->date)
                                    ->where('branch_id',checkInput($request->branch_id))
                                    ->where('cabinet_id',checkInput($request->cabinet_id))
                                    ->where('smena',$smena['nomer'])
                                    ->where('active',true)
                                    ->get();

                               if(count($exist) <= 0)
                               {
                                   $record = new DoctorShedule();
                                   $record->date = checkInput($owner->date);
                                   $record->doctor_id = checkInput((int)$request->doctor_id);
                                   $record->cabinet_id = checkInput((int)$request->cabinet_id);
                                   $record->branch_id = checkInput((int)$request->branch_id);
                                   if($smena['value'])
                                   {
                                       $record->active = true;
                                   }
                                   else
                                   {
                                       $record->active = false;
                                   }
                                   $record->smena = (int)$smena['nomer'];
                                   if ($record->save()) {
                                       $created[] = $record;
                                   }
                               }
                            }
                        }
                    }
                }

                /**
                 * IF Date empty
                 */
                if(count($existAndNotOwner) <= 0 && count($existAndOwner) <= 0)
                {
                    foreach ($dates as $date)
                    {
                        foreach ($nomer_smena as $smena)
                        {
                            $record = new DoctorShedule();
                            $record->date = checkInput($date);
                            $record->doctor_id = checkInput((int)$request->doctor_id);
                            $record->cabinet_id = checkInput((int)$request->cabinet_id);
                            $record->branch_id = checkInput((int)$request->branch_id);
                            if($smena['value'])
                            {
                                $record->active = true;
                            }
                            else
                            {
                                $record->active = false;
                            }
                            $record->smena = (int)$smena['nomer'];
                            if ($record->save()) {
                                $created[] = $record;
                            }
                        }
                    }
                }
            }
        }

        $output['updated'] = $updated;
        $output['errors'] = $errors;
        $output['created'] = $created;
        return $output;
        /*
        $smena = checkIsArrayOrString($request->smena);

        foreach ($smena as $key=>$smena) {
            $nomer = mb_strimwidth($key, 0, 1);
            $exist = DoctorShedule::where('date', checkInput($date))
                ->where(function ($q) use ($request) {
                    $q->where('branch_id', $request->branch_id);
                    $q->where('cabinet_id', $request->cabinet_id);
                    $q->where('doctor_id', $request->doctor_id);
                })
                ->where('smena', $nomer)
                ->first();
            if (!empty($exist) && !empty($exist->id)) {
                $output[] = $this->updateExistsRecord($exist, $request);
            }
            else
            {
                $isDateEmpty = $this->checkIfDateNotEmpty($request,$date);
                if(count($isDateEmpty) > 0)
                {
                    foreach ($isDateEmpty as $item)
                    {
                        if((int)$item->doctor_id !== (int)$request->doctor_id)
                        {
                            return array("error");
                        }
                        else
                        {
                            $output[] = $this->updateExistsRecord($exist, $request);
                        }
                    }
                }
                else
                {
                    $record = new DoctorShedule();
                    $record->date = checkInput($date);
                    $record->doctor_id = checkInput((int)$request->doctor_id);
                    $record->cabinet_id = checkInput((int)$request->cabinet_id);
                    $record->branch_id = checkInput((int)$request->branch_id);
                    if($smena)
                    {
                        $record->active = true;
                    }
                    else
                    {
                        $record->active = false;
                    }
                    $record->smena = $nomer;
                    if ($record->save()) {
                        //$this->fireEvent($request);
                        $output[] = $record;
                    }
                }
            }
        }
        //$this->fireEvent($request);
        return $output;
        */
    }

    /**
     * @param $request
     * @return bool
     */

    private function fireEvent($request)
    {
        $current = strtotime(checkInput($request->date));
        $current = date('Y-m-d', $current);
        if (!empty($current)) {
            $start = date('Y-m-01', strtotime($current));
            $end = date('Y-m-t', strtotime($current));
        }
        $output = DoctorShedule::where('date','>=',$start)
            ->where('date','<=',$end)
            ->where('branch_id',checkInput($request->branch_id))
            ->get();
        if($output)
        {
            event(new AddRecordToDoctorShedule($output));
            return true;
        }
        return false;
    }

    /**
     * @param $start
     * @param $end
     * @param $request
     * @return mixed
     */

    private function getDoctorsSheduleWithFiltersFromBranch($start,$end,$request)
    {
        $shedule = DoctorShedule::where('date', '>=', $start)
            ->where('date', '<=', $end)
            ->where('active', true)
            ->where('branch_id',checkInput($request->branch_id))
            ->orderBy('date', 'asc')
            ->with(['cabinets', 'doctors'])
            ->get()
            ->groupBy('date');
        return $shedule;
    }

    /**
     * @param $start
     * @param $end
     * @param $request
     * @return mixed
     */

    private function getDoctorsSheduleWithFiltersProfessions($start,$end,$request)
    {

        $shedule = DoctorShedule::where('date', '>=', $start)
            ->where('date', '<=', $end)
            ->where('active', true)
            ->where('branch_id',checkInput($request->branch_id))
            ->whereHas('doctors.employerInfos.professions',function($q) use ($request){
                $q->where('profession_id',$request->profession_id);
            })
            ->orderBy('date', 'asc')
            ->with(['cabinets', 'doctors'])
            ->get()
            ->groupBy('date');
        return $shedule;
    }

    /**
     * @param $start
     * @param $end
     * @param $request
     * @return mixed
     */

    private function  getDoctorsSheduleWithFiltersProfessionsAndDoctors($start,$end,$request)
    {
       if(is_array($request->doctor_id))
       {
           $doctor_ids = $request->doctor_id;
       }
       else
       {
           $doctor_ids = json_decode($request->doctor_id);
       }

       $shedule = DoctorShedule::where('date', '>=', $start)
            ->where('date', '<=', $end)
            ->where('active', true)
            ->where('branch_id',checkInput($request->branch_id))
            ->whereHas('doctors.employerInfos.professions',function($q) use ($request){
                $q->where('profession_id',$request->profession_id);
            })
            ->whereIn('doctor_id',$doctor_ids)
            ->orderBy('date', 'asc')
            ->with(['cabinets', 'doctors'])
            ->get()
            ->groupBy('date');

        return $shedule;

    }

}
