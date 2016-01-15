@extends('layouts.master')
@section('body_class', 'watson')

@section('title', 'Buscar de Fideicomisos')
@section('description', "Utiliza el buscador de Fideicomisos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="{{url('/')}}">Inicio</a>
						<li>Así se reparten los recursos</li>
					</ul>
					<h1>Así se reparten los recursos</h1>
				</div>
			</div>
		</div>
	</nav>
</div>
<!-- ends breadcrumb-->
<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<h1>Así se reparten los recursos de los fideicomisos</h1>
					<h3>Conoce todas las cajas negras de los fideicomisos</h3>
					<p>La siguiente gráfica muestra la división de los fideicomisos por tema y por ramo. Cada nivel de la gráfica representa una división. El primer nivel, el más cercano al centro, muestra la división de fideicomisos por tema. El segundo nivel muestra para cada tema los ramos en los que hay fideicomisos, Por último el tercer nivel muestra cada uno de los fideicomisos existentes entre 2006 y 2014. El tamaño de cada sección depende del monto correspondiente a los ingresos para esa categoría.</p>
				</div>
				<div class="col-sm-12" id="visj">
				</div>
				<div class="col-sm-12" id="defs">
					<dl>
						<dt>Temas</dt>
						<dd>Diferentes temáticas en las que la Secretaría de Hacienda y Crédito Público agrupó a los fideicomisos dependiendo de las necesidades para los cuales fueron creados</dd>
						<dt>Ramos</dt>
						<dd>Rubros en los que se dividen las dependencias de gobierno que abren o reciben los recursos de los fideicomisos</dd>
					</dl>
				</div>
			</div>
		</div>


		<!-- <script src="/js/bower_components/jquery/dist/jquery.min.js"></script>-->
		<!-- <script src="./js/jQuery/jquery-2.1.3.min.js"></script> -->
		<script src="./bootstrap/js/bootstrap.min.js"></script>
		<script src="./js/typeahead/typeahead.bundle.min.js"></script>
		<script src="./js/d3/d3.min.js"></script>
		<script src="./js/scripta2.js"></script>
@endsection