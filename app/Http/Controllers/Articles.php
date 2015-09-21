<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticlesContent;

class Articles extends Controller
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

    public function index($id){
      $article = Article::find($id);
      $content = ArticlesContent::where('article_id', $article->id)->get();
      return view('report')->with([
        'article'   => $article, 
        'contents'   => $content,
        'file_url'  => '/images/articles/',
        'months'    => $this->months
      ]);
    }
}
