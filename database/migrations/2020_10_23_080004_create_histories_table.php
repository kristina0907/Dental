<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('description');
            $table->integer('user_id');
            $table->integer('public')->default(1);
            $table->timestamps();
        });
        Schema::create('histories_review_orders', function (Blueprint $table) {
            $table->id();
            $table->integer('history_id');
            $table->integer('review_order_id');
            $table->timestamps();
        });
        Schema::create('histories_treatment_orders', function (Blueprint $table) {
            $table->id();
            $table->integer('history_id');
            $table->integer('treatment_order_id');
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
        Schema::dropIfExists('histories');
    }
}
