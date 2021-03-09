<?php

namespace App\Http\Controllers;

use App\Models\CabinetStorage;
use Illuminate\Http\Request;

class CabinetStorageController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllStorages()
    {
        $storages = CabinetStorage::all();
        if(!empty($storages))
        {
            return response()->json(['success'=>'Cabinet storages successfully founded','storages'=>$storages],200);
        }
        return response()->json(['error'=>'Cabinet storages not found'],201);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function getStorage($id)
    {
        if(!empty($id))
        {
            $storage = CabinetStorage::find($id);
            if(!empty($storage))
            {
                return response()->json(['success'=>'Cabinet successfully loaded','storage'=>$storage],200);
            }
            return response()->json(['error'=>'Cabinet storages not found'],201);
        }
        return response()->json(['error'=>'Cabinet storage id is invalid'],201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createStorage(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'name'=>$request->name,
                'branch_storage_id'=>$request->branch_storage_id
            ]);
            if(!$errors)
            {
                $storage = new CabinetStorage();
                $storage->name = checkInput($request->name);
                $storage->branch_storage_id = checkInput($request->branch_storage_id);
                if($storage->save())
                {
                    return response()->json(['success'=>'Cabinet storage successfully created','storage'=>$storage],200);
                }
            }else{
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

    public function editStorage(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'id'=>$request->id,
                'name'=>$request->name,
                'branch_storage_id'=>$request->branch_storage_id
            ]);
            if(!$errors)
            {
                $storage = CabinetStorage::find(checkInput($request->id));
                if(!empty($storage))
                {
                    $storage->name = checkInput($request->name);
                    $storage->branch_storage_id = checkInput($request->branch_storage_id);
                    if($storage->save())
                    {
                        return response()->json(['success'=>'Cabinet storage successfully updated','storage'=>$storage],200);
                    }
                }
                else {
                    return response()->json(['error' => 'Cabinet storage not found,bad id', 'request' => $request], 201);
                }
            }else{
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteStorage($id)
    {
        if(!empty($id))
        {
            $storage = CabinetStorage::find($id);
            if(!empty($storage))
            {
                $storage->delete();
                return response()->json(['success'=>'Cabinet storage successfully deleted'],200);
            }
            return  response()->json(['error'=>'Cabinet storage not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }
}
