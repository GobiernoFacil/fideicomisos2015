<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use League\Csv\Reader;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('DefinitionsTableSeeder');
		$this->command->info('Definitions table seeded!');

    $this->call('ScopesTableSeeder');
    $this->command->info('Scopes table seeded!');

    $this->call('TypesTableSeeder');
    $this->command->info('Types table seeded!');

    $this->call('TrustsTableSeeder');
    $this->command->info('Trusts table seeded!');

    $this->call('UserTableSeeder');
    $this->command->info('Arturo is Ready! (pass: MiroslavaSternova)');
	}

}

/**
* Define the method to load the CSV for each table
* 
*/
trait LoadCSV{
  public function save_csv($file_path, $table){
    // recomendación de la librería de CSV para mac OSX
    if (! ini_get("auto_detect_line_endings")){
      ini_set("auto_detect_line_endings", '1');
    }
    // elimina todo lo que hay en la tabla
    DB::table($table)->delete();

    // genera y configura el lector de CSV
    $reader = Reader::createFromPath($file_path);

    // guarda los datos del CSV en la tabla
    $data = $reader->fetchAssoc();
    foreach($data as $row){
      /* small fix for the trusts table */
      if(isset($row['initial_date_date']) && $row['initial_date_date'] =="NULL"){
        $row['initial_date_date'] = "0000-00-00";
      }
      /***/
      DB::table($table)->insert($row);
    }
  }
}

/**
* The definitions table
*
*/
class DefinitionsTableSeeder extends Seeder{
  use LoadCSV;
  public function run(){
    $this->save_csv(base_path() . "/csv/definitions.csv", "definitions");
	}
}

/**
* The scopes table
*
*/
class ScopesTableSeeder extends Seeder{
  use LoadCSV;
  public function run(){
    $this->save_csv(base_path() . "/csv/scopes.csv", "scopes");
  }
}

/**
* The types table
*
*/
class TypesTableSeeder extends Seeder{
  use LoadCSV;
  public function run(){
    $this->save_csv(base_path() . "/csv/types.csv", "types");
  }
}

/**
* The trusts table
*
*/
class TrustsTableSeeder extends Seeder{
  use LoadCSV;
  public function run(){
    $this->save_csv(base_path() . "/csv/trusts.csv", "trusts");
  }
}

/**
* The users table
*
*/
class UserTableSeeder extends Seeder{
  public function run(){
    DB::table('users')->delete();
    $row = [
      'name'       => 'Arturo Córdoba',
      'email'      => 'howdy@gobiernofacil.com',
      'password'   => Hash::make("MiroslavaSternova"),
    ];
    DB::table('users')->insert($row);
  }
}
