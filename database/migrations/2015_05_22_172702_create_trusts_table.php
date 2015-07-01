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
			$table->string('branch');
			$table->integer('branch_id');
			$table->string('type');
			$table->integer('type_id');

			$table->string('scope');
			$table->integer('scope_id');
			$table->string('unit');
			$table->string('settlor');
			$table->string('registry');

			$table->text('designation');
			$table->text('objective');
			$table->string('fiduciary');
			$table->string('theme');
			$table->string('income');

			$table->double('income_num');
			$table->string('yield');
			$table->double('yield_num');
			$table->string('expenses');
			$table->double('expenses_num');

			$table->text('report');
			$table->string('availability');
			$table->double('availability_num');
			$table->string('availability_type');
			
			$table->string('initial_amount');
			$table->double('initial_amount_num');
			$table->string('initial_date');
			$table->date('initial_date_date');
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
