<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Trusts;

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

    public function treemap(){
      $year_max = max(Trusts::select("year")->groupBy("year")->get()->toArray());
      $year = $year_max["year"];

      $trusts = Trusts::groupBy("registry")
        ->select("id","branch", "type", "scope", "theme", "unit", "settlor", 
          "fiduciary", 'income', 'yield', 'expenses', 'availability',
          'initial_amount', 'year')
        ->where("year", $year)->get();

      return view("single-graph")->with([
        "year"   => $year,
        "trusts" => $trusts
      ]);
    }

    public function linemap(){
      
    }

    public function barchart(){
      
    }
}
