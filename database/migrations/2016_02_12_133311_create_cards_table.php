<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('card_list_id')->unsigned();
            $table->string('name');
            $table->text('description');
            $table->timestamps();
        });

        Schema::table('cards', function (Blueprint $table) {
            $table->foreign('card_list_id')->references('id')->on('card_list');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cards');
    }
}
