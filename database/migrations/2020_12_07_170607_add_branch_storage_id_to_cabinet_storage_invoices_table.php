<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBranchStorageIdToCabinetStorageInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cabinet_storage_invoices', function (Blueprint $table) {
            $table->integer('branch_storage_id')->after('cabinet_storage_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cabinet_storage_invoices', function (Blueprint $table) {
            $table->integer('branch_storage_id')->after('cabinet_storage_id')->nullable();
        });
    }
}
