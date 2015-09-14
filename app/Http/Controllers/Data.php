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
    $trusts = Trusts::select('id', 'year','registry', 'branch', 'branch_id', 
                'type', 'scope', 'theme', 'unit', 'settlor', 
                'fiduciary', 'designation', 'initial_amount', 'initial_date')
                ->groupBy('registry')->orderBy('year', 'ASC')
                ->orderBy('designation', 'ASC')->get();
    return view('data', [
      'trusts'      => $trusts,
      'categories'  => $categories,
      'definitions' => $definitions
    ]);
  }
}
