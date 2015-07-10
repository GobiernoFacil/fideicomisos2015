@extends('layouts.master')
@section('body_class', 'login')

@section('title', 'Login')
@section('description', "Ingresar al admin")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<h1>Iniciar sesión</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="box_login">
	<div class="container">
		<div class="row">
			<div class="col-sm-6 col-sm-offset-3">
  <form method="POST" action="/auth/login">
    {!! csrf_field() !!}
    <p>Correo <input type="email" name="email" value="{{old('email')}}"></p>
    <p>Contraseña <input type="password" name="password" id="password"></p>
    <p><button type="submit">Iniciar sesión</button></p>
  </form>
			</div>
		</div>
	</div>
</section>
@endsection