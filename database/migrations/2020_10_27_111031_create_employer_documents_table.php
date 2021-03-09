<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployerDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employer_documents', function (Blueprint $table) {
            $table->id();
            $table->text('inn')->nullable();
            $table->text('type');
            $table->text('series_and_number')->nullable();
            $table->text('issued')->nullable();
            $table->date('date_issue')->nullable();
            $table->text('born_place')->nullable();
            $table->text('registration_adress')->nullable();
            $table->date('registration_date')->nullable();
            $table->text('other')->nullable();
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
        Schema::dropIfExists('employer_documents');
    }
}
