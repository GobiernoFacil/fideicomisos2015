<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesContentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles_content', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('article_id');
            $table->enum('type', ['h2','h3','p','l-quote','r-quote','img','carousell','graph', 'yt'])->default('p');
            $table->text('content')->nullable();
            $table->integer('order')->nullable();
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
        Schema::dropIfExists('articles_content');
    }
}
