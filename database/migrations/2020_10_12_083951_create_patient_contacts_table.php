<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_contacts', function (Blueprint $table) {
            $table->id();
            $table->text('phone');
            $table->integer('sms_inform')->default('1');
            $table->timestamps();
        });

        Schema::create('patient_contacts_patient', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_contacts_id');
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
        Schema::dropIfExists('patient_contacts');
        Schema::dropIfExists('patient_contacts_patient');
    }
}
