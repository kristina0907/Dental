<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ToothController;
use App\Http\Controllers\SheduleController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ReviewOrderController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\MaterialCategoriesController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\BranchStorageController;
use App\Http\Controllers\CabinetStorageController;
use App\Http\Controllers\BranchStorageInvoicesController;
use App\Http\Controllers\CabinetStorageInvoicesController;
use App\Http\Controllers\DoctorShedulesController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CrmController;
use App\Http\Controllers\KassaController;
use App\Http\Controllers\TasksForCallingController;
use App\Http\Controllers\WaitingListsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 *  API Routes
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user()->with('roles');
});


/**
 *
 * PERMISSIONS Routes
 *
 */
Route::group(['prefix' => 'permissions'],
    function ()
    {
        Route::get('/get/all',[PermissionController::class,'getPermissions']);
        Route::get('/get/from/user/{id}',[PermissionController::class,'getFromUserId']);
        Route::get('/get/from/screen/{id}',[PermissionController::class,'getPermissionsFromScreen']);
    }
);


/**
 * PATIENTS Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'patients'
    ],
    function ()
    {
        Route::get('/get',[PatientController::class,'getPatients']);
        Route::get('/get/from/id/{id}',[PatientController::class,'getPatientFromId']);

        Route::post('/search', [SearchController::class,'searchPatients']);
        Route::post('/update',[PatientController::class,'updatePatient']);

        Route::get('/get/toothcard/{id}',[ToothController::class,'getToothcard']);
        Route::post('/toothcard/save',[ToothController::class,'saveToothReview']);

        Route::post('/images/upload',[PatientController::class,'uploadImages']);
        Route::post('/images/update',[PatientController::class,'udpateImages']);
        Route::post('/images/get',[PatientController::class,'getImages']);
        Route::post('/images/delete',[PatientController::class,'deleteImages']);


    }
);

/**
 * PATIENTS Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'prices'
    ],
    function ()
    {
        Route::get('/get',[PriceController::class,'getPrices']);
        Route::post('/category/add',[PriceController::class,'createNewCategory']);
        Route::post('/category/update',[PriceController::class,'updatePriceCategory']);
        Route::get('/category/delete/{id}',[PriceController::class,'deletePriceCategory']);

        Route::post('/product/create',[PriceController::class,'createNewProduct']);
        Route::post('/product/update',[PriceController::class,'updateProduct']);
        Route::get('/product/delete/{id}',[PriceController::class,'deleteProduct']);


    }
);


/**
 * ORDERS Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'orders'
    ],
    function ()
    {
        Route::get('/review/get/all',[ReviewOrderController::class,'getOrders']);
        Route::get('/review/get/{user_id}',[ReviewOrderController::class,'getOrdersFromUserId']);
        Route::post('/review/create',[ReviewOrderController::class,'createOrder']);

    }
);

/**
 * BRANCH Storage Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'branchstorage'
],
    function ()
    {
        Route::get('/get/all',[BranchStorageController::class,'getAllStorages']);
        Route::get('/get/branch/{id}',[BranchStorageController::class,'getStorage']);
        Route::post('/create',[BranchStorageController::class,'createStorage']);
        Route::post('/edit',[BranchStorageController::class,'editStorage']);
        Route::get('/storage/delete/{id}',[BranchStorageController::class,'deleteStorage']);

    }
);

/**
 * BRANCH Invoices Storage Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'branchinvoices'
],
    function ()
    {
        Route::get('/get/cats',[BranchStorageInvoicesController::class,'getCats']);
        Route::post('/create',[BranchStorageInvoicesController::class,'createInvoice']);
    }
);


/**
 * CABINET Invoices Storage Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'cabinetinvoices'
],
    function ()
    {
        Route::post('/get/invoices/from_filters',[CabinetStorageInvoicesController::class,'getInvoicesFromFilters']);
        Route::get('/get/invoices',[CabinetStorageInvoicesController::class,'getInvoices']);
        Route::get('/get/cats',[CabinetStorageInvoicesController::class,'getCats']);
        Route::post('/get/quantity',[CabinetStorageInvoicesController::class,'getQuantityFromStorage']);
        Route::post('/create',[CabinetStorageInvoicesController::class,'createInvoiceStock']);
        Route::post('/get/items',[CabinetStorageInvoicesController::class,'getQuantitys']);
        // Route::post('/edit',[BranchStorageController::class,'editStorage']);
        // Route::get('/storage/delete/{id}',[BranchStorageController::class,'deleteStorage']);

    }
);

/**
 * Cabinet Storage Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'cabinetstorage'
],
    function ()
    {
        Route::get('/get/all',[CabinetStorageController::class,'getAllStorages']);
        Route::get('/get/branch/{id}',[CabinetStorageController::class,'getStorage']);
        Route::post('/create',[CabinetStorageController::class,'createStorage']);
        Route::post('/edit',[CabinetStorageController::class,'editStorage']);
        Route::get('/storage/delete/{id}',[CabinetStorageController::class,'deleteStorage']);

    }
);


/**
 *  Doctor shedules Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'doctorshedules'
],
    function ()
    {
        Route::get('/get/doctors/shedule/from/filters',[DoctorShedulesController::class,'getDoctorsSheduleFromFilters']);
        Route::get('/get/doctors/shedule/from/date',[DoctorShedulesController::class,'getDoctorsSheduleFromDate']);
        Route::get('/get/branches',[DoctorShedulesController::class,'getBranchesWithCabinets']);
        Route::post('/create/record',[DoctorShedulesController::class,'createRecord']);
        Route::post('/update/record',[DoctorShedulesController::class,'updateRecord']);
        Route::post('/delete/record',[DoctorShedulesController::class,'deleteRecord']);

    }
);


/**
 * HISTORY Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'history'
    ],
    function ()
    {
        Route::get('/get/all',[HistoryController::class,'getAllHistories']);
        Route::get('/get/user/{user_id}',[HistoryController::class,'getHistoryFromUserId']);
    }
);

/**
 * SETTINGS Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'settings'
],
    function ()
    {
        Route::get('/get/branches',[SettingsController::class,'getBranchesWithCabinetsSmenas']);
        Route::post('/branch/create',[SettingsController::class,'createBranch']);
        Route::get('/branch/delete/{id}',[SettingsController::class,'deleteBranch']);
        Route::post('/smena/create',[SettingsController::class,'createSmenas']);
        Route::post('/cabinet/create',[SettingsController::class,'createCabinet']);
        Route::get('/cabinet/delete/{id}',[SettingsController::class,'deleteCabinet']);
    }
);

/**
 *  SHEDULE Routes
 */

Route::group([
    'middleware' => [
        //'auth:api',
        'lastActivity'],
    'prefix' => 'shedule'
    ],
    function (){
        Route::get('/get/filters',[SheduleController::class,'getFiltersData']);
        Route::post('/get/doctors/from/filters',[SheduleController::class,'getDoctorsFromFilters']);
        Route::get('/get/doctors/shedule/from/date',[SheduleController::class,'getDoctorsSheduleFromDate']);
        Route::get('/get/directions',[SheduleController::class,'getSheduleDirectionsAndLoading']);
        Route::get('/get/livefeed',[SheduleController::class,'getLiveFeed']);
        Route::post('/get/doctors/to/filters',[SheduleController::class,'getDoctorsToFilters']);
        Route::get('/get/records',[SheduleController::class,'getRecords']);
        Route::post('/addrecord ',[SheduleController::class,'addRecord']);
        Route::post('/updaterecord',[SheduleController::class,'updateRecord']);
        Route::post('/cancelrecord',[SheduleController::class,'cancelRecord']);
        Route::post('/add/record',[SheduleController::class,'addPatientToShedule']);
        Route::post('/change/status',[SheduleController::class,'statusChange']);
    }
);

/**
 * EMPLOYEE Routes
 */

Route::group(['prefix' => 'employee'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/all',[EmployerController::class,'getAllEmployers']);
            Route::get('/get/user/{user_id}',[EmployerController::class,'getEmployerFromId']);
            Route::post('/create',[EmployerController::class,'createEmployee']);
            Route::post('/update',[EmployerController::class,'updateEmployee']);
            Route::get('/get/cats',[EmployerController::class,'getCats']);

        });
    }
);


/**
 * CRM Routes
 */

Route::group(['prefix' => 'crm'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/records',[CrmController::class,'getRecords']);
            Route::get('/get/data/to/filters',[CrmController::class,'getDataToFilters']);
            Route::post('/get/data/from/filters',[CrmController::class,'getDataFromFilters']);

        });
    }
);

Route::group(['prefix' => 'phones'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            //Route::get('/test',[CrmController::class,'searchLocalPatient']);
            Route::get('/outgoing_call',[CrmController::class,'outGoingCall']);
            Route::get('/dropped_call',[CrmController::class,'droppedCall']);
            Route::get('/end_incoming_call',[CrmController::class,'endIncomingCall']);
            Route::get('/incoming_call',[CrmController::class,'getIncomingCall']);

        });
    }
);


/**
 * KASSA Routes
 */

Route::group(['prefix' => 'kassa'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/test',[KassaController::class,'testPrint']);
            Route::get('/get/devices',[KassaController::class,'getDevices']);
        });
    }
);

/**
 * Material Categories Routes
 */

Route::group(['prefix' => 'materialcats'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/all',[MaterialCategoriesController::class,'getAll']);
            Route::post('/category/create',[MaterialCategoriesController::class, 'createNewCategory']);
            Route::post('/category/update',[MaterialCategoriesController::class, 'updateNewCategory']);
            Route::get('/category/delete/{id}',[MaterialCategoriesController::class,'deleteCategory']);

        });
    }
);

/**
 * Material  Routes
 */

Route::group(['prefix' => 'material'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/all',[MaterialController::class,'getAll']);
            Route::post('/create',[MaterialController::class, 'createNewMaterial']);
            Route::post('/update',[MaterialController::class, 'updateMaterial']);
            Route::get('/delete/{id}',[MaterialController::class,'deleteMaterial']);

        });
    }
);

/**
 * TasksForCalling  Routes
 */

Route::group(['prefix' => 'tasksforcalling'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/all',[TasksForCallingController::class,'getAll']);
            Route::get('/get/patients',[TasksForCallingController::class, 'getPatients']);
            Route::post('/create',[TasksForCallingController::class, 'createTaskForCalling']);
            //Route::get('/delete/{id}',[MaterialController::class,'deleteMaterial']);

        });
    }
);

/**
 * Waiting LIST  Routes
 */

Route::group(['prefix' => 'waitinglists'],
    function ()
    {
        Route::group([
            'middleware' => [
                //'auth:api',
                'lastActivity'
            ],
        ], function()
        {
            Route::get('/get/all',[WaitingListsController::class,'getAll']);
            Route::post('/create',[WaitingListsController::class, 'createWaitingList']);
            Route::get('/get/cats',[WaitingListsController::class,'getCategories']);
            Route::post('/search/patients',[WaitingListsController::class,'searchPatients']);

        });
    }
);



/**
 *  AUTH Routes
 */

Route::group(['prefix' => 'auth'],
    function ()
    {
        Route::post('/login', [AuthController::class, 'login'])->middleware('lastActivity')->name('login');
        Route::post('/register', [AuthController::class, 'register']);
        Route::get('/users/all',[AuthController::class,'getAllUsers']);

        Route::group([
            'middleware' => [
                'auth:api',
                'lastActivity'
            ],
        ], function() {
            Route::get('/logout', [AuthController::class, 'logout']);
            Route::any('/user', [AuthController::class, 'user']);

        });
    }
);
