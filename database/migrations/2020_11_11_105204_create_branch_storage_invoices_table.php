<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchStorageInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_storage_invoices', function (Blueprint $table) {
            $table->id();
            $table->integer('branch_storage_id');
            $table->integer('provider_id');
            $table->text('invoice_number');
            $table->date('invoice_date');
            $table->date('date_of_receiving');
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('branch_storage_invoices');
    }
}
