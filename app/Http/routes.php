<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
// [ THE MORLAN TEAM ]
Route::get('morlan1', 'SingleGraph@morlan1');
Route::get('asi-se-reparten-los-recursos', 'SingleGraph@morlan1');
Route::get('a-donde-va-el-dinero', 'SingleGraph@morlan2');
Route::get('morlan2', 'SingleGraph@morlan2');

// [ EL API DE TODAS LAS APIIIIIIS!!!!!!!!!!!]
Route::get('api/fideicomisos/{orderBy?}/{year?}/{order?}/{textfields?}', 'PublicApi@Trusts');
Route::get('api/fideicomiso/{key}', 'PublicApi@Trust');
Route::get('api/registros/{keys}', 'PublicApi@Registry');
Route::get('api/busqueda/{query}/{page?}/{total?}', 'PublicApi@Search');
Route::get('api/categoria/{name}/{category?}/{page?}/{year?}/{textfields?}/{agregated?}', 'PublicApi@Categories');

// [ RECUPERAR PASSWORD ]
Route::get('password/email', 'Auth\PasswordController@getEmail');
Route::post('password/email', 'Auth\PasswordController@postEmail');
// Password reset routes...
Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
Route::post('password/reset', 'Auth\PasswordController@postReset');

// [ EL NAVEGADOR DE FIDEICOMISOS ]
Route::get('buscador-de-fideicomisos', 'Watson@index');

// [ EXPLORA UN FIDEICOMISO ]
Route::get('fideicomiso/{registry}', 'Gregson@index');

// [ EXPLORA UNA CATEGORÍA ]
Route::get('explorador-de-fideicomisos', 'Lestrade@index');
Route::get('fideicomisos-por-categoria', 'Lestrade@index');

// [ EL API DE BÚSQUEDA ]
Route::get('sherlock/search/{query}/{page?}/{total?}', 'Sherlock@index');
Route::post('sherlock/search/advanced', 'Sherlock@advanced');

// [ EL API DE CONSUMO DE DATOS ]
Route::get('data/registry/{collection?}', 'Datafarmer@registry');

// [ EL HOME ]
Route::get('/', 'Home@index');


// [ REPORTAJE ]
Route::get('reportaje/{id}', 'Articles@index')->where('id', '[0-9]+');

// [ LOS REPORTAJES ]
Route::get('reportajes', 'Articles@all');

// [ El POST --- TEST ]
Route::get('reportajes/post', function(){
  return view('post');
});

// [ FIDEICOMISO ES ]
Route::get('que-es-un-fideicomiso', function(){
  return view('fideicomisos_es');
});

// [ DATAVIZ ]
/* OLD STUFF 
Route::get('vizdata', function(){
  return view('vizdata');
});
*/

// [ DATAVIZ BIIIIIIIG ]
// Route::get('el-grafico', 'Data@index');
Route::get('el-grafico/treemap/{category?}', 'SingleGraph@treemap');
Route::get('el-grafico/linemap', 'SingleGraph@linemap');
Route::get('el-grafico/barchart', 'SingleGraph@barchart');

// [ LOS WHO ]
Route::get('quienes-somos', function(){
  return view('who');
});

// [ DATOS ABIERTOS ]
Route::get('datos-abiertos', function(){
  return view('opendata');
});



// [ EL LOGIN ]
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// [ EL ADMIN ] 
Route::group(['middleware' => 'auth'], function(){
    // [ DASHBOARD ]
    Route::get('home', 'Admin@index');
    // [ TRUSTS ]
    Route::get('trusts/add', 'Admin@saveTrustForm');
    Route::post('trusts/add', 'Admin@saveTrust');
    Route::get('trusts/update/{id}', 'Admin@updateTrustForm')->where('id', '[0-9]+');
    Route::post('trusts/update/{id}', 'Admin@updateTrust')->where('id', '[0-9]+');
    Route::get('trusts/delete/{id}', 'Admin@deleteTrust')->where('id', '[0-9]+');
    // [ ARTICLES ]
    Route::get('articles', 'AdminArticles@index');
    Route::get('articles/add', 'AdminArticles@create');
    Route::post('articles/add', 'AdminArticles@store');
    Route::get('articles/secretupdate/{id}', 'AdminArticles@secretUpdateView');
    Route::post('articles/secretupdate', 'AdminArticles@secretUpdate');
    Route::get('articles/update/{id}', 'AdminArticles@edit')->where('id', '[0-9]+');
    Route::post('articles/update/{id}', 'Irene@index');
    // [ USERS ]
    Route::get('users', 'Admin@users');
    Route::get('users/add', 'Admin@createUser');
    Route::post('users/add', 'Admin@storeUser');
    Route::get('users/update/{id}', 'Admin@editUser')->where('id', '[0-9]+');
    Route::post('users/update/{id}', 'Admin@updateUser')->where('id', '[0-9]+');
    Route::get('users/delete/{id}', 'Admin@deleteUser')->where('id', '[0-9]+');
    // [ ARTICLES CONTENT ]
    Route::post('articles/image/{id}/{cid}', 'Irene@saveImage');
    Route::post('articles/content/{id}', 'Irene@addContent');
    Route::put('articles/content/{id}/{el_id?}', 'Irene@updateContent');
    Route::delete('articles/content/{id}/{el_id?}', 'Irene@deleteContent');
});