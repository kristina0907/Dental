<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\ReviewOrder;
use App\Models\Shedule;
use App\Models\TasksForCalling;
use App\Models\User;
use Illuminate\Http\Request;

class TasksForCallingController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAll()
    {
        $tasks = TasksForCalling::with(['branch',
            'patient',
            'patient.contacts',
            'administrator',
            'status'])
            ->paginate(15);

        if(!empty($tasks))
        {
            foreach ($tasks as $task)
            {
                $date_new = explode(' ',$task->date);
                $task->date_new = $date_new[0];
                $task->time_new = $date_new[1];
            }
            return response()->json(['success'=>'Tasks for calling successfully found','tasks'=>$tasks],200);
        }
        else
        {
            return response()->json(['error'=>'Tasks for calling not found','tasks'=>$tasks],201);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPatients()
    {
        $patients = User::whereHas('roles',function ($q){
            $q->where('name','patient');
        })->with(['contacts'])
            ->paginate(10);


        if(!empty($patients))
        {
            foreach($patients as $patient)
            {
                if($patient->reviewOrders()->exists())
                {
                    $patient->review_order = ReviewOrder::where('user_id',$patient->id)->latest('created_at')->with(['doctor'])->first();
                }
                if($patient->patientShedules()->exists())
                {
                    $patient->last_shedule_date = Shedule::where('patient_id',$patient->id)->latest('date')->first();
                }
            }

            $administrators = User::whereHas('roles',function ($q){
                $q->where('name','admin');
            })->get();
            $branches = Branch::all();

            return response()->json(['success'=>'Patients for calling successfully found','users'=>$patients,'branches'=>$branches,'administrators'=>$administrators],200);
        }
        else
        {
            return response()->json(['error'=>'Patients for calling not found','users'=>$patients],201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createTaskForCalling(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'branch_id'=>$request->branch_id,
                'administrator_id'=>$request->administrator_id,
                'users_id'=>$request->users_id,
                'date'=>$request->date,
            ]);

            if(!$errors)
            {

                $users = checkIsArrayOrString($request->users_id);

                $output = array();

                foreach ($users as $user_id)
                {
                    $task = new TasksForCalling();
                    $task->branch_id = checkInput($request->branch_id);
                    $task->patient_id = checkInput($user_id);
                    $task->date = checkInput($request->date);
                    $task->administrator_id = checkInput($request->administrator_id);
                    $task->status_id = 1;
                    if(!empty($comment))
                    {
                        $task->comment = checkInput($request->comment);
                    }
                    if($task->save())
                    {
                        $output[] = $task;
                    }
                }
                if(!empty($output))
                {
                    return response()->json(['success'=>'Tasks created successfully','tasks'=>$output],200);
                }
            }
            else
            {
                return response()->json([
                    'error'=>'Parameter ' .$errors.' is invalid'
                ],201);
            }
        }
        else
        {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }
}
