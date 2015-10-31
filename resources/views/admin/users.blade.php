@extends('layouts.adminmaster')
@section('body_class', 'admin user edit')

@section('title', 'Editar Usuario')
@section('description', "Editar Usuario")

@section('content')
<section>
 <div class="container">
  <h1>Usuarios</h1>
    <div class="row">
	  <div class="col-sm-8 col-sm-offset-2">
		  <div class="box_info">
@if(session("delete") !== NULL)
<p>{{session("delete") ? "El usuario se ha eliminado" : "no se logró eliminar al usuario :/"}}</p>
@endif
<p><a href="/users/add" class="btn_link"> + Agregar usuario</a></p>
<ul class="users_list">
	@if($users)
	<li class="row titles">
		<div class="col-sm-3">
			<strong>Nombre</strong>
		</div>
		<div class="col-sm-4">
			<strong>Email</strong>
		</div>
		<div class="col-sm-2">
			<strong>Creación</strong>
		</div>
	</li>
	
	@endif	
	
  @foreach($users as $user)
	<li class="row">
		<div class="col-sm-3">
    {{$user->name}} 
		</div>
		<div class="col-sm-4">
    {{$user->email}} 
		</div>
		<div class="col-sm-2">
    {{$user->created_at}} 
		</div>
		<div class="col-sm-3">
    <a href="/users/update/{{$user->id}}" class="btn_link edit">editar</a>
    <a href="/users/delete/{{$user->id}}" class="btn_link alert">eliminar</a>
		</div>
  </li>
  @endforeach
</ul>
		  </div>
	  </div>
    </div>
 </div>
</section>
@endsection