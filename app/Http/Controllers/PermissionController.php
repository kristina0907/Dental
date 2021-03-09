<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getPermissions()
    {
        $permissions = Permission::all();
        if(!empty($permissions))
        {
            return response()->json(['success'=>'Permissions found successfully','permissions'=>$permissions],200);
        }
        return response()->json(['error'=>'Permissions not found','permissions'=>$permissions],201);
    }

    public function getFromUserId($id)
    {
        if(!empty($id) && (int)$id)
        {
            $user = User::where('id',checkInput($id))->with('roles')->first();
            if(!empty($user->id))
            {
                $permisson = Permission::whereHas('users',function ($q) use($user){
                    $q->where('user_id',$user->id);
                })->where('value',true)->get()->groupBy('screen');
                if(!empty($permisson))
                {
                    $user->permissions = $permisson;
                }else{
                    $user->permissions = [];
                }

                return response()->json(['success'=>'Permissions found successfully','user'=>$user->toArray()],200);
            }
        }
        return response()->json(['error'=>'Permissions not found','user'=>$user],201);
    }

    public function getPermissionsFromScreen($screen)
    {
        if(!empty($screen))
        {
            $permissions = Permission::where('screen',checkInput($screen))->where('value',true)->get();
            if(!empty($permissions))
            {
                return response()->json(['success'=>'Permissions found successfully','permissions'=>$permissions],200);
            }
        }
        return response()->json(['error'=>'Permissions not found','permissions'=>$permissions],201);
    }


}
