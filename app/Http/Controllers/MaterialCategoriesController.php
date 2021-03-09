<?php

namespace App\Http\Controllers;

use App\Models\MaterialCategory;
use App\Models\MaterialUnit;
use Illuminate\Http\Request;

class MaterialCategoriesController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAll()
    {
        $materialcats = MaterialCategory::where('public',true)->where('parent_id',0)->with(['allChilds','materials','materials.units'])->get()->toArray();
        $units = MaterialUnit::where('public',true)->get();
        if(!empty($materialcats) && count($materialcats) > 0)
        {
            return response()->json([
                'success'=>'Material categories successfully loading',
                'materialcats'=>$materialcats,
                'units'=>$units
            ],200);
        }
        else
        {
            return response()->json(['error'=>'Material cats  not found'],201);
        }
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createNewCategory(Request $request)
    {
        if(!empty($request))
        {

            $exists = checkParamsIsExists([
                'code'=>$request->code,
                'name'=>$request->name,
                'parent_id'=>$request->parent_id
            ]);

            if(!$exists)
            {
                $category = new MaterialCategory();
                $category->code = checkInput($request->code);
                $category->name = checkInput($request->name);
                $category->parent_id = checkInput($request->parent_id);
                $category->public = true;
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

    public function updateNewCategory(Request $request)
    {
        if(!empty($request->id))
        {
            $exists = checkParamsIsExists([
                'code'=>$request->code,
                'name'=>$request->name,
                'parent_id'=>$request->parent_id
            ]);
            if(!$exists)
            {
                $category = MaterialCategory::find($request->id);
                $category->code = checkInput($request->code);
                $category->name = checkInput($request->name);
                $category->parent_id = checkInput($request->parent_id);
                $category->public = true;
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

    public function deleteCategory($id)
    {
        if(!empty($id) && (int)$id)
        {
            $cat= MaterialCategory::find($id);
            if(!empty($cat) && !empty($cat->id))
            {
                $cat->delete();
                return response()->json(['success'=>'Category successfully deleted'],200);

            }
            return  response()->json(['error'=>'Category not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }

}
