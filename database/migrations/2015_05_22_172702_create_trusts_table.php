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

			$table->integer('year')->nullable();
			$table->string('branch')->nullable();
			$table->integer('branch_id')->nullable();
			$table->string('type')->nullable();
			$table->integer('type_id')->nullable();

			$table->string('scope')->nullable();
			$table->integer('scope_id')->nullable();
			$table->string('unit')->nullable();
			$table->string('settlor')->nullable();
			$table->string('registry')->nullable();

			$table->text('designation')->nullable();
			$table->text('objective')->nullable();
			$table->string('fiduciary')->nullable();
			$table->string('theme')->nullable();
			$table->string('balance')->nullable();
			$table->double('balance_num')->nullable();
			$table->string('income')->nullable();

			$table->double('income_num')->nullable();
			$table->string('yield')->nullable();
			$table->double('yield_num')->nullable();
			$table->string('expenses')->nullable();
			$table->double('expenses_num')->nullable();

			$table->text('report')->nullable();
			$table->string('availability')->nullable();
			$table->double('availability_num')->nullable();
			$table->string('availability_type')->nullable();
			
			$table->string('initial_amount')->nullable();
			$table->double('initial_amount_num')->nullable();
			$table->string('initial_date')->nullable();
			$table->date('initial_date_date')->nullable();
			$table->text('comments')->nullable();
			$table->text('initial_amount_comments')->nullable();

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
