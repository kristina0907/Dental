<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKassasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kassas', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->integer('branch_id');
            $table->integer('user_id');
            $table->text('branch_ip');
            $table->text('branch_port');
            $table->boolean('status')->default(true);
            $table->text('text_status')->nullable();
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
        Schema::dropIfExists('kassas');
    }
}
