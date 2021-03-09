<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCancelToLiveFeeds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('live_feeds', function (Blueprint $table) {
            $table->text('cancel_reason')->nullable();
            $table->text('cancel_reason_detail')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('live_feeds', function (Blueprint $table) {
            $table->text('cancel_reason')->nullable();
            $table->text('cancel_reason_detail')->nullable();
        });
    }
}
