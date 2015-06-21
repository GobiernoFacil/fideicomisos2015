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
  public function index($registry, $id = false)
  {
    //
    $trusts = Trusts::where('registry', $registry)
              ->orderBy('year', 'asc')->get()->toArray();

    if($id){
      $key   = array_search($id, array_column($trusts, 'id'));
      $trust = $key ? $trusts[$key] : $trusts[0];
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
