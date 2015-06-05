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
		$this->command->info('User table seeded!');
	}

}

class DefinitionsTableSeeder extends Seeder{
	public function run(){
		// recomendación de la librería de CSV para mac OSX
	  if (! ini_get("auto_detect_line_endings")){
      ini_set("auto_detect_line_endings", '1');
    }
    // elimina todo lo que hay en la tabla
    DB::table('definitions')->delete();

    // define la ruta para cargar el CSV con los datos
    $path = base_path() . "/csv/definitions.csv";

    // genera y configura el lector de CSV
    $reader = Reader::createFromPath($path);
    $reader->setDelimiter(';');

    // guarda los datos del CSV en la tabla
    $data = $reader->fetchAssoc();
    foreach($data as $row){
    	DB::table('definitions')->insert($row);
    }
	}
}
