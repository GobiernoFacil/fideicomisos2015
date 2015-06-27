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
Route::get('fideicomiso/{registry}/{id?}', 'Gregson@index');

// [ EXPLORA UNA CATEGORÍA ]
Route::get('categorias', 'Lestrade@index');

// [ EL API DE BÚSQUEDA ]
Route::post('sherlock/search', 'Sherlock@index');

Route::get('/', 'WelcomeController@index');
