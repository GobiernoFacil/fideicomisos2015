<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;
use App\Models\Definitions;

use Illuminate\Http\Request;

class Lestrade extends Controller {

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index($category)
  {
    //
    $categories = ['branch', 'type', 'scope', 'theme'];
    if(!in_array($category, $categories)) die(":D");
    
    return view('Gregson', [
      'trusts'      => $trusts,
      'selected'    => $trust,
      'definitions' => $definitions
    ]);
  }
}
