<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\EmployerCard;
use App\Models\EmployerDocument;
use App\Models\EmployerInfo;
use App\Models\Image;
use App\Models\Profession;
use App\Models\Role;
use App\Models\Subdivision;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use phpseclib\Crypt\Hash;

class EmployerController extends Controller
{


    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllEmployers()
    {
        $employers = User::whereHas('roles',function($q){
            $q->where('name','!=','patient');
        })->with(['roles','employerCard','employerDocuments','employerInfos','employerInfos.subdivisions','employerInfos.professions'])
          ->get()->toArray();
        if(!empty($employers) && count($employers) > 0)
        {
            return response()->json(['success'=>'Employers are found successfully','employers'=>$employers],200);
        }
        return  response()->json(['error'=>'Users not found'],201);
    }

    /**
     * @param $id
     */

    public function getEmployerFromId($id)
    {
        if(!empty($id) && (int)$id)
        {
            $user = User::where('id',$id)->with(['employerCard','employerDocuments','employerInfos','employerInfos.subdivisions','employerInfos.professions','roles'])->first();
            if(!empty($user->id))
            {
                return response()->json([
                    'success'=>'User found successfully',
                    'user'=>$user
                    ],200);
            }else{
                return response()->json(['error'=>'User not found','user'=>array()]);
            }
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createEmployee(Request $request)
    {
        if (!empty($request))
        {
            $errors = checkParamsIsExists([
                'first_name'=>$request->first_name,
                'surname'=>$request->surname,
                'last_name'=>$request->last_name,
                'birthday'=>$request->birthday,
                'gender'=>$request->gender,
                'city'=>$request->city,
                'street'=>$request->street,
                'house'=>$request->house,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'type' =>$request->type,
                'status'=>$request->status,
                'access'=>$request->access,
                'salary'=>$request->salary,
                'role_id'=>$request->role_id,

            ]);
            if(!$errors)
            {
                $user = new User();
                $user->email = checkInput($request->email);
                $user->password = bcrypt(checkInput($request->password));
                $user->name = checkInput($request->last_name).' '. checkInput($request->first_name).' '.checkInput($request->surname);
                if($user->save())
                {
                    if(!empty($request->role_id))
                    {
                        $user->roles()->sync($request->role_id);
                    }

                    $this->createEmployerCard($request,$user);
                    $this->createEmployerDocuments($request,$user);
                    $this->createEmployerInfo($request,$user);


                    return response()->json(['success'=>'Employer successfully created!','user'=>$user],200);
                }
                else
                {
                    return response()->json(['error'=>'User not save','user'=>[]],201);
                }
            }
            else{
                return response()->json([
                    'error'=>'Parameter ' .$errors.' is invalid'
                ],201);
            }

        }
        else
        {
            return response()->json(['error'=>'Bad request'],201);
        }
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateEmployee(Request $request)
    {
        if (!empty($request))
        {
            $errors = checkParamsIsExists([
                'first_name'=>$request->first_name,
                'surname'=>$request->surname,
                'last_name'=>$request->last_name,
                'birthday'=>$request->birthday,
                'gender'=>$request->gender,
                'city'=>$request->city,
                'street'=>$request->street,
                'house'=>$request->house,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'type' =>$request->type,
                'status'=>$request->status,
                'access'=>$request->access,
                'salary'=>$request->salary,
                'role_id'=>$request->role_id,
                'id'=>$request->id,

            ]);
            if(!$errors)
            {
                $user = User::find($request->id);
                $user->email = checkInput($request->email);
                if(!empty($request->password)){
                    $user->password = bcrypt(checkInput($request->password));
                }

                $user->name = checkInput($request->last_name).' '. checkInput($request->first_name).' '.checkInput($request->surname);
                if($user->save())
                {
                    if(!empty($request->role_id))
                    {
                        $user->roles()->sync($request->role_id);
                    }
                    $this->updateEmployerCard($request,$user);
                    $this->updateEmployerDocuments($request,$user);
                    $this->updateEmployerInfo($request,$user);


                    return response()->json(['success'=>'Employer successfully updated!','user'=>$user],200);
                }
                else
                {
                    return response()->json(['error'=>'User not save','user'=>[]],201);
                }
            }
            else{
                return response()->json([
                    'error'=>'Parameter ' .$errors.' is invalid'
                ],201);
            }

        }
        else
        {
            return response()->json(['error'=>'Bad request'],201);
        }
    }

    /**
     * @param $data
     * @param $user
     * @return bool
     */

    private function createEmployerCard($data,$user)
    {
        $card = new EmployerCard();
        $card->first_name = checkInput($data->first_name);
        $card->last_name = checkInput($data->last_name);
        $card->surname = checkInput($data->surname);
        $card->birthday = Carbon::createFromDate(checkInput($data->birthday))->format('d.m.Y');
        $card->gender = checkInput($data->gender);
        $card->city = checkInput($data->city);
        $card->street = checkInput($data->street);
        $card->house = checkInput($data->house);
        if(!empty($data->corpus))
        {
            $card->corpus = checkInput($data->corpus);
        }
        if(!empty($data->flat))
        {
            $card->flat = checkInput($data->flat);
        }
        $card->phone = checkInput($data->phone);
        $card->email = checkInput($data->email);
        $card->user_id = $user->id;


        if($data->hasFile('image'))
        {
            //Validation rules
            $rules = array(
                'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000' // max 10000kb
            );

            $postData = $data->only('image');
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
                    '/employee/images/'.$date, $file, $name
                );
                $card->photo = $path;
            };
        }

        $card->save();
        return true;
    }

    /**
     * @param $data
     * @param $user
     * @return bool|\Illuminate\Http\JsonResponse
     */

    private function updateEmployerCard($data,$user)
    {
        if(!empty($user->employerCard) && !empty($user->employerCard->id))
        {
            $card = EmployerCard::find($user->employerCard->id);
            if(!empty($card))
            {
                $card->first_name = checkInput($data->first_name);
                $card->last_name = checkInput($data->last_name);
                $card->surname = checkInput($data->surname);
                $card->birthday = Carbon::createFromDate(checkInput($data->birthday))->format('d.m.Y');
                $card->gender = checkInput($data->gender);
                $card->city = checkInput($data->city);
                $card->street = checkInput($data->street);
                $card->house = checkInput($data->house);
                if(!empty($data->corpus))
                {
                    $card->corpus = checkInput($data->corpus);
                }
                if(!empty($data->flat))
                {
                    $card->flat = checkInput($data->flat);
                }
                $card->phone = checkInput($data->phone);
                $card->email = checkInput($data->email);
                $card->user_id = $user->id;


                if($data->hasFile('image'))
                {
                    //Validation rules
                    $rules = array(
                        'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000' // max 10000kb
                    );

                    $postData = $data->only('image');
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
                            '/employee/images/'.$date, $file, $name
                        );
                        $card->photo = $path;
                    };
                }

                $card->save();
                return true;
            }
            return response()->json(['error'=>'$user->employerCard->id not valid'],201);
        }
        return false;
    }

    /**
     * @param $data
     * @param $user
     * @return bool
     */

    private function createEmployerDocuments($data,$user)
    {
        $documents = new EmployerDocument();
        if(!empty($data->inn))
        {
            $documents->inn = checkInput($data->inn);
        }
        $documents->type = checkInput($data->type);
        $documents->series_and_number = checkInput($data->series_and_number);
        $documents->issued = checkInput($data->issued);
        $documents->date_issue = Carbon::createFromDate(checkInput($data->date_issue))->format('d.m.Y');
        $documents->born_place = checkInput($data->born_place);
        $documents->registration_adress = checkInput($data->registration_adress);
        $documents->registration_date = Carbon::createFromDate(checkInput($data->date_issue))->format('d.m.Y');
        if(!empty($data->other))
        {
            $documents->other = checkInput($data->other);
        }
        $documents->user_id = $user->id;
        $documents->save();
        return true;
    }

    /**
     * @param $data
     * @param $user
     * @return bool|\Illuminate\Http\JsonResponse
     */

    private function updateEmployerDocuments($data,$user)
    {
        if(!empty($user->employerDocuments) && !empty($user->employerDocuments->id))
        {
            $documents = EmployerDocument::find($user->employerDocuments->id);
            if(!empty($documents))
            {
                if(!empty($data->inn))
                {
                    $documents->inn = checkInput($data->inn);
                }
                $documents->type = checkInput($data->type);
                $documents->series_and_number = checkInput($data->series_and_number);
                $documents->issued = checkInput($data->issued);
                $documents->date_issue = Carbon::createFromDate(checkInput($data->date_issue))->format('d.m.Y');
                $documents->born_place = checkInput($data->born_place);
                $documents->registration_adress = checkInput($data->registration_adress);
                $documents->registration_date = Carbon::createFromDate(checkInput($data->registration_date))->format('d.m.Y');
                if(!empty($data->other))
                {
                    $documents->other = checkInput($data->other);
                }
                $documents->user_id = $user->id;
                $documents->save();
                return true;
            }
            return response()->json(['error'=>'$user->employerDocuments->id not valid'],201);
        }
       return false;
    }

    /**
     * @param $data
     * @param $user
     * @return bool
     */

    private function createEmployerInfo($data,$user)
    {
        $info = new EmployerInfo();
        $info->status = checkInput($data->status);
        $info->access = checkInput($data->access);
        $info->salary = checkInput($data->salary);
        $info->user_id = $user->id;
        if(!empty(checkInput($data->branches)))
        {
            $info->branch_id = checkInput($data->branches);
        }
        if($info->save())
        {
            if(!empty($data->subdivisions))
            {
                $info->subdivisions()->sync($data->subdivisions);
            }
            if(!empty($data->professions))
            {
                $info->professions()->sync($data->professions);
            }
        }
        return true;
    }

    /**
     * @param $data
     * @param $user
     * @return bool|\Illuminate\Http\JsonResponse
     */

    private function updateEmployerInfo($data,$user)
    {
        if(!empty($user->employerInfos) && !empty($user->employerInfos->id))
        {
            $info = EmployerInfo::find($user->employerInfos->id);
            if(!empty($info))
            {
                $info->status = checkInput($data->status);
                $info->access = checkInput($data->access);
                $info->salary = checkInput($data->salary);
                $info->user_id = $user->id;
                if(!empty(checkInput($data->branches)))
                {
                    $info->branch_id = checkInput($data->branches);
                }
                if($info->save())
                {
                    if(!empty($data->subdivisions))
                    {
                        $info->subdivisions()->sync($data->subdivisions);
                    }
                    if(!empty($data->professions))
                    {
                        $info->professions()->sync($data->professions);
                    }
                }
                return true;
            }
            return response()->json(['error'=>'$user->employerInfos->id not valid'],201);
        }

       return false;
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCats()
    {


        $professions = Profession::where('public','1')->get()->toArray();
        $subdivisions = Subdivision::where('public','1')->get()->toArray();
        $branches = Branch::all();
        $roles = Role::all();


        if(!empty($professions) && count($professions) > 0 && !empty($subdivisions) && count($subdivisions) > 0)
        {
            return response()->json([
                'success'=>"Professions and Subdivisions found successfully",
                'professions'=>$professions,
                'subdivisions'=>$subdivisions,
                'roles'=>$roles,
                'branches'=>$branches
            ],200);
        }
        return response()->json([
            'error'=>'Professions or Subdivisions not found',
            'professions'=>$professions,
            'subdivisions'=>$subdivisions,
        ],201);
    }
}
