@extends('layouts.adminmaster')
@section('body_class', 'admin')

@section('title', 'Dashboard')
@section('description', "Dashboard")

@section('content')
<section>
 <div class="container">
  <h1>Dashboard</h1>
    <div class="row">
	  <div class="col-sm-4">
		  <div class="box_info panel">
			 <h3> <a href="{{url('articles')}}">Artículos</a></h3>
			 <p><span>{{$articles}}</span>Artículos</p>
			 <a href="{{url('articles/add')}}" class="btn_link">Crear nuevo artículo</a>
		  </div>
	  </div>
	  <div class="col-sm-4">
		  <div class="box_info panel">
			 <h3> <a href="{{url('buscador-de-fideicomisos')}}">Fideicomisos</a></h3>
			  <p><span>{{$trusts}}</span>Fideicomisos</p>
			 <a href="{{url('explorador-de-fideicomisos')}}" class="btn_link">Explorar los fideicomisos</a>
		  </div>
	  </div>
	  <div class="col-sm-4">
		  <div class="box_info panel">
			 <h3> <a href="{{url('users')}}">Usuarios</a></h3>
			 <p><span>{{$users}}</span>Usuarios</p>
		  </div>
	  </div>
  </div>
 </div>
</section>
@endsection