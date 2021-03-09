<?php

namespace App\Http\Controllers;

use App\Models\PatientCard;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;


class SearchController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|void
     */

    public function searchPatients(Request $request)
    {

        if(!empty($request) && !empty($request->search))
        {
            $searchvalue = checkInput($request->search);
            if(!empty($searchvalue) && is_string($searchvalue))
            {
                $patients = PatientCard::where('name','ILIKE','%'.$searchvalue.'%')
                ->orWhere('surname','ILIKE','%'.$searchvalue.'%')
                ->orWhere('patronymic','ILIKE','%'.$searchvalue.'%')
                ->orWhere('card_number','ILIKE','%'.$searchvalue.'%')
                ->with('users','users.contacts','users.adresses','users.polices')->get();


                if(!empty($patients))
                {
                    foreach ($patients as $patient)
                    {
                        if(!empty($patient->users))
                        {
                            foreach ($patient->users as $user)
                            {
                                $patient->user_id = $user->id;
                                if(!empty($user->contacts))
                                {
                                    foreach ($user->contacts as $contact)
                                    {
                                        $patient->contacts = $patient->contacts.' '.$contact->phone;
                                    }
                                }
                            }
                        }

                    }
                    return response()->json($patients,200);

                }
                else
                {
                    return response()->json($patients,201);
                }
            }
        }
        else{
            return abort(403,'Access denied');
        }
    }

}
