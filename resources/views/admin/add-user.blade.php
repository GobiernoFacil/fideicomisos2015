@extends('layouts.adminmaster')
@section('body_class', 'admin user add')

@section('title', 'Crear Usuario')
@section('description', "Crear Usuario")

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
  <h1>Crear Usuario </h1>
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

  <form method="POST" action="/users/add"  class="form-edit">
    <!-- STATUS MESSAGE -->

    {!! csrf_field() !!}
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Nombre</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="text" name="name" id="name" value="{{old('name')}}">
	    </div>
    </div>
	<div class="row">
	    <div class="col-sm-3">
			<p class="label">Correo</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="email" name="email" id="email" value="{{old('email')}}">
	    </div>
    </div>
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Contraseña:*</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="password" name="password" id="password">
	    </div>
    </div>
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Confirmar Contraseña:*</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="password" name="confirm" id="confirm">
			<p>* ocho caracteres como mínimo para la contraseña</p>
	    </div>
    </div>
    <div class="row">
	 	<div class="col-sm-9 col-sm-offset-3">
	 	<p><input type="submit" value="Crear usuario"></p>
	 	</div>
     </div>

  </form>
		  </div>
	  </div>
    </div>
 </div>
</section>
@endsection