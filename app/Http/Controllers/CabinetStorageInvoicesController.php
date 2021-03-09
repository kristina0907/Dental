<?php

namespace App\Http\Controllers;

use App\Models\BranchStorage;
use App\Models\BranchStorageInvoice;
use App\Models\BranchStorageItem;
use App\Models\CabinetStorage;
use App\Models\CabinetStorageInvoice;
use App\Models\CabinetStorageItem;
use App\Models\Material;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CabinetStorageInvoicesController extends Controller
{


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getInvoicesFromFilters(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'type'=>$request->type,
                'period'=>$request->period,
                'branch_id'=>$request->branch_id,
            ]);
            $output = array();
            if(!$errors)
            {

                if((string)$request->type === (string)'branch')
                {
                    $output = $this->getFiltersData($request,'branch');
                }
                else
                {
                    if((string)$request->type == (string)'cabinet')
                    {
                        $output = $this->getFiltersData($request,'cabinet');
                    }
                }
                if(!empty($output) && count($output) > 0)
                {
                    return response()->json(['success' => 'Data successfully found','output'=>$output], 200);
                }
                else
                {
                    return response()->json(['error' => 'Data not found ','output'=>$output], 201);
                }

            }
            else
            {
                return response()->json(['error' => 'invalid parameter '.$errors], 201);
            }
        }
        else
        {
            return response()->json(['error'=>'Bad request'],401);
        }
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersDataBranchRequest($date,$request)
    {
            $output =  BranchStorageInvoice::whereDate('invoice_date',$date)
                ->whereHas('storages',function ($q) use ($request){
                    $q->where('branch_id',checkInput($request->branch_id));
                })
                ->when($request->provider_id, function ($query, $request) {
                    return $query->where('provider_id', $request);
                })
                ->when($request->branch_storage_id, function ($query, $request) {
                    return $query->where('branch_storage_id', $request);
                })
                ->when($request->user_id, function ($query, $request) {
                    return $query->where('user_id', $request);
                })
                ->with(['storages','kladovshik','items.materials','providers'])
                ->get();

       return $output;
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersDataCabinetRequest($date,$request)
    {
        $output = CabinetStorageInvoice::whereDate('invoice_date',$date)
            ->whereHas('storages',function ($q) use ($request){
                $q->where('branch_storage_id',checkInput($request->branch_id));
            })
            ->when($request->cabinet_storage_id, function ($query, $request) {
                return $query->where('cabinet_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','branchStorages','items.materials','items.branches'])
            ->get();

        return $output;
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersMonthBranchRequest($date,$request)
    {
        $output = BranchStorageInvoice::whereMonth('invoice_date',$date)
            ->whereHas('storages',function ($q) use ($request){
                $q->where('branch_id',checkInput($request->branch_id));
            })
            ->when($request->provider_id, function ($query, $request) {
                return $query->where('provider_id', $request);
            })
            ->when($request->branch_storage_id, function ($query, $request) {
                return $query->where('branch_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','items.materials','providers'])
            ->get();

        return $output;
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersMonthCabinetRequest($date,$request)
    {
        $output = CabinetStorageInvoice::whereMonth('invoice_date',$date)
            ->whereHas('storages',function ($q) use ($request){
                $q->where('branch_storage_id',checkInput($request->branch_id));
            })
            ->when($request->cabinet_storage_id, function ($query, $request) {
                return $query->where('cabinet_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','branchStorages','items.materials','items.branches'])
            ->get();

        return $output;
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersYearBranchRequest($date,$request)
    {
        $output = BranchStorageInvoice::whereYear('invoice_date',$date)
            ->whereHas('storages',function ($q) use ($request){
                $q->where('branch_id',checkInput($request->branch_id));
            })
            ->when($request->provider_id, function ($query, $request) {
                return $query->where('provider_id', $request);
            })
            ->when($request->branch_storage_id, function ($query, $request) {
                return $query->where('branch_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','items.materials','providers'])
            ->get();

        return $output;
    }

    /**
     * @param $date
     * @param $request
     * @return mixed
     */

    private function getFiltersYearCabinetRequest($date,$request)
    {
        $output = CabinetStorageInvoice::whereYear('invoice_date',$date)
            ->whereHas('storages',function ($q) use ($request){
                $q->where('branch_storage_id',checkInput($request->branch_id));
            })
            ->when($request->cabinet_storage_id, function ($query, $request) {
                return $query->where('cabinet_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','branchStorages','items.materials','items.branches'])
            ->get();

        return $output;
    }

    /**
     * @param $request
     * @return mixed
     */

    private function getFiltersAllBranchRequest($request)
    {
        $output =  BranchStorageInvoice::
            whereHas('storages',function ($q) use ($request){
                $q->where('branch_id',checkInput($request->branch_id));
            })
            ->when($request->provider_id, function ($query, $request) {
                return $query->where('provider_id', $request);
            })
            ->when($request->branch_storage_id, function ($query, $request) {
                return $query->where('branch_storage_id', $request);
            })
            ->when($request->user_id, function ($query, $request) {
                return $query->where('user_id', $request);
            })
            ->with(['storages','kladovshik','items.materials','providers'])
            ->get();

        return $output;
    }

    /**
     * @param $request
     * @return mixed
     */

    private function getFiltersAllCabinetRequest($request)
    {
        $output =  CabinetStorageInvoice::
                whereHas('storages',function ($q) use ($request){
                    $q->where('branch_storage_id',checkInput($request->branch_id));
                })
                ->when($request->cabinet_storage_id, function ($query, $request) {
                    return $query->where('cabinet_storage_id', $request);
                })
                ->when($request->user_id, function ($query, $request) {
                    return $query->where('user_id', $request);
                })
                ->with(['storages','kladovshik','branchStorages','items.materials','items.branches'])
                ->get();

        return $output;
    }

    /**
     * @param $request
     * @param $type
     * @return array
     */

    private function getFiltersData($request,$type)
    {
        $output = array();
        if(!empty($request->period))
        {
            /**
             * DAY filters
             */
            if((string)$request->period === (string)"day")
            {
                $date = Carbon::today();

                if((string)$type === (string)"branch")
                {
                    $output['branch_invoices'] = $this->getFiltersDataBranchRequest($date,$request);
                }
                elseif ((string)$type === (string)"cabinet")
                {
                    $output['cabinet_invoices'] = $this->getFiltersDataCabinetRequest($date,$request);
                }

            }

            /**
             * MONTH filters
             */
            if((string)$request->period === (string)"month")
            {
                $date = Carbon::now()->month;

                if((string)$type === (string)"branch")
                {
                    $output['branch_invoices'] = $this->getFiltersMonthBranchRequest($date,$request);
                }
                elseif ((string)$type === (string)"cabinet")
                {
                    $output['cabinet_invoices'] = $this->getFiltersMonthCabinetRequest($date,$request);
                }

            }

            /**
             * YEAR filters
             */
            if((string)$request->period === (string)"year")
            {
                $date = Carbon::now()->year;

                if((string)$type === (string)"branch")
                {
                    $output['branch_invoices'] = $this->getFiltersYearBranchRequest($date,$request);
                }
                elseif ((string)$type === (string)"cabinet")
                {
                    $output['cabinet_invoices'] = $this->getFiltersYearCabinetRequest($date,$request);
                }

            }

            /**
             * ALL filters
             */
            if((string)$request->period === (string)"all")
            {

                if((string)$type === (string)"branch")
                {
                    $output['branch_invoices'] = $this->getFiltersAllBranchRequest($request);
                }
                elseif ((string)$type === (string)"cabinet")
                {
                    $output['cabinet_invoices'] = $this->getFiltersAllCabinetRequest($request);
                }

            }
        }
        return $output;

    }

    /**
     * @param $cabinet_invoices
     * @return mixed
     */

    private function addBranchFrom($cabinet_invoices)
    {
        if(!empty($cabinet_invoices))
        {
            foreach ($cabinet_invoices as $invoice)
            {
                if($invoice->items()->exists())
                {
                    foreach ($invoice->items as $item)
                    {
                        if($item->branches()->exists())
                        {
                            $invoice->branch_from = $item->branches->name;
                            //dd($invoice);
                            break;

                        }
                    }
                }
            }
        }
        return $cabinet_invoices;
    }

    /**
     * @param $branch_invoices
     * @return mixed
     */

    private function addSummToBranchInvoices($branch_invoices)
    {
        if(!empty($branch_invoices))
        {
            foreach ($branch_invoices as $invoice)
            {
                if($invoice->items()->exists())
                {
                    $invoice->invoice_summ = $this->calculateItemsInInvoice($invoice->items);
                }
            }
        }

        return $branch_invoices;
    }

    /**
     * @param $cabinet_invoices
     * @return mixed
     */

    private function addSummToCabinetInvoices($cabinet_invoices)
    {
        if(!empty($cabinet_invoices))
        {
            foreach ($cabinet_invoices as $invoice)
            {
                $invoice->invoice_summ = $this->calculateItemsInInvoice($invoice->items);
            }
        }

        return $cabinet_invoices;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getInvoices(Request $request)
    {
        if(!empty($request->branch_id))
        {
            $branch_invoices = BranchStorageInvoice::with(['storages','kladovshik','items.materials','providers'])->get();
            $cabinet_invoices = CabinetStorageInvoice::with(['storages','kladovshik','items.materials','items.branches'])->get();

            $cabinet_invoices = $this->addBranchFrom($cabinet_invoices);
            $branch_invoices = $this->addSummToBranchInvoices($branch_invoices);
            $cabinet_invoices = $this->addSummToCabinetInvoices($cabinet_invoices);

            $output['branch_invoices'] = $branch_invoices;
            $output['cabinet_invoices'] = $cabinet_invoices;

            if(!empty($output))
            {
                return response()->json(['success' => 'Branch invoices successfully found','output'=>$output], 200);
            }
        }
        else
        {
            return response()->json(['error' => 'invalid parameter branch_id'], 201);
        }
    }

    /**
     * @param $items
     * @return float|int
     */

    private function calculateItemsInInvoice($items)
    {
        $summ = 0;
        if(!empty($items))
        {
            foreach ($items as $item)
            {
                $summ = (int)$summ + ((int)$item->quantity * (int)$item->base_price);
            }
        }
        return $summ;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCats()
    {

        $branch_storages = BranchStorage::with('cabinetstorages')->get();
        $users = User::whereHas('roles',function ($q){
            $q->where('name','storekeeper');
        })->get();
        if (!empty($branch_storages)) {
            return response()->json(['success' => 'Branch storages successfully found', 'users'=>$users, 'branch_storages' => $branch_storages], 200);
        }
        return response()->json(['error' => 'Bad request'], 201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getQuantitys(Request $request)
    {
        if(!empty($request))
        {
            if(!empty($request->branch_storage_id))
            {
                $output = array();
                $items = BranchStorageItem::where('branch_storage_id',checkInput($request->branch_storage_id))->get();
                //dd($items);
                if(!empty($items))
                {
                    foreach ($items as $key=> $item)
                    {

                        if($item->exists('materials.categories'))
                        {
                             $output[$key]['category']['materials']['name']=$item->materials->name ;
                        }

                    }

                    return response()->json(['success'=>'Items successfully loaded','items'=>$output],200);
                }
            }
        }
        else
        {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function getQuantityFromStorage(Request $request)
    {
        if (!empty($request)) {
            $errors = checkParamsIsExists([
                'storage_id' => $request->storage_id,
                'material_category_id' => $request->material_category_id
            ]);

            if (!$errors) {
                $materials = Material::where('material_category_id',checkInput($request->material_category_id))
                    ->whereHas('storageItems',function ($q) use ($request){
                        $q->where('branch_storage_id',checkInput($request->storage_id));
                    })
                    ->with('storageItems')
                ->get();

                if(!empty($materials))
                {

                    $output = array();
                    foreach ($materials as $key=>$material)
                    {

                        $output[$key]['quantity'] = 0;

                        if (!empty($material->storageItems)) {

                            foreach ($material->storageItems as $item) {
                                $output[$key]['material'] = $material;
                                $output[$key]['quantity'] = (int)  $output[$key]['quantity'] + (int)$item->quantity;
                            }
                        }
                    }
                    return response()->json(['success' => 'Materials successfully found', 'material' => $output], 200);
                }

            } else {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }

        }
        return response()->json(['error' => 'Bad request'], 201);
    }

    /**
     * @param Request $request
     */

    public function createInvoiceStock(Request $request)
    {

        if (!empty($request)) {

            $errors = checkParamsIsExists([
                'cabinet_storage_id' => $request->cabinet_storage_id,
                'invoice_date' => $request->invoice_date,
                'user_id' => $request->user_id,
                'branch_storage_id'=>$request->branch_storage_id
            ]);
            if (!$errors) {

                     $invoice = $this->createInvoice($request);

                     if($invoice){

                         if (!empty($request->materials)) {

                             $items = $this->createItems($request->materials, $invoice,$request->branch_storage_id);

                             if ($items)
                             {
                                 return response()->json(['success' => 'Invoice and items successfully created', 'invoice' => $items], 200);
                             }
                             else
                             {
                                 return response()->json(['error' => 'Not enough materials in stock', 'invoice' => $items], 201);
                             }
                         }
                         else {
                             return response()->json([
                                 'error' => 'Parameter materials is invalid'
                             ], 201);
                         }

                     }
            } else {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }
        } else {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }

    /**
     * @param $materials
     * @param false $invoice
     * @return bool|\Illuminate\Http\JsonResponse
     */

    private function createItems($materials, $invoice=false,$branch_storage_id)
    {
        $newitems = array();

        foreach ($materials as $key=>$material)
        {


            $errs = checkParamsIsExists([
                'branch_storage_id' => $branch_storage_id,
                'material_id' => $material['material_id'],
                'quantity' => $material['quantity'],
                'base_price' => $material['base_price']
            ]);
            if (!$errs) {

                $items = BranchStorageItem::where('material_id', checkInput($material['material_id']))
                    ->where('branch_storage_id', checkInput($branch_storage_id))->get();
                //dd($items);
                $spisaniye = (int)$material['quantity'];

                if (!empty($items)) {
                    $inStock = $this->checkQuantity($items);
                    $newitems[$key] = $this->getSpisaniyeItem($items,$spisaniye,$inStock);

                    if(!empty($newitems))
                    {
                        $new = $this->createStorageItem($material,$invoice,$branch_storage_id);
                    }
                }
                else
                {
                    dd($items);
                }

            }
            else
            {
                return response()->json([
                    'error' => 'Parameter ' . $errs . ' is invalid'
                ], 201);
            }
        }
        return $newitems;
    }

    /**
     * @param $items
     * @param $spisaniye
     * @return array
     */

    private function getSpisaniyeItem($items,$spisaniye,$inStock)
    {
         $output = array();
         $ostatok = (int)$spisaniye;

         if((int)$inStock >= (int)$spisaniye)
         {
             if(!empty($items) && (int)$ostatok >0)
             {
                 foreach ($items as $key=> $item)
                 {
                     if((int)$ostatok > (int)0)
                     {
                         $cur_diff = (int)$ostatok - (int)$item->quantity;
                         if((int)$cur_diff >= (int)0)
                         {
                             $toSpisaniye =  (int)$ostatok - (int)$cur_diff;
                             $item->quantity = (int)$item->quantity - (int)$toSpisaniye;
                             if((int)$item->quantity >= 0)
                             {
                                 $item->save();
                                 $ostatok = (int)$ostatok - (int)$toSpisaniye;
                                 $output[$key]['item']=$item;
                             }
                         }
                         else
                         {
                             if((int)$cur_diff < (int)0)
                             {
                                 $item->quantity = (int)$item->quantity - (int)$ostatok;
                                 if((int)$item->quantity >= 0)
                                 {
                                     $item->save();
                                     $ostatok = 0;
                                     $output[$key]['item']=$item;
                                 }

                             }
                         }
                     }
                 }
             }
             return $output;
         }
        return $output;
    }

    /**
     * @param $items
     * @return int
     */

    private function checkQuantity($items)
    {
        if(!empty($items))
        {
            $summ = 0;
            foreach ($items as $item)
            {
               $summ = (int)$summ + (int)$item->quantity;
            }
            return $summ;
        }
    }

    /**
     * @param $data
     * @return CabinetStorageInvoice|false
     */

    private function createInvoice($data)
    {
        $invoice = new CabinetStorageInvoice();
        $invoice->cabinet_storage_id = checkInput($data->cabinet_storage_id);
        $invoice->invoice_date = checkInput($data->invoice_date);
        $invoice->user_id = checkInput($data->user_id);
        $invoice->branch_storage_id = checkInput($data->branch_storage_id);
        if (!empty($data->comment)) {
            $invoice->comment = checkInput($data->comment);
        }
        if ($invoice->save()) {
            return $invoice;
        }
        return false;
    }

    /**
     * @param $data
     * @return CabinetStorageItem|false
     */

    private function createStorageItem($data,$invoice,$branch_storage_id)
    {

        $item = new CabinetStorageItem();
        $item->branch_storage_id = checkInput($branch_storage_id);
        $item->material_id = checkInput($data['material_id']);
        $item->quantity = checkInput($data['quantity']);
        $item->base_price = checkInput($data['base_price']);
        $item->material_invoice_id = $invoice->id;
        if($item->save())
        {
            return $item;
        }
        return false;
    }

}
