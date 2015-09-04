<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Trusts;


class Datafarmer extends Controller{

  // los campos que regresan en registro
  private $registry_fields = ['id', 'registry', 'year', 'income', 'yield', 'expenses', 'designation',
                             'availability','initial_amount'];
  public function index(){

  }

  /*
  * R E G I S T R Y
  * --------------------------------------------------------------------------------
  * Regresa los datos numéricos, el título y id de todos 
  * los registros seleccionados
  *
  */
  public function registry(Request $request, $registry = null){
    // [ NO SE SELECCIONA NINGÚN REGISTRO ]
    if(empty($registry)){
      // obtiene un registro al azar 
      $registry = Trusts::all()->lists('registry')->random();
      // obtiene todos los fideicomisos con el mismo registro
      $response = Trusts::where('registry', $registry)
                    ->select($this->registry_fields)->get();
      // los regresa en JSONxCORS
      return response()
               ->json($response)
               ->header('Access-Control-Allow-Origin', '*');
    }
    // [ LLEGA UNA LISTA DE REGISTROS SEPARADOS POR "|" ]
    else{
      // separa los registros
      $list     = explode('|', $registry);
      // obtiene todos los fideicomisos con el mismo registro
      $response = Trusts::whereIn('registry', $list)
                    ->select($this->registry_fields)->get();

      // los regresa en JSONxCORS
      return response()
               ->json($response)
               ->header('Access-Control-Allow-Origin', '*');
    }
  }
}
