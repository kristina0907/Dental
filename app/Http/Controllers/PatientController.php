<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\PatientAdress;
use App\Models\PatientCard;
use App\Models\PatientContact;
use App\Models\PatientPolice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Propaganistas\LaravelPhone\PhoneNumber;

class PatientController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPatients()
    {
        $patients = User::whereHas('roles',function ($q){
            $q->where('name','patient');
        })->with(
            ['polices','contacts','patientCards','adresses','roles']
        )->get();

        if(!empty($patients) && count($patients) > 0){
            return response()->json($patients,200);
        }
        else{
            return  response()->json('Patients not found, add them first',401);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPatientFromId($id)
    {
        if(!empty($id))
        {
            $patient = User::with(['polices','contacts','patientCards','adresses'])->find($id);
            if(!empty($patient->id))
            {

                if(!empty($patient->patientCards))
                {
                    foreach ($patient->patientCards as $card)
                    {
                        if((int)$card->status == (int) 1 )                        {
                            $patient->patientCards = $card;
                        }
                    }
                }
                return response()->json($patient,200);
            }
            else{
                return  response()->json('User not found check id',401);
            }
        }else{
            return response()->json('ID not defined check it pls',404);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function uploadImages(Request $request)
    {

        if($request->hasFile('image'))
        {
            //Validation rules
            $rules = array(
                'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000' // max 10000kb
            );


            $postData = $request->only('image');
            $file = $postData['image'];
            $fileArray = array('image' => $file);

            $validator = Validator::make($fileArray, $rules);

            $ext = $file->extension();
            $name = Str::random(20).'.'.$ext ;

            if ($validator->fails())
            {
                return response()->json(['error' => $validator->errors()->getMessages()], 400);
            }
            else
            {
                $date = date("d.m.Y");
                $path = Storage::disk('public')->putFileAs(
                    '/images/'.$date, $file, $name
                );

                if($path){
                    $create = new Image();
                    $create->uri = $path;
                    $create->name = $name;
                    $create->date = $date;
                    $create->patient_card_id = $request->patient_card_id;
                    $create->public = 1;
                    if(!empty($request->comment))
                    {
                        $create->comment = $request->comment;
                    }
                    $create->save();

                    if($create){
                        return response()->json([
                            'uploaded' => true,
                            'filename' => $name,
                            'path' => $path
                        ]);
                    }
                }
            };
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function udpateImages(Request $request)
    {
        if (!empty($request->photo_id) && !empty($request->comment))
        {
            $image = Image::find($request->photo_id);
            if(!empty($image))
            {
                $image->comment = checkInput($request->comment);
                $image->save();
                return response()->json(['success'=>'Image successfully updated','image'=>$image],200);
            }
        }
        else{
            return  response()->json(['error'=>'Invalid photo_id or comment'],201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteImages(Request $request)
    {

        $photo = Image::find($request->id);
        if(Storage::disk('public')->delete($photo->uri) && $photo->delete() ){
            return response()->json([
                'deleted' => true
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getImages(Request $request)
    {

        if(!empty($request->patient_card_id))
        {
            $patient = PatientCard::find($request->patient_card_id);
            $output = array();
            if (!empty($patient) && !empty($patient->id))
            {
                $images = $patient->load(['images' => function ($q) {
                    $q->orderBy('date', 'asc');
                }])->toArray();


                if(!empty($images) && count($images) > 0)
                {
                    foreach ($images['images'] as $key=> $image)
                    {
                        $date = $image['date'];
                        $output[$date][] = $image;


                    }
                }

                return response()->json($output,200);
            }
        }

    }

    /**
     * @param Request $request
     */

    public function getHistory(Request $request)
    {

        if(!empty($request->card_id))
        {
            //TODO дописать геттер истории болезни
            $card = PatientCard::with('toothcards')->find($request->card_id);
            dd($card->toothcards->tooths);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePatient(Request $request)
    {
        if(!empty($request->patient_id))
        {
            $exist = User::where('id',$request->patient_id)->first();
            if($exist)
            {
                $errors= checkParamsIsExists([
                    'email'    => $request->email,
                    'surname'   => $request->surname,
                    'name'     => $request->name,
                    'patronymic'  => $request->patronymic,
                    'born_date' => $request->born_date,
                    'gender'   => $request->gender,

                ]);
                if(!$errors)
                {
                   $user = User::find($request->user_id);
                   if(!empty($user))
                   {
                       $user->email = checkInput($request->email);
                       $user->name = checkInput($request->family) . ' ' . checkInput($request->name) . ' ' . checkInput($request->surname);
                       $user->save();
                   }
                   $user_card = PatientCard::find($request->patient_card_id);
                   if(!empty($user_card))
                   {
                       $user_card->name = checkInput($request->name);
                       $user_card->surname = checkInput($request->surname);
                       $user_card->patronymic = checkInput($request->patronymic);
                       $user_card->born_date = checkInput($request->born_date);
                       $user_card->gender = checkInput($request->gender);
                       $user_card->marketing = checkInput($request->marketing);
                       $user_card->archive_info = checkInput($request->archive_info);
                       if(!empty($request->parent))
                       {
                           $user_card->parent = checkInput($request->parent);
                       }
                       if(!empty($request->comment))
                       {
                           $user_card->comment = $request->comment;
                       }
                       $user_card->save();
                   }

                   if(!empty($request->polices))
                   {
                       foreach ($request->polices as $police)
                       {
                           $pol = PatientPolice::find($police->id);
                           if(!empty($pol))
                           {
                               $pol->name = checkInput($police->name);
                               $pol->description = checkInput($police->description);
                               $pol->date_start = checkInput($police->date_start);
                               $pol->date_end = checkInput($police->date_end);
                               $pol->save();
                           }
                       }
                   }

                   if(!empty($request->contacts))
                   {
                       foreach ($request->contacts as $contact)
                       {

                           $con = PatientContact::find($contact['id']);
                           if(!empty($con))
                           {
                               $phone = PhoneNumber::make($contact['phone'],'RU')->formatNational();
                               $con->phone = checkInput($phone);
                               if(!empty($contact['sms_inform']))
                               {
                                   $con->sms_inform = checkInput($contact['sms_inform']);
                               }
                               $con->save();
                           }
                       }
                   }

                   if(!empty($request->adresses))
                   {
                       foreach ($request->adresses as $adresss)
                       {

                           $a = PatientAdress::find($adresss['id']);
                           if(!empty($a))
                           {
                               $a->city = checkInput($adresss['city']);
                               $a->street = checkInput($adresss['street']);
                               $a->house = checkInput($adresss['house']);
                               $a->corpus = checkInput($adresss['corpus']);
                               $a->flat = checkInput($adresss['flat']);
                               $a->save();
                           }
                       }
                   }

                    return response()->json(['type'=>'ok'],200);
                }
                else{
                    return response()->json(['type'=>'error','message'=>$errors],201);
                }
            }
            return response()->json(['error'=>'User with that id is not exist'],201);
        }
    }

}
