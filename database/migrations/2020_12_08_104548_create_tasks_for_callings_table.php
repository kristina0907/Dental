<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksForCallingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks_for_callings', function (Blueprint $table) {
            $table->id();
            $table->integer('branch_id');
            $table->integer('patient_id');
            $table->dateTime('date');
            $table->integer('administrator_id');
            $table->integer('status_id');
            $table->text('reason_for_transfer')->nullable();
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
        Schema::dropIfExists('tasks_for_callings');
    }
}
