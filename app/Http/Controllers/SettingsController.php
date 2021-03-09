<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Cabinet;
use App\Models\Profession;
use App\Models\Smena;
use Illuminate\Http\Request;

class SettingsController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createBranch(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
               'title'=>$request->name,
               'address'=>$request->address
            ]);
            if(!$errors)
            {
                $branch = new Branch();
                $branch->title = checkInput($request->name);
                $branch->adress = checkInput($request->address);
                if($branch->save())
                {
                    $branch->smenas = array();
                    $branch->cabinets = array();
                    return response()->json(['success'=>'Branch successfully created','branch'=>$branch],200);
                }
            }
            else
            {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
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

    public function createSmenas(Request $request)
    {

        if(!empty($request))
        {   $output = array();
            if(!empty($request->smenas))
            {
                foreach ($request->smenas as $key=> $smena)
                {
                    $output[$key][] = $this->createSmena($smena);
                }
                return  response()->json(['success'=>'Smenas create successfully','smenas'=>$output],200);
            }
            else
            {
                return  response()->json(['error'=>'Smenas in request not found','request'=>$request],201);
            }
        }
        else
        {
            return response()->json(['error' => 'Bad request'], 201);
        }
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function getBranchesWithCabinetsSmenas()
    {
        $branches = Branch::with(['cabinets','smenas'])->get();
        if(!empty($branches))
        {
            return response()->json(['success'=>'Branches successfully found','branches'=>$branches],200);
        }
        return response()->json(['error' => 'Bad request'], 201);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteBranch($id)
    {
        if(!empty($id) && (int)$id)
        {
            $cat= Branch::find($id);
            if(!empty($cat) && !empty($cat->id))
            {
                $cat->delete();
                return response()->json(['success'=>'Branch successfully deleted'],200);

            }
            return  response()->json(['error'=>'Branch not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function deleteCabinet($id)
    {
        if(!empty($id) && (int)$id)
        {
            $cat= Cabinet::find($id);
            if(!empty($cat) && !empty($cat->id))
            {
                $cat->delete();
                return response()->json(['success'=>'Cabinet successfully deleted'],200);

            }
            return  response()->json(['error'=>'Cabinet not found']);
        }
        return response()->json(['error'=>'Bad request']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function createCabinet(Request $request)
    {
        if(!empty($request))
        {
            $errors = checkParamsIsExists([
                'name'=>$request->name,
                'branch_id'=>$request->branch_id,
                'color'=>$request->color
            ]);
            if(!$errors)
            {
                $cabinet = new Cabinet();
                $cabinet->name = checkInput($request->name);
                $cabinet->branch_id = checkInput($request->branch_id);
                $cabinet->color = checkInput($request->color);
                if($cabinet->save())
                {
                    $branches = Branch::with(['cabinets','smenas'])->get();
                    return response()->json(['success'=>'Cabinet successfully created','cabinet'=>$branches],200);
                }
            }
            else
            {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
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

    private function createSmena($smena)
    {

        if(!empty($smena))
        {
            $errors = checkParamsIsExists([
                'name'=>$smena->name,
                'time_start'=>$smena->time_start,
                'time_end'=>$smena->time_end,
                'branch_id'=>$smena->branch_id
            ]);
            if(!$errors)
            {
                $smena = new Smena();
                $smena->name = checkInput($smena->name);
                $smena->time_start = checkInput($smena->time_start);
                $smena->time_end = checkInput($smena->time_end);
                $smena->branch_id = checkInput($smena->branch_id);
                if($smena->save())
                {
                    return  $smena;
                }

            }
            else
            {
                return response()->json([
                    'error' => 'Parameter ' . $errors . ' is invalid'
                ], 201);
            }
        }
    }


}
