<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_cards', function (Blueprint $table) {
            $table->id();
            $table->text('card_number');
            $table->text('status')->default('Первичный');
            $table->text('surname');
            $table->text('name');
            $table->text('patronymic');
            $table->date('born_date');
            $table->text('gender');
            $table->text('marketing')->nullable();
            $table->text('archive_info')->nullable();
            $table->timestamps();
        });

        Schema::create('patient_cards_users', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_card_id');
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
        Schema::dropIfExists('patient_cards');
        Schema::dropIfExists('patient_cards_users');
    }
}
