<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticlesContent;

use App\Models\Trusts;
use App\Models\Definitions;
class Home extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    // ugly hack because bad php implementation
    var $months = ['1' => 'enero','2' => 'febrero','3' => 'marzo','4' => 'abril','5' => 'mayo',
               '6' => 'junio','7' => 'julio', '8' => 'agosto','9' => 'septiembre',
               '10' => 'octubre','11' => 'noviembre','12' => 'diciembre'];

    public function index(){
      $main_article = Article::all()->first();
      $articles 	= Article::all();
      
      $categories = ['branch', 'type', 'scope', 'theme', 
                   'unit', 'settlor', 'fiduciary'];

	  $definitions = Definitions::all();
	  $trusts = Trusts::select('id','registry', 'income', 'yield', 'expenses', 'availability', 
                                 'year', 'initial_date')->get();
      return view('home')->with([
        'main_article'  => $main_article, 
        'articles'		=> $articles,
        'file_url'  	=> '/images/articles/',
        'months'    	=> $this->months,
        'trusts'      	=> $trusts,
		'categories'  	=> $categories,
		'definitions' 	=> $definitions
      ]);
    }
}
