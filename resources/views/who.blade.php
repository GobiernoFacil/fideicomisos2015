@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', '¿quiénes somos?')
@section('description', "Equipo detrás de los fideicomisos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>Quiénes somos</li>
					</ul>
					<h1>Quiénes Somos</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news">
	<div class="container">
		<div class="row">
				<div class="col-sm-8 col-sm-offset-2">
					<h3>Coordinación</h3>
					<p>Lilia Saúl, Editora Periodismo de Datos EL UNIVERSAL de México</p>
					<h3>Textos e investigación</h3>
					<p>Lilia Saúl / Daniela Guazo</p>
					<h3>Análisis de Datos</h3>
					<p>Daniela Guazo / César Gutiérrez / <a href="http://gobiernofacil.com/">Gobierno Fácil</a></p>
					<h3>Visualización de Datos</h3>
					<p><a href="http://gobiernofacil.com/">Gobierno Fácil</a></p>
					<h3>Desarrollo y Diseño Web</h3>
					<p><a href="http://gobiernofacil.com/">Gobierno Fácil</a></p>
					
					<p>Escríbenos un correo: <a href="mailto:periodismodatos@eluniversal.com.mx">periodismodatos@eluniversal.com.mx</a></p>
				</div>
		</div>
	</div>
</section>

@endsection