<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCallHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('call_histories', function (Blueprint $table) {
            $table->id();
            $table->text('call_session_id');
            $table->dateTime('start_time')->nullable();
            $table->text('notification_name');
            $table->text('virtual_phone_number');
            $table->text('contact_phone_number');
            $table->text('contact_full_name')->nullable();
            $table->text('cpn_region_name')->nullable();
            $table->text('call_source')->nullable();
            $table->integer('user_id')->nullable();
            $table->time('wait_time_duration')->nullable();
            $table->time('talk_time_duration')->nullable();
            $table->integer('operator_rating')->nullable();
            $table->text('employee_phone_number')->nullable();
            $table->text('employee_full_name')->nullable();
            $table->text('lost_reason')->nullable();
            $table->text('noanswered_employee_full_names')->nullable();
            $table->timestamps();
        });

        Schema::create('call_histories_users', function (Blueprint $table) {
            $table->id();
            $table->integer('call_history_id');
            $table->integer('user_id');
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
        Schema::dropIfExists('call_histories');
        Schema::dropIfExists('call_histories_users');
    }
}
