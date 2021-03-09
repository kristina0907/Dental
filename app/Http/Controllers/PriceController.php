<?php

namespace App\Http\Controllers;

use App\Models\PriceCategory;
use App\Models\PriceList;
use App\Models\Product;
use App\Models\UnitCategory;
use http\Env\Response;
use Illuminate\Http\Request;

class PriceController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getPrices()
    {
        $prices = PriceList::where('public','1')->with('categories',function($q){
            $q->where('public',true);
            $q->where('parent_id','0');
            $q->with(['allChilds','products']);
        })->get()->toArray();

        $units = UnitCategory::all();
        $prices['unit_categories'] = $units;
        if(!empty($prices) && count($prices) > 0)
        {
            return response()->json($prices,200);
        }
        else
        {
            return response()->json(['error'=>'Prices not found'],201);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createNewCategory(Request $request)
    {
        if(!empty($request) )
        {

           $exists = checkParamsIsExists(['code'=>$request->code,'name'=>$request->name,'parent_id'=>$request->parent_id,'price_list_id'=>$request->price_list_id]);

           if(!$exists)
           {
               $category = new PriceCategory();
               $category->code = checkInput($request->code);
               $category->name = checkInput($request->name);
               $category->parent_id = checkInput($request->parent_id);
               $category->price_list_id = checkInput($request->price_list_id);
               $category->public = 1;
               $category->save();
               return response()->json(['success'=>'Category successfully created'],200);

           }
           else {
               return response()->json(['error'=>'Parameter '.$exists.' is invalid'],201);
           }
        }
        else
        {
            return response()->json(['error'=>'Bad request'],510);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updatePriceCategory(Request $request)
    {
        if(!empty($request->id) && (int)$request->id)
        {
            $exists = checkParamsIsExists(['code'=>$request->code,'name'=>$request->name,'parent_id'=>$request->parent_id,'price_list_id'=>$request->price_list_id]);
            if(!$exists)
            {
                $category = PriceCategory::find($request->id);
                $category->code = checkInput($request->code);
                $category->name = checkInput($request->name);
                $category->parent_id = checkInput($request->parent_id);
                $category->price_list_id = checkInput($request->price_list_id);
                $category->save();
                return response()->json(['success'=>'Category successfully updated'],200);

            }
            else {
                return response()->json(['error'=>'Parameter '.$exists.' is invalid'],201);
            }
        }
        else
        {
            return response()->json(['error'=>'Parameter ID is invalid'],201);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function deletePriceCategory($id)
    {
        if(!empty($id) && (int)$id)
        {
            $cat= PriceCategory::find($id);
            if(!empty($cat) && !empty($cat->id))
            {
                $cat->delete();
                return response()->json(['success'=>'Category successfully deleted'],200);

            }
            return  response()->json(['error'=>'Category not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createNewProduct(Request $request)
    {
        if(!empty($request))
        {
            $exists = checkParamsIsExists(['code'=>$request->code,'name'=>$request->name,'base_price'=>$request->base_price,'price_category_id'=>$request->price_category_id,'units_category_id'=>$request->units_category_id,'price_list_id'=>$request->price_list_id]);

            if(!$exists)
            {
                $product = new Product();
                $product->code = checkInput($request->code);
                $product->name = checkInput($request->name);
                $product->base_price = checkInput($request->base_price);
                $product->price_category_id = checkInput($request->price_category_id);
                $product->units_category_id = checkInput($request->units_category_id);
                $product->price_list_id = checkInput($request->price_list_id);
                $product->save();
                return response()->json(['success'=>'Product successfully created'],200);

            }
            else {
                return response()->json(['error'=>'Parameter '.$exists.' is invalid'],201);
            }

        }
        else{
            return response()->json(['error'=>'Bad request'],510);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateProduct(Request $request)
    {
        if(!empty($request->id) && (int)$request->id)
        {
            $exists = checkParamsIsExists(['code'=>$request->code,'name'=>$request->name,'base_price'=>$request->base_price,'price_category_id'=>$request->price_category_id,'units_category_id'=>$request->units_category_id,'price_list_id'=>$request->price_list_id]);
            if(!$exists)
            {
                $product = Product::find($request->id);
                $product->code = checkInput($request->code);
                $product->name = checkInput($request->name);
                $product->base_price = checkInput($request->base_price);
                $product->price_category_id = checkInput($request->price_category_id);
                $product->units_category_id = checkInput($request->units_category_id);
                $product->price_list_id = checkInput($request->price_list_id);
                $product->save();
                return response()->json(['success'=>'Product successfully updated'],200);

            }
            else {
                return response()->json(['error'=>'Parameter '.$exists.' is invalid'],201);
            }
        }
        else
        {
            return response()->json(['error'=>'Parameter ID is invalid'],201);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteProduct($id)
    {
        if(!empty($id) && (int)$id)
        {
            //TODO убрать после теста проверку на айди услуги
            if((int)$id !== (int)19)
            {
                $cat= Product::find($id);
                if(!empty($cat) && !empty($cat->id))
                {
                    $cat->delete();
                    return response()->json(['success'=>'Product successfully deleted'],200);

                }
                return  response()->json(['error'=>'Product not found']);
            }

            return  response()->json(['error'=>'This product could not delete']);
        }
        return response()->json(['error'=>'Bad request']);
    }

}
