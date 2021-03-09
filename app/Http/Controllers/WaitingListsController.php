<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WaitingList;
use http\Env\Response;
use Illuminate\Http\Request;

class WaitingListsController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAll()
    {
        $list = WaitingList::with(['patient.contacts','doctor'])->paginate(15);

        if(!empty($list))
        {
            return response()->json(['success'=>"Waiting lists found successfully",'list'=>$list],200);
        }
        else
        {
            return response()->json(['error'=>"Waiting lists not found",'list'=>array()],201);
        }
    }

    public function createWaitingList(Request $request)
    {
        if (!empty($request))
        {
            $errors = checkParamsIsExists([
                'patient_id'=>$request->patient_id,
                'doctor_id'=>$request->doctor_id,
                'time'=>$request->time,
                'duration'=>$request->duration,
                'date_to'=>$request->date_to,
            ]);
            if(!$errors)
            {
                $newlist = new WaitingList();
                $newlist->patient_id = checkInput($request->patient_id);
                $newlist->doctor_id = checkInput($request->doctor_id);
                $newlist->time = checkInput($request->time);
                $newlist->duration = checkInput($request->duration);
                $newlist->date_to = checkInput($request->date_to);
                if(!empty($request->comment))
                {
                    $newlist->comment = checkInput($request->comment);
                }
                if($newlist->save())
                {
                    return response()->json(['success'=>'Waiting list successfully created','list'=>$newlist],200);
                }

            }
            else
            {
                return response()->json(['error'=>"Parameter ".$errors." is invalid"],201);
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

    public function getCategories()
    {
        $doctors = User::whereHas('roles',function($q){
            $q->where('name','doctor');
        })->get();

        if(!empty($doctors))
        {
            return response()->json(['success'=>"Doctors found successfully",'doctors'=>$doctors],200);
        }
        return response()->json(['error'=>'Bad request']);
    }
}
