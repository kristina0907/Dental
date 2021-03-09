<?php

namespace App\Http\Controllers;

use App\Models\BranchStorage;
use App\Models\BranchStorageInvoice;
use App\Models\BranchStorageItem;
use App\Models\MaterialProvider;
use App\Models\User;
use Illuminate\Http\Request;

class BranchStorageInvoicesController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCats()
    {
        $providers = MaterialProvider::all();
        $storages = BranchStorage::all();
        $users = User::whereHas('roles',function ($q){
            $q->where('name','storekeeper');
        })->get();
        if(!empty($providers) && !empty($storages))
        {
            return response()->json(['success'=>'Providers and storages successfully found','providers'=>$providers,'users'=>$users,'storages'=>$storages],200);
        }
        return response()->json(['error'=>'Bad request'],201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createInvoice(Request $request)
    {
        //dd($request);
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'branch_storage_id'=>$request->branch_storage_id,
                'provider_id'=>$request->provider_id,
                'invoice_number'=>$request->invoice_number,
                'invoice_date'=>$request->invoice_date,
                'date_of_receiving'=>$request->date_of_receiving,
            ]);
            if(!$errors)
            {
                $invoice = new BranchStorageInvoice();
                $invoice->branch_storage_id = checkInput($request->branch_storage_id);
                $invoice->provider_id = checkInput($request->provider_id);
                $invoice->invoice_number = checkInput($request->invoice_number);
                $invoice->invoice_date = checkInput($request->invoice_date);
                $invoice->date_of_receiving = checkInput($request->date_of_receiving);
                if(!empty($request->comment))
                {
                    $invoice->comment = checkInput($request->comment);
                }
                if(!empty($request->user_id))
                {
                    $invoice->user_id = checkInput($request->user_id);
                }
                if($invoice->save())
                {
                    if(!empty($request->materials))
                    {
                        $items = $this->createItems($request->materials,$invoice);

                        if($items)
                        {
                            return response()->json(['success'=>'Invoice and items successfully created','invoice'=>$invoice],200);
                        }
                    }
                    else
                    {
                        return response()->json([
                            'error'=>'Parameter materials is invalid'
                        ],201);
                    }
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
            return response()->json(['error'=>'Bad request'],201);
        }
    }

    /**
     * @param $materials
     * @param $invoice
     * @return bool|\Illuminate\Http\JsonResponse
     */

    private function createItems($materials,$invoice)
    {

        foreach ($materials as $material)
        {

            $errs = checkParamsIsExists([
                'branch_storage_id'=> $invoice->branch_storage_id,
                'material_id'=>$material['material_id'],
                'quantity'=>$material['quantity'],
                'base_price'=>$material['base_price']
            ]);
            if(!$errs)
            {
                $item = new BranchStorageItem();
                $item->branch_storage_id = $invoice->branch_storage_id;
                $item->material_id = checkInput($material['material_id']);
                $item->quantity = checkInput($material['quantity']);
                $item->base_price = checkInput($material['base_price']);
                $item->material_invoice_id = $invoice->id;
                $item->save();
            }
            else
            {
                return response()->json([
                    'error'=>'Parameter ' .$errs.' is invalid'
                ],201);
            }
        }
        return true;
    }

}
