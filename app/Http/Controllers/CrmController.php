<?php

namespace App\Http\Controllers;

use App\Events\IncomingCall;
use App\Models\Branch;
use App\Models\CallHistory;
use App\Models\CallHistoryRecord;
use App\Models\TasksForCalling;
use App\Models\TasksForCallingStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Propaganistas\LaravelPhone\PhoneNumber;

class CrmController extends Controller
{


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDataFromFilters(Request $request)
    {
        $errors = checkParamsIsExists([
            'period'=>$request->period,
            'branch_id'=>$request->branch_id,
        ]);

        if(!$errors)
        {
            $date= array();

            if((string)$request->period === (string)"day")
            {
                $date['date'] = Carbon::today();
                $date['type'] = "day";
            }
            if((string)$request->period === (string)'month')
            {
                $date['date'] = Carbon::now()->month;
                $date['type'] = "month";
            }
            if((string)$request->period === (string)"year")
            {
                $date['date'] = Carbon::now()->year;
                $date['type'] = "year";
            }

            $tasks = TasksForCalling::with(['branch','patient','administrator','status'])
                ->when($request->branch_id, function ($query, $request) {
                    return $query->where('branch_id', checkInput($request));
                })
                ->when($request->patient_id, function ($query, $request) {
                    return $query->where('patient_id', checkInput($request));
                })
                ->when($request->administrator_id, function ($query, $request) {
                    return $query->where('administrator_id', checkInput($request));
                })
                ->when($request->status_id, function ($query, $request) {
                    return $query->where('status_id', checkInput($request));
                })
                ->when($date, function ($query, $request) {
                    if((string)$request['type'] === (string)"year")
                    {
                        return $query->whereYear('date', checkInput($request['date']));
                    }
                    if((string)$request['type'] === (string)"month")
                    {
                        return $query->whereMonth('date', checkInput($request['date']));
                    }
                    if((string)$request['type'] === (string) "day")
                    {
                        return $query->whereDate('date',checkInput($request['date']));
                    }
                })
                ->paginate(20);
            if(!empty($tasks))
            {
                return response()->json(['success'=>'Tasks for calling successfully found','tasks'=>$tasks],200);
            }
            else
            {
                return response()->json(['error'=>'Tasks for calling not found','tasks'=>$tasks],201);
            }
        }
        else
        {
            return response()->json(['error'=>'Bad request'],201);
        }




    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getDataToFilters()
    {
        $branches = Branch::all();
        $patients = User::whereHas('roles',function($q){
            $q->where('name','patient');
        })->get();
        $administrators = User::whereHas('roles',function($q){
            $q->where('name','admin');
        })->get();

        $statuses = TasksForCallingStatus::all();

        return response()->json(['Success'=>'Data to filters successfully found',
            'branches'=>$branches,
            'patients'=>$patients,
            'administrators'=>$administrators,
            'statuses'=>$statuses
        ],200);

    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getRecords()
    {
        $records = CallHistory::with('records')->paginate(15);
        if(!empty($records))
        {
            return response()->json(['success'=>'Records successfully loaded','records'=>$records],200);
        }
        else
        {
            return response()->json(['error'=>'Records not found','records'=>$records],201);
        }
    }

    /**
     * @param Request $request
     */

    public function getIncomingCall(Request $request)
    {

        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                    'start_time'=>$request->start_time,
                    'call_session_id'=>$request->call_session_id,
                    'notification_name'=>$request->notification_name,
                    'virtual_phone_number'=>$request->virtual_phone_number,
                    'contact_phone_number'=>$request->contact_phone_number,
                    'contact_full_name'=>$request->contact_full_name,
                ]);

            if(!$errors)
            {
               $type = 1;
               $search = $this->searchLocalPatient($request);
               if(!empty($search))
               {
                   $record = $this->createRecord($request,$search,$type);
                   //TODO тут пробросить в сокет пациента
                   event(new IncomingCall($search));
               }
               else
               {
                   $record = $this->createRecord($request,false,$type);
               }
            }
            else
            {
                if(!empty($request->contact_phone_number))
                {
                    $type = 1;
                    $search = $this->searchLocalPatient($request);
                    if(!empty($search))
                    {
                        $record = $this->createRecord($request,$search,$type);
                        //TODO тут пробросить в сокет пациента
                        event(new IncomingCall($search));
                    }
                    else
                    {
                        $record = $this->createRecord($request,false,$type);
                    }
                }
            }
        }
        else
        {
            Log::alert($request);
        }
    }

    /**
     * @param Request $request
     */

    public function droppedCall(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'start_time'=>$request->start_time,
                'call_session_id'=>$request->call_session_id,
                'notification_name'=>$request->notification_name,
                'virtual_phone_number'=>$request->virtual_phone_number,
                'contact_phone_number'=>$request->contact_phone_number,
                'contact_full_name'=>$request->contact_full_name,
            ]);
            if(!$errors)
            {
                $type = 3;
                $search = $this->searchLocalPatient($request);
                if(!empty($search))
                {
                    Log::alert($search);
                    $record = $this->createRecord($request,$search,$type);
                }
                else
                {
                    $record = $this->createRecord($request,false,$type);
                }
            }
            else
            {
                $type = 3;
                if(!empty($request->contact_phone_number))
                {
                    $search = $this->searchLocalPatient($request);
                    //Log::alert($search);
                    if(!empty($search))
                    {
                        $record = $this->createRecord($request,$search,$type);
                    }
                    else
                    {
                        $record = $this->createRecord($request,false,$type);
                    }
                }
            }

        }
        else
        {
            Log::alert($request);
        }

    }

    /**
     * @param Request $request
     */

    public function endIncomingCall(Request $request)
    {
        $errors = checkParamsIsExists([
            'call_session_id' =>$request->call_session_id,
            'wait_time_duration'=>$request->wait_time_duration,
            'talk_time_duration'=>$request->talk_time_duration,
            'employee_phone_number'=>$request->employee_phone_number,
            'employee_full_name'=>$request->employee_full_name,
        ]);
        if(!$errors)
        {
            $record = CallHistory::where('call_session_id',checkInput($request->call_session_id))->first();
            if(!empty($record))
            {

                $record->wait_time_duration = date('H:i', mktime(0,(int)$request->wait_time_duration));
                $record->talk_time_duration = date('H:i', mktime(0,(int)$request->talk_time_duration));
                $record->employee_phone_number = checkInput($request->employee_phone_number);
                $record->employee_full_name = checkInput($request->employee_full_name);
                if(!empty($request->operator_rating))
                {
                    $record->operator_rating = checkInput($request->operator_rating);
                }
                if(!empty($request->record_file_links))
                {

                    foreach (json_decode($request->record_file_links) as $link)
                    {
                        $newrecord = new CallHistoryRecord();
                        $newrecord->link = checkInput($link);
                        $newrecord->call_history_id = $record->id;
                        $newrecord->save();
                    }
                }
                $record->save();
            }
        }
        else
        {
            Log::alert($errors);
        }
    }

    /**
     * @param $request
     * @return mixed
     */

    public function outGoingCall(Request $request)
    {
        //Log::alert($request);

        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'employee_full_name'=>$request->employee_full_name,
                'call_session_id'=>$request->call_session_id,
                'notification_name'=>$request->notification_name,
                'virtual_phone_number'=>$request->virtual_phone_number,
                'contact_phone_number'=>$request->contact_phone_number,
                'contact_full_name'=>$request->contact_full_name,
            ]);

            if(!$errors)
            {
                $type = 2;
                $search = $this->searchLocalPatient($request);
                if(!empty($search))
                {
                    Log::alert($search);
                    $record = $this->createRecord($request,$search,$type);
                }
                else
                {
                    $record = $this->createRecord($request,false,$type);
                }
            }
        }
        else
        {
            Log::alert($request);
        }
    }

    /**
     * @param Request $request
     * @return mixed
     */

    private function searchLocalPatient(Request $request)
    {

        $phone = PhoneNumber::make($request->contact_phone_number,'RU')->formatNational();

        $search = User::whereHas('contacts',function ($q) use($phone)
        {
            $q->where('phone','ILIKE','%'.$phone.'%');
        })->first();

        return $search;
    }

    /**
     * @param $request
     * @param false $user
     * @return bool
     */

    private function createRecord($request,$user=false,$type=false)
    {
        $record = new CallHistory();
        if(!empty($request->start_time))
        {
            $record->start_time = Carbon::createFromFormat('Y-m-d H:i:s.u', checkInput($request->start_time))->toDateTimeString();
        }
        $record->call_session_id = checkInput($request->call_session_id);
        $record->notification_name = checkInput($request->notification_name);
        $record->virtual_phone_number = checkInput($request->virtual_phone_number);
        $record->contact_phone_number = checkInput($request->contact_phone_number);

        if(!empty($request->cpn_region_name))
        {
            $record->cpn_region_name = $request->cpn_region_name;
        }
        if(!empty($request->call_source))
        {
            $record->call_source = $request->call_source;
        }
        if(!empty($request->contact_full_name))
        {
            $record->contact_full_name = $request->contact_full_name;
        }
        if(!empty($user) && !empty($user->id))
        {
            $record->user_id = $user->id;
        }
        if(!empty($request->lost_reason))
        {
            $record->lost_reason = checkInput($request->lost_reason);
        }
        if(!empty($type) && $type)
        {
            $record->type = $type;
        }
        if(!empty($request->noanswered_employee_full_names))
        {
            $out = '';
            foreach (json_decode($request->noanswered_employee_full_names) as $key=> $item)
            {
                if($key == 0)
                {
                    $out = checkInput($item);
                }
                else
                {
                    $out = $out.', '. checkInput($item);
                }

            }
            $record->noanswered_employee_full_names = $out;
        }
        if($record->save())
        {
            Log::info('Created successfully'. $user);
            return true;
        }
    }
}
