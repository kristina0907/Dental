<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployerCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employer_cards', function (Blueprint $table) {
            $table->id();
            $table->text('last_name');
            $table->text('first_name');
            $table->text('surname');
            $table->dateTime('birthday');
            $table->text('gender');
            $table->text('city');
            $table->text('street');
            $table->text('house');
            $table->text('corpus')->nullable();
            $table->text('flat')->nullable();
            $table->text('phone');
            $table->text('email');
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
        Schema::dropIfExists('employer_cards');
    }
}
