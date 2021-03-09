<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Carbon\Carbon;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */

    /*
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }
    */
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken($user->email.$user->name);
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();


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

        }

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'roles'=>$user->roles,
            'permissions'=>$user->permissions,
            'user'=>$user,
            'branch_id'=>$user->employerInfos->branch_id,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * @param Request $request
     * @return mixed
     */

    public function register(Request  $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        //dd($request->user()->token());

        return response()->json([
            'message' => 'Successfully logged out'
        ],200);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */

    public function user(Request $request)
    {
        if(!empty($request->user()))
        {
            $user = User::where('id',$request->user()->id)->with(['roles','roles.permissions'])->first();
            if($user->employerCard()->exists())
            {
                if(!empty($user->employerCard->photo))
                {
                    $user->photo = $user->employerCard->photo;
                }
            }


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
            }

        }
        return response()->json([
            'roles'=>$user->roles,
            'permissions'=>$user->permissions,
            'user'=>$user,
            'branch_id'=>$user->employerInfos->branch_id
            ],200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAllUsers()
    {
        $users = Role::with('users')->get()->groupBy('name')->toArray();

        $output = array();
        {
            foreach ($users as $key=>$user)
            {
                foreach ($user as $u)
                {
                    if($key == $u['name'])
                    {
                        $output[$key]['name'] = $u['name_ru'];
                        $output[$key]['users']= $u['users'];
                    }
                }
            }
        }
        //dd($output);
        if(!empty($output) && count($output) > 0)
        {
            return response()->json(['roles'=>$output],200);
        }
        return response()->json(['error'=>'Roles not found'],201);
    }
}
