<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientAdressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_adresses', function (Blueprint $table) {
            $table->id();
            $table->text('city');
            $table->text('street');
            $table->text('house');
            $table->text('corpus')->nullable();
            $table->text('flat')->nullable();
            $table->timestamps();
        });

        Schema::create('patient_adresses_patient', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_adress_id');
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
        Schema::dropIfExists('patient_adresses');
        Schema::dropIfExists('patient_adress_id');
    }
}
