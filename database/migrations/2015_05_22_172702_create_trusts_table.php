<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrustsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('trusts', function(Blueprint $table)
		{
			$table->increments('id');

			$table->integer('year');
			$table->text('branch');
			$table->integer('branch_id');
			$table->text('type');
			$table->integer('type_id');

			$table->text('scope');
			$table->integer('scope_id');
			$table->text('unit');
			$table->text('settlor');
			$table->text('registry');

			$table->text('designation');
			$table->text('objective');
			$table->text('fiduciary');
			$table->text('theme');
			$table->text('income');

			$table->double('income_num');
			$table->text('yield');
			$table->double('yield_num');
			$table->text('expenses');
			$table->double('expenses_num');

			$table->text('report');
			$table->text('availability');
			$table->double('availability_num');
			$table->text('availability_type');
			
			$table->text('initial_amount');
			$table->double('initial_amount_num');
			$table->text('initial_date');
			$table->text('comments');
			$table->text('initial_amount_comments');

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
		Schema::dropIfExists('trusts');
	}

}
