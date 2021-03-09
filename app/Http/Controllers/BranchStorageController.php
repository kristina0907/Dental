<?php

namespace App\Http\Controllers;

use App\Models\BranchStorage;
use App\Models\MaterialProvider;
use Illuminate\Http\Request;

class BranchStorageController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllStorages()
    {
        $storages = BranchStorage::all();
        if(!empty($storages))
        {
            return response()->json(['success'=>'Branch storages successfully founded','storages'=>$storages],200);
        }
        return response()->json(['error'=>'Branch storages not found'],201);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function getStorage($id)
    {
        if(!empty($id))
        {
            $storage = BranchStorage::find($id);
            if(!empty($storage))
            {
                return response()->json(['success'=>'Branch successfully loaded','storage'=>$storage],200);
            }
            return response()->json(['error'=>'Branch storages not found'],201);
        }
        return response()->json(['error'=>'Branch id is invalid'],201);

    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getProviders()
    {
        $providers = MaterialProvider::all();
        if(!empty($providers))
        {
            return response()->json(['success'=>'Providers successfully loaded','providers'=>$providers],200);
        }
        return response()->json(['error'=>'Providers storages not found'],201);
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
                'branch_id'=>$request->branch_id
            ]);
            if(!$errors)
            {
                $storage = new BranchStorage();
                $storage->name = checkInput($request->name);
                $storage->branch_id = checkInput($request->branch_id);
                if($storage->save())
                {
                    return response()->json(['success'=>'Branch storage successfully created','storage'=>$storage],200);
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
                'branch_id'=>$request->branch_id
            ]);
            if(!$errors)
            {
                $storage = BranchStorage::find(checkInput($request->id));
                if(!empty($storage))
                {
                    $storage->name = checkInput($request->name);
                    $storage->branch_id = checkInput($request->branch_id);
                    if($storage->save())
                    {
                        return response()->json(['success'=>'Branch storage successfully updated','storage'=>$storage],200);
                    }
                }
                else {
                    return response()->json(['error' => 'Branch storage not found,bad id', 'request' => $request], 201);
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
            $storage = BranchStorage::find($id);
            if(!empty($storage))
            {
                $storage->delete();
                return response()->json(['success'=>'Branch storage successfully deleted'],200);
            }
            return  response()->json(['error'=>'Branch storage not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }
}
