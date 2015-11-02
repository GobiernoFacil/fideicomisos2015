<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;
use App\Models\Definitions;

class SingleGraph extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    public function treemap($cat = "branch"){
      $year_max = max(Trusts::select("year")->groupBy("year")->get()->toArray());
      $year = $year_max["year"];
      $definitions = Definitions::all();

      $category = $definitions->where("name", $cat)->first();
      $category = $category ? $category : $definitions->where("name", "branch")->first();

      $trusts = Trusts::groupBy("registry")
        ->select("id","branch", "type", "scope", "theme", "unit", "settlor", 
          "fiduciary", 'income', 'yield', 'expenses', 'availability',
          'initial_amount', 'year')
        ->where("year", $year)->get();


      return view("single-graph")->with([
        "year"        => $year,
        "trusts"      => $trusts,
        "category"    => $category    
      ]);
    }

    public function linemap(){
      $categories = ['branch', 'type', 'scope', 'theme', 
                   'unit', 'settlor', 'fiduciary'];

      $definitions = Definitions::all();
      $trusts = Trusts::select('id','registry', 'income', 'yield', 'expenses', 'availability', 
                                 'year', 'initial_date')->get();
      $registries = Trusts::select("id", "registry", "designation")->groupBy("registry")->get();
      return view('single-graph-b', [
        'trusts'      => $trusts,
        'categories'  => $categories,
        'definitions' => $definitions,
        'registries'  => $registries
      ]);
    }

    public function barchart(){
      echo "n______n";
    }
}
