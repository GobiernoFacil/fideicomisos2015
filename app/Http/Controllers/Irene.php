<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticlesContent;

class Irene extends Controller{

  public function index(Request $request, $id){
    $article = Article::find($id);
    $article->update($request->all());

    return response()->json($request->all());
  }

  public function addContent(Request $request, $id){
    $article = Article::find($id);
    $content = new ArticlesContent;
    $content->content    = $request->input('content');
    $content->type       = $request->input('type');
    $content->article_id = $article->id;
    $content->save();

    return response()->json($content);
  }
  public function updateContent(Request $request, $id, $aid){
    $article = Article::find($id);
    $content = ArticlesContent::find($aid);
    $content->content    = $request->input('content');
    $content->save();

    return response()->json($content);
  }
  public function deleteContent(Request $request, $id,  $aid){
    $article = Article::find($id);
    $content = ArticlesContent::destroy($aid);

    return response()->json($content);
  }
}
