<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesText extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ezz_languages_text', function (Blueprint $table) {
            $table->increments('id_text')->primary;
            $table->integer('id_language')->unsigned();
            $table->foreign('id_language')->references('id_language')->on('ezz_languages');
            $table->integer('id_key')->unsigned();
            $table->foreign('id_key')->references('id_key')->on('ezz_languages_keys');
            $table->string('text');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('languages_text');
    }
}
