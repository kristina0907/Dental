<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBranchIdToDoctorShedules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('doctor_shedules', function (Blueprint $table) {
            $table->integer('branch_id')->after('cabinet_id')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('doctor_shedules', function (Blueprint $table) {
            $table->integer('branch_id')->after('cabinet_id')->default(1);
        });
    }
}
