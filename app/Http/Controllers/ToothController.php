<?php

namespace App\Http\Controllers;

use App\Models\PatientCard;
use App\Models\Tooth;
use App\Models\ToothCard;
use App\Models\ToothDiagnos;
use App\Models\ToothDiagnosReview;
use App\Models\User;
use Illuminate\Http\Request;

class ToothController extends Controller
{
    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function getToothcard($id)
    {

        if(!empty($id) && (int) $id)
        {
            $card = PatientCard::with(['toothcards','toothcards.tooths','toothcards.types','toothcards.tooths.diagnosys','toothcards.tooths.diagnosys.reviews'])->find($id);
            $tootharr = array();
            $toothcardarr = array();
            if(!empty($card->toothcards))
            {
                if(!empty($card->toothcards))
                {

                        //dd($card->toothcards);
                        $toothcardarr['name'] = $card->toothcards->name;
                        $toothcardarr['patients_card_id'] = $card->toothcards->patients_card_id;

                }

                $card->toothcard = $toothcardarr;
                if(!empty($card->toothcards->tooths))
                {

                    foreach($card->toothcards->tooths as $tooth)
                    {
                        $tootharr[$tooth->tooth_number][] =$tooth;
                    }
                }
                $card->tooths = $tootharr;

            }

            return response()->json($card,200);

        }else{
            return response()->json('ID not defined check it pls',404);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function saveToothReview(Request $request)
    {

        if(!empty($request) && !empty($request->toothcards_id))
        {
            $card = ToothCard::with(['tooths','tooths.diagnosys','tooths.diagnosys.reviews'])->find($request->toothcards_id);

            if(!empty($card))
            {
                if(!empty($request->tooth_number))
                {
                    $exist = null;
                    foreach ($card->tooths as $tooth)
                    {
                        if((int)$tooth->tooth_number == (int)$request->tooth_number){
                           $exist = $tooth;
                        }
                    }
                    if(!empty($exist) && !empty($exist->id))
                    {
                        $tooth = Tooth::find($exist->id);
                        $update = $this->updateExistTooth($request,$tooth,$card->id);

                        if($update)
                        {
                            return response()->json([
                                    'status'=>'success',
                                    'message'=>'succesfully updated'
                                ],200);
                        }
                        else
                        {
                            return response()->json([
                                'message'=>'error'
                            ],201);
                        }
                    }
                    else
                    {
                        $created = $this->createNewTooth($request,$card->id);
                        if($created)
                        {
                            return response()->json([
                                'status'=>'success',
                                'message'=>'succesfully created'
                            ],200);
                        }
                        else
                        {
                            return response()->json(['message'=>'error'],201);
                        }
                    }
                }
                else
                {
                    return response()->json(['message'=>'Invalid tooth number! check it please']);
                }
            }
            else
            {
                return response()->json(['message'=>'Invalid card number! check it please']);
            }

        }
    }

    /**
     * @param $data
     * @param $tooth
     * @param $card_id
     * @return bool
     */

    private function updateExistTooth($data,$tooth,$card_id)
    {
        if(!empty($tooth))
        {
            $tooth->tooth_number = checkInput($data->tooth_number);
            $tooth->health_status = checkInput($data->health_status);
            $tooth->tooth_card_id = $card_id;
            if($tooth->save())
            {
                $diagnos = new ToothDiagnos();
                $diagnos->name = checkInput($data->diagnos);
                $diagnos->tooth_id = $tooth->id;
                if($diagnos->save())
                {
                    $review = new ToothDiagnosReview();
                    $review->complaints = checkInput($data->complaints);
                    $review->diseases_history = checkInput($data->diseases_history);
                    $review->diseases_now = checkInput($data->diseases_now);
                    $review->visual_inspection = checkInput($data->visual_inspection);
                    $review->bite = checkInput($data->bite);
                    $review->oral_mucosa = checkInput($data->oral_mucosa);
                    $review->rengen_data = checkInput($data->rengen_data);

                    if($review->save()){
                        $review->diagnoses()->sync($review->id);
                        return true;
                    };
                    return false;
                };
            };
        }
    }

    /**
     * @param $data
     * @param $card_id
     * @return bool
     */

    private function createNewTooth($data,$card_id)
    {
        $tooth = new Tooth();
        $tooth->tooth_number = checkInput($data->tooth_number);
        $tooth->health_status = checkInput($data->health_status);
        $tooth->tooth_card_id = checkInput($card_id);
        if($tooth->save())
        {
            $diagnos = new ToothDiagnos();
            $diagnos->name = checkInput($data->diagnos);
            $diagnos->tooth_id = checkInput($tooth->id);
            if($diagnos->save())
            {
                $review = new ToothDiagnosReview();
                $review->complaints = checkInput($data->complaints);
                $review->diseases_history = checkInput($data->diseases_history);
                $review->diseases_now = checkInput($data->diseases_now);
                $review->visual_inspection = checkInput($data->visual_inspection);
                $review->bite = checkInput($data->bite);
                $review->oral_mucosa = checkInput($data->oral_mucosa);
                $review->rengen_data = checkInput($data->rengen_data);

                if($review->save()){
                    $review->diagnoses()->sync($review->id);
                    return  true;
                };
                return false;
            };
        };
    }

}
