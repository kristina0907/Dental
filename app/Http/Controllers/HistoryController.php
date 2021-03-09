<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function getAllHistories()
    {
        $histories = History::all();
        if(!empty($histories))
        {
            return response()->json(['success'=>'Histories are found successfully','histories'=>$histories->toArray()],200);
        }
        return response()->json(['error'=>'Histories not found'],201);
    }

    public function getHistoryFromUserId($user_id)
    {
        if(!empty($user_id))
        {
            //TODO тут в with дописать связб с ордером лечения, когда появится
            $history = History::where('user_id',checkInput($user_id))->with(['reviewOrders','reviewOrders.doctor','reviewOrders.product'])->first();
            if(!empty($history) && !empty($history->id))
            {
                return response()->json(['success'=>'History successfully found','history'=>$history->toArray()],200);
            }else{
                return response()->json(['error'=>'Histories not found'],201);
            }
        }
        return response()->json(['error'=>'Invalid user_id'],201);
    }
}
