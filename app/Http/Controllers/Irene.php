<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Article;

class Irene extends Controller{

  public function index(Request $request, $id){
    $article = Article::find($id);
    $article->update($request->all());

    return response()->json($request->all());
  }

  public function addContent(Request $request, $id){
    $article = Article::find($id);
  }

  public function updateContent(Request $request, $id){
    $article = Article::find($id);
  }
}