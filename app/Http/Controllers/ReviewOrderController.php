<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use App\Models\History;
use App\Models\Product;
use App\Models\ReviewOrder;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewOrderController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getOrders()
    {
        $orders = ReviewOrder::all()->toArray();
        if(!empty($orders) && count($orders) > 0)
        {
            return response()->json($orders,200);
        }
        return response()->json(['error'=>'Orders not found'],201);
    }

    public function getOrdersFromUserId($user_id)
    {
        if(!empty($user_id))
        {
            $orders = ReviewOrder::where('user_id',checkInput($user_id))->with(['product','doctor'])->get()->toArray();
            if(!empty($orders) && count($orders) > 0)
            {
                return response()->json($orders,200);
            }else{
                return response()->json(['error'=>'Orders not found with this user_id'],201);
            }
        }
        return response()->json(['error'=>'Invalid user_id in request'],202);
    }

    public function createOrder(Request $request)
    {
        if(!empty($request->user_id))
        {
            $errors = checkParamsIsExists([
                'doctor_id'=>$request->doctor_id,
                'user_id'=>$request->user_id,
                'product_id'=>$request->product_id
            ]);

            if(!$errors)
            {
                $user = User::find(checkInput($request->user_id));
                $product = Product::find(checkInput($request->product_id));
                $doctor = User::find(checkInput($request->doctor_id));

                if(!empty($product->id) && !empty($user->id) && !empty($doctor->id))
                {
                    $order = new ReviewOrder();
                    $order->name = 'Первичный осмотр пациента ' . $user->name;
                    $order->summ = $product->base_price;
                    $order->status = 1;
                    $order->user_id = checkInput($request->user_id);
                    $order->doctor_id = checkInput($request->doctor_id);
                    $order->product_id = checkInput($request->product_id);
                    $order->save();

                    $existHistory = History::where('user_id',$user->id)->first();
                    if(!empty($existHistory) && !empty($existHistory->id))
                    {
                        $existHistory->reviewOrders()->attach([$order->id]);
                    }
                    else
                    {
                        $history = new History();
                        $history->name = 'История болезни пациента (id) '.$user->id. ' '. $user->name;
                        $history->description = 'ФИО пациента '. $user->name . ' email ' .$user->email;
                        $history->user_id = $user->id;
                        $history->save();
                        $history->reviewOrders()->attach([$order->id]);
                    }

                    return response()->json(['success'=>'Order successfully created','order'=>$order],200);
                }
                else
                {
                    return response()->json(['error'=>'Product or User or Doctor not found with this IDs']);
                }
            }
            else
            {
                return response()->json(['type'=>'error','message'=>'Invalid parameters '. $errors],201);
            }
        }
        return response()->json(['error'=>'Invalid user_id'],201);
    }
}
