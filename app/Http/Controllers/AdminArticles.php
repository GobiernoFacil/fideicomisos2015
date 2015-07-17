<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Article;

use Storage;
use File;
use Auth;

class AdminArticles extends Controller{
  
  const UPLOADS = 'images/articles';
  
  public function index(){
    $articles = Article::all();
    return view('admin.articles')->with('articles', $articles);
  }

  public function create(){
    return view('admin.add-article');
  }

  public function store(Request $request){
    $user = Auth::user();
    $image = $this->storeFile($request, 'image');
    $data = $request->all();
    $data['image']  = $image ? $image : '';
    $data['author'] = $user->id;

    $article = new Article($data);
    $article->save();

    return redirect('articles');
  }

  public function edit($id){
    $article = Article::find($id);
    return view('admin.update-article')->with('article', $article);
  }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

  /**
  * [ U P L O A D   A   F I L E ]
  *
  */
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
