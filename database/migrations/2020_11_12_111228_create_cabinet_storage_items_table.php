<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCabinetStorageItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cabinet_storage_items', function (Blueprint $table) {
            $table->id();
            $table->integer('branch_storage_id');
            $table->integer('material_id');
            $table->integer('material_invoice_id');
            $table->integer('quantity')->default(0);
            $table->float('base_price')->default(0.00);
            $table->float('sell_price')->default(0.00);
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
        Schema::dropIfExists('cabinet_storage_items');
    }
}
