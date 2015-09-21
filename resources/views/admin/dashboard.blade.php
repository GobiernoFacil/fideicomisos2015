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
			 <p><span>1</span> artículo</p>
			 <a href="{{url('articles/add')}}" class="btn_link">Crear nuevo artículo</a>
		  </div>
	  </div>
	  <div class="col-sm-4">
		  <div class="box_info panel">
			 <h3> <a href="{{url('categorias')}}">fideicomisos</a></h3>
			  <p><span>614</span> fideicomisos</p>
		  </div>
	  </div>
	  <div class="col-sm-4">
		  <div class="box_info panel">
			 <h3> <a href="{{url('users')}}">Escritores</a></h3>
			 <p><span>1</span> escritor</p>
		  </div>
	  </div>
  </div>
 </div>
</section>
@endsection