@extends('layouts.adminmaster')
@section('body_class', 'admin user edit')

@section('title', 'Editar Usuario')
@section('description', "Editar Usuario")

@section('content')
<section>
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="{{url('users')}}">Regresar a usuarios</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
 <div class="container">
  <h1>Editar Usuario: <strong>{{$user->name}}</strong> </h1>
    <div class="row">
	  <div class="col-sm-8 col-sm-offset-2">
		  <div class="box_info">
  
  <!-- VALIDATION -->
  @if(count($errors) > 0)
  <ul>
    @foreach($errors->all() as $error)
    <li>{{$error}}</li>
    @endforeach
  </ul>
  @endif

  <form method="POST" action="/users/update/{{$user->id}}" class="form-edit">
    <!-- STATUS MESSAGE -->

    {!! csrf_field() !!}
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Nombre</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="text" name="name" id="name" value="{{$user->name}}">
	    </div>
    </div>
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Correo </p>
	    </div>
    	<div class="col-sm-9">
			<input type="email" name="email" id="email" value="{{$user->email}}">
	    </div>
    </div>
     <div class="row">
	    <div class="col-sm-3">
			<p class="label">Cambiar contraseña:</p>
	    </div>
    	<div class="col-sm-9">
	    	<p>
			<input type="checkbox" value="1" name="change_pass" id="change_pass" {{old('change_pass')? 'checked' : ''}}></p>
	    </div>
    </div>
     <div class="row">
	    <div class="col-sm-3">
			<p class="label">Contraseña* </p>
	    </div>
    	<div class="col-sm-9">
			<input type="password" name="password" id="password" disabled>
	    </div>
    </div>
     <div class="row">
	    <div class="col-sm-3">
			<p class="label">Confirmar Contraseña* </p>
	    </div>
    	<div class="col-sm-9">
			<input type="password" name="confirm" id="confirm" disabled>
			<p>* ocho caracteres como mínimo para la contraseña</p>
	    </div>
    </div>
     <div class="row">
	 	<div class="col-sm-9 col-sm-offset-3">
	 	<p><input type="submit" value="Editar usuario"></p>
	 	</div>
     </div>
  </form>
		  </div>
	  </div>
    </div>
 </div>
</section>
<script>
  var change_pass = document.querySelector('#change_pass'),
      password    = document.querySelector('#password'),
      confirm     = document.querySelector('#confirm');

  if(change_pass.checked){
    password.disabled = false;
    confirm.disabled = false;
  }

  change_pass.onchange = function(e){
    if(this.checked){
      password.disabled = false;
      confirm.disabled = false;
    }
    else{
      password.disabled = true;
      confirm.disabled = true;
    }
  }
</script>

@endsection