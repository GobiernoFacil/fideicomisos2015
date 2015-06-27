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
  public function index()
  {
    //
    $categories = ['branch', 'type', 'scope', 'theme', 
                   'unit', 'settlor', 'fiduciary'];

    $definitions = Definitions::all();
    $trusts = Trusts::select('year','registry', 'branch', 'branch_id', 'type', 'scope', 'theme', 
                   'unit', 'settlor', 'fiduciary', 'designation', 'initial_amount')
            ->groupBy('registry')
            ->orderBy('year', 'ASC')
            ->orderBy('designation', 'ASC')
            ->get()->toArray();
    return view('Lestrade', [
      'trusts'      => $trusts,
      'categories'  => $categories,
      'definitions' => $definitions
    ]);
  }
}
