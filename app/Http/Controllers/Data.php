<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Trusts;
use App\Models\Definitions;

class Data extends Controller{
  public function index(){
    $categories = ['branch', 'type', 'scope', 'theme', 
                   'unit', 'settlor', 'fiduciary'];

    $definitions = Definitions::all();
    $trusts = Trusts::select('id','registry', 'income', 'yield', 'expenses', 'availability', 
                                 'year', 'initial_date')->get();
    $registries = Trusts::select("id", "registry", "designation")->groupBy("registry")->get();
    return view('data', [
      'trusts'      => $trusts,
      'categories'  => $categories,
      'definitions' => $definitions,
      'registries'  => $registries
    ]);
  }
}
