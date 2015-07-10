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

// [ EL NAVEGADOR DE FIDEICOMISOS ]
Route::get('navegador-de-fideicomisos', 'Watson@index');

// [ EXPLORA UN FIDEICOMISO ]
Route::get('fideicomiso/{registry}', 'Gregson@index');

// [ EXPLORA UNA CATEGORÍA ]
Route::get('categorias', 'Lestrade@index');

// [ EL API DE BÚSQUEDA ]
Route::post('sherlock/search', 'Sherlock@index');

// [ EL HOME ]
Route::get('/', 'WelcomeController@index');

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
  Route::get('trusts/update/{id}', 'Admin@updateTrustForm')->where('id', '[0-9]+');;
  Route::post('trusts/update/{id}', 'Admin@updateTrust')->where('id', '[0-9]+');;
  Route::get('trusts/delete/{id}', 'Admin@deleteTrust')->where('id', '[0-9]+');;
  // [ ARTICLES ]
});