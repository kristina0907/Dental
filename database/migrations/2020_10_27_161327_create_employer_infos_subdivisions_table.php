<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployerInfosSubdivisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employer_infos_subdivisions', function (Blueprint $table) {
            $table->id();
            $table->integer('subdivision_id');
            $table->integer('employer_info_id');
            $table->timestamps();
        });
        Schema::create('employer_infos_professions', function (Blueprint $table) {
            $table->id();
            $table->integer('profession_id');
            $table->integer('employer_info_id');
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
        Schema::dropIfExists('employer_infos_subdivisions');
        Schema::dropIfExists('employer_infos_professions');
    }
}
