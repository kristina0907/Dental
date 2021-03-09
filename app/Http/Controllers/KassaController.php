<?php

namespace App\Http\Controllers;

use App\Models\Kassa;
use App\Models\User;
use Illuminate\Http\Request;

class KassaController extends Controller
{
    //

    public function testPrint()
    {

        $req = '{
                  "uuid": "0ba40014-5fa5-11ea-b5e9-037d4786a49p",
                  "request": [
                    {
                      "type": "sell",
                      "taxationType": "osn",
                      "ignoreNonFiscalPrintErrors": true,
                      "operator": {
                        "name": "Иванов",
                        "vatin": 123654789507
                      },
                      "items": [
                        {
                          "type": "position",
                          "name": "Бананы",
                          "price": 1.11,
                          "quantity": 1,
                          "amount": 1.11,
                          "infoDiscountAmount": 0,
                          "department": 1,
                          "measurementUnit": "кг",
                          "paymentMethod": "advance",
                          "paymentObject": "commodity",
                          "nomenclatureCode": "RE0ELx+WgXhKZ1hKNS5UMTEyMDAw",
                          "tax": {
                            "type": "vat20"
                          },
                          "agentInfo": {
                            "agents": [
                              "payingAgent",
                              "bankPayingAgent"
                            ],
                            "payingAgent": {
                              "operation": "Оплата",
                              "phones": [
                                79161112233
                              ]
                            },
                            "receivePaymentsOperator": {
                              "phones": [
                                79163331122
                              ]
                            },
                            "moneyTransferOperator": {
                              "phones": [
                                79162223311
                              ],
                              "name": "Оператор перевода",
                              "address": "Улица Оператора Перевода д.1",
                              "vatin": 321456987121
                            }
                          },
                          "supplierInfo": {
                            "phones": [
                              79175555555
                            ],
                            "name": "Поставщик",
                            "vatin": 956839506500
                          }
                        },
                        {
                          "type": "text",
                          "text": "--------------------------------",
                          "alignment": "left",
                          "font": 0,
                          "doubleWidth": false,
                          "doubleHeight": false
                        },
                        {
                          "type": "position",
                          "name": "Шуба",
                          "price": 1.11,
                          "quantity": 1,
                          "amount": 1.11,
                          "department": 1,
                          "paymentMethod": "fullPayment",
                          "paymentObject": "commodity",
                          "nomenclatureCode": {
                            "type": "furs",
                            "gtin": 98765432101234,
                            "serial": "RU-430302-ABC1234567"
                          },
                          "tax": {
                            "type": "vat10"
                          }
                        },
                        {
                          "type": "text",
                          "text": "--------------------------------",
                          "alignment": "left",
                          "font": 0,
                          "doubleWidth": false,
                          "doubleHeight": false
                        },
                        {
                          "type": "position",
                          "name": "Кефир",
                          "price": 1.11,
                          "quantity": 1,
                          "amount": 1.11,
                          "department": 1,
                          "measurementUnit": "шт.",
                          "paymentMethod": "fullPrepayment",
                          "paymentObject": "excise",
                          "additionalAttribute": "ID:iASDv3w45",
                          "tax": {
                            "type": "vat0"
                          }
                        },
                        {
                          "type": "barcode",
                          "barcode": 123456789012,
                          "barcodeType": "EAN13",
                          "scale": 2
                        }
                      ],
                      "payments": [
                        {
                          "type": "cash",
                          "sum": 2000
                        }
                      ],
                      "total": 224
                    }
                  ]
            }';



        $ch = curl_init("http://127.0.0.1:16732/api/v2/requests");

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            array(
                'Content-Type:application/json',
                'Content-Length: ' . strlen($req)
            )
        );
        $response = curl_exec($ch);

        curl_close($ch);

        dd($response);
    }

    public function getDevices(Request $request)
    {
        if(!empty($request))
        {
            if(!empty($request->branch_id))
            {
                $kassa = Kassa::whereHas('branch',function($q) use ($request)
                {
                    $q->where('branch_id',checkInput($request->branch_id));
                })->get();
                $users = User::whereHas('roles',function ($q){
                    $q->where('name','admin');
                })->whereHas('employerInfos',function($req) use ($request){
                    $req->where('branch_id',checkInput($request->branch_id));
                })->get();
                if(!empty($kassa))
                {
                    return response()->json(['success'=>'Kassa successfully found','kassas'=>$kassa,'users'=>$users],200);
                }
            }
        }
        else
        {
            return response()->json(['error'=>'Invalid branch_id'],201);
        }
    }
}
