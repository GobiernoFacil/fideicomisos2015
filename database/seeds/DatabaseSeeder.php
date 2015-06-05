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
      DB::table($table)->insert($row);
    }
  }
}

class DefinitionsTableSeeder extends Seeder{
  use LoadCSV;

  static $table = "definitions";
  static $file  = "definitions.csv";
  static $path;

  public function __construct(){
    parent::__construct();
    $this->path = base_path() . "/csv/{$this->file}";
  }

  public function run(){
    $this->save_csv($this->path, $this->table);
	}
}
