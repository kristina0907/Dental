<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialUnit;
use Illuminate\Http\Request;

class MaterialController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAll()
    {
        $materials = Material::with('units')->get();
        $units = MaterialUnit::where('public',true)->get();
        if(!empty($materials))
        {
            return response()->json(['success'=>'Materials successfully founded','materials'=>$materials,'units'=>$units],200);
        }
        return response()->json(['error'=>'Bad request'],510);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createNewMaterial(Request $request)
    {
        if(!empty($request))
        {
            $exists = checkParamsIsExists([
                'code'=>$request->code,
                'name'=>$request->name,
                'material_category_id'=>$request->material_category_id,
                'unit'=>$request->unit
            ]);

            if(!$exists)
            {
                $material = new Material();
                $material->code = checkInput($request->code);
                $material->name = checkInput($request->name);
                $material->unit = checkInput($request->unit);
                $material->material_category_id = checkInput($request->material_category_id);
                if(!empty($request->expensive))
                {
                    $material->expensive = checkInput($request->expensive);
                }
                if(!empty($request->barcode))
                {
                    $material->barcode = checkInput($request->barcode);
                }
                $material->save();
                return response()->json(['success'=>'Material successfully created'],200);
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

    public function updateMaterial(Request $request)
    {
        if(!empty($request->id) && (int)$request->id)
        {
            $exists = checkParamsIsExists([
                'code'=>$request->code,
                'name'=>$request->name,
                'material_category_id'=>$request->material_category_id,
                'unit'=>$request->unit
            ]);
            if(!$exists)
            {
                $material = Material::find($request->id);
                $material->code = checkInput($request->code);
                $material->name = checkInput($request->name);
                $material->unit = checkInput($request->unit);
                $material->material_category_id = checkInput($request->material_category_id);
                if(!empty($request->expensive))
                {
                    $material->expensive = checkInput($request->expensive);
                }
                if(!empty($request->barcode))
                {
                    $material->barcode = checkInput($request->barcode);
                }
                $material->save();
                return response()->json(['success'=>'Material successfully updated'],200);

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

    public function deleteMaterial($id)
    {
        if(!empty($id) && (int)$id)
        {
            $cat= Material::find($id);
            if(!empty($cat) && !empty($cat->id))
            {
                $cat->delete();
                return response()->json(['success'=>'Material successfully deleted'],200);
            }
            return  response()->json(['error'=>'Material not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }
}
