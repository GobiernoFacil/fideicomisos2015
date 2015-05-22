<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('list_items', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('list_id');
			$table->string('name');
			$table->string('extra_1');
			$table->string('extra_2');
			$table->string('extra_3');
			$table->timestamps();
			
			$table->index('list_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('list_items');
	}

}
