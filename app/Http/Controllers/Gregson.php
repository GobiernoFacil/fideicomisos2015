<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;
use App\Models\Definitions;

use Illuminate\Http\Request;

class Gregson extends Controller {

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index($registry){
    //
    $trusts = Trusts::where('registry', $registry)
              ->orderBy('year', 'asc')->get()->toArray();

    if(empty($trusts)){
      $trust = Trusts::find($registry)->toArray();
      $trusts = [$trust];
    }
    else{
      $trust = $trusts[0];
    }


    $definitions = Definitions::all();

    return view('Gregson', [
      'trusts'      => $trusts,
      'selected'    => $trust,
      'definitions' => $definitions
    ]);
  }
}
