<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToothDiagnosReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tooth_diagnos_reviews', function (Blueprint $table) {
            $table->id();
            $table->text('complaints');
            $table->text('diseases_history');
            $table->text('diseases_now');
            $table->text('visual_inspection');
            $table->text('bite');
            $table->text('oral_mucosa');
            $table->text('rengen_data');
            $table->timestamps();
        });

        Schema::create('tooth_diagnos_reviews_tooth_diagnos', function (Blueprint $table) {
            $table->id();
            $table->integer('tooth_diagnos_id');
            $table->integer('tooth_review_id');
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
        Schema::dropIfExists('tooth_diagnos_reviews');
        Schema::dropIfExists('tooth_diagnos_reviews_tooth_diagnos');
    }
}
