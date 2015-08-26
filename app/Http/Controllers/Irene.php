<?php

namespace App\Http\Controllers;

// [ LIBRARIES ]
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Storage;
use File;
use Auth;

// [ MODELS ]
use App\Models\Article;
use App\Models\ArticlesContent;

// [ THE BACKBONE CONTENT EDITOR ]
// ----------------------
//
// 
class Irene extends Controller{

  const UPLOADS = 'images/articles';


  // [ THE STORED CONTENT (json) ]
  //
  //
  public function index(Request $request, $id){
    $article = Article::find($id);
    $article->update($request->all());

    return response()->json($request->all());
  }

  // [ ADD CONTENT (json) ]
  //
  //
  public function addContent(Request $request, $id){
    $article = Article::find($id);
    $content = new ArticlesContent;
    $content->content    = $request->input('content');
    $content->type       = $request->input('type');
    $content->article_id = $article->id;
    $content->save();

    return response()->json($content);
  }

  // [ UPDATE CONTENT (json) ]
  //
  //
  public function updateContent(Request $request, $id, $aid){
    $article = Article::find($id);
    $content = ArticlesContent::find($aid);
    $content->content    = $request->input('content');
    $content->save();

    return response()->json($content);
  }

  // [ DELETE CONTENT (json) ]
  //
  //
  public function deleteContent(Request $request, $id,  $aid){
    $article = Article::find($id);
    $content = ArticlesContent::destroy($aid);

    return response()->json($content);
  }

  // [ SAVE FILE (json) ]
  //
  //
  public function saveImage(Request $request, $id, $cid){
    $image = $this->storeFile($request, 'file');
    return response()->json($image);
  }

  /*
  * H E L P E R S 
  * ----------------------------------------------------------------
  */

  // [ UPLOAD A FILE ]
  //
  //
  private function storeFile($request, $file){
    // [1] si el directorio para los archivos no existe, se crea
    $path = public_path(self::UPLOADS);
    if(!File::exists($path)) file::makeDirectory($path);

    // [2] si el archivo es válido, le genera un nombre, lo guarda
    //     en el folder de uploads y regresa el nombre del archivo
    if($request->file($file)->isValid()){
      $name = str_random(40) . '.' 
        . $request->file($file)->getClientOriginalExtension();

      $request->file($file)->move($path, $name);
      return $name;
    }
    // [3] si el archivo no es váldo, regresa false
    else{
      return false;
    }
  }
}
