@extends('layouts.master')
@section('body_class', 'login recover')

@section('title', 'Recuperar Contraseña')
@section('description', "Recuperar contraseña del admin")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<h1>Recuperar contraseña</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="box_login">
	<div class="container">
		<div class="row">
			<div class="col-sm-6 col-sm-offset-3">
				<form method="POST" action="/password/email">
				    {!! csrf_field() !!}
					<p>Email <input type="email" name="email" value="{{ old('email') }}"></p>
				    
				    <p><button type="submit">
				            Enviar enlace para cambiar contraseña
				        </button></p>
				</form>
			</div>
		</div>
	</div>
</section>
@endsection