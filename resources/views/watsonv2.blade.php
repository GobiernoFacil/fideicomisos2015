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
						<li>Buscador de Fideicomisos</li>
					</ul>
					<h1>Buscador de fideicomisos</h1>
				</div>
			</div>
		</div>
	</nav>
</div>
<!-- ends breadcrumb-->
<div class="container">
			<div id="bloodhound" class="col-sm-12">
  				<input id="buscador" type="text" class="form-control input-lg typeahead" placeholder="Escribe palabras clave como Guadería ABC o Bicentenario">
  			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-sm-12" id="desi">
				</div>
				<div class="col-sm-12" id="vis1">
				</div>
				<div class="col-sm-12" id="desf">
				</div>
				<div class="col-sm-12" id="desu">
				</div>
			</div>
		</div>


		<!-- <script src="/js/bower_components/jquery/dist/jquery.min.js"></script>-->
		<!-- <script src="./js/jQuery/jquery-2.1.3.min.js"></script> -->
		<script src="./bootstrap/js/bootstrap.min.js"></script>
		<script src="./js/typeahead/typeahead.bundle.min.js"></script>
		<script src="./js/d3/d3.min.js"></script>
		<script src="./js/scripta.js"></script>
@endsection