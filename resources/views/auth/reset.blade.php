@extends('layouts.master')
@section('body_class', 'login pass')

@section('title', 'Cambiar Contraseña')
@section('description', "Cambiar contraseña")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<h1>Cambiar contraseña</h1>
				</div>
			</div>
		</div>
	</nav>
</div>
<section class="box_login">
	<div class="container">
		<div class="row">
			<div class="col-sm-6 col-sm-offset-3">
				<form method="POST" action="/password/reset">
				    {!! csrf_field() !!}
				    <input type="hidden" name="token" value="{{ $token }}">
				
				    <p>
				        Email
				        <input type="email" name="email" value="{{ old('email') }}">
				    </p>
				
				    <p>
				        Contraseña
				        <input type="password" name="password">
				    </p>
				
				    <p>
				        Confirmar Contraseña
				        <input type="password" name="password_confirmation">
				    </p>
				
				    <div>
				        <button type="submit">
				            Cambiar Contraseña
				        </button>
				    </div>
				</form>
			</div>
		</div>
	</div>
</section>
@endsection