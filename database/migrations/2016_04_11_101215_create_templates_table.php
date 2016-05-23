<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ezz_templates', function (Blueprint $table) {
            $table->increments('id_template')->primary;
            $table->string('name_template');
            $table->longText('html');
            $table->longText('html_edit')->nullable();
            $table->longText('icon');
            $table->longText('gridster');
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
        Schema::drop('ezz_templates');
    }
}
