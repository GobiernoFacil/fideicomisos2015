<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App|Models\Article;

class Irene extends Controller{

  public function index(Request $request, $id){
    $article = Article::find($id);

    //$article
  }
}
