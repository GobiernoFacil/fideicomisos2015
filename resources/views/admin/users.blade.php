@extends('layouts.adminmaster')
@section('body_class', 'admin users edit')

@section('title', 'Usuarios')
@section('description', "Lista de Usuarios")

@section('content')
<section>
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="{{url('home')}}">Regresar al Dashboard</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
 <div class="container">
  <h1>Usuarios</h1>
    <div class="row">
	  <div class="col-sm-10">
		  <div class="box_info">
@if(session("delete") !== NULL)
<p>{{session("delete") ? "El usuario se ha eliminado" : "no se logró eliminar al usuario :/"}}</p>
@endif
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
    <a href="/users/delete/{{$user->id}}" onclick="return confirm('¿Estás seguro que quieres eliminarlo?')" class="btn_link alert">eliminar</a>
		</div>
  </li>
  @endforeach
</ul>
		  </div>
	  </div>
	  <div class="col-sm-2">
		  <p><a href="/users/add" class="btn_link"> + Agregar usuario</a></p>
	  </div>
    </div>
 </div>
</section>
@endsection