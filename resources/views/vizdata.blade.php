@extends('layouts.master')
@section('body_class', 'reportajes vizdata')

@section('title', 'Visualización de Fideicomisos')
@section('description', "Visualización de los Fideicomisos Públicos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>Visualización de Fideicomisos</li>
					</ul>
					<h1>Visualización de Fideicomisos</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h2>Dinero en Fideicomisos Públicos por año</h2>
			</div>
		</div>
	</div>
</section>

<section class="data">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h2>Encuentra un Fideicomiso Público</h2>
				<p>Encuentra fideicomiso buscando por palabra clave, filtrando campos (ramo, tipo, egresos, rendimientos, entre otros).</p>
				<a href="/categorias" class="col-sm-12 btn_link">Busca un fideicomiso</a>
			</div>
		</div>
	</div>
</section>

<section class="list_news">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h2>Distribución de los Fideicomisos Públicos por año</h2>
				<p><strong>$424,025 millones de pesos</strong> en 2013</p>
				<p>				<img src="/images/vizdata-2.jpg"></p>

			</div>
		</div>
	</div>
</section>

<section class="data">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h2>Línea de Tiempo</h2>
			</div>
		</div>
	</div>
</section>

@endsection