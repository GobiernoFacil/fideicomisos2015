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
						<li>A dónde se va el dinero</li>
					</ul>
					<!--<h1>A dónde se va el dinero</h1>-->
				</div>
			</div>
		</div>
	</nav>
</div>
<!-- ends breadcrumb-->
<div class="container">
				<div class="row">
					<div class="col-sm-12" id="tit">
					</div>
					<div class="col-sm-12" id="vis">
					</div>
					<div class="col-sm-12" id="def">
					</div>
				</div>
		</div>


		<!-- <script src="/js/bower_components/jquery/dist/jquery.min.js"></script>-->
		<!-- <script src="./js/jQuery/jquery-2.1.3.min.js"></script> -->
		<script src="./bootstrap/js/bootstrap.min.js"></script>
		<script src="./js/typeahead/typeahead.bundle.min.js"></script>
		<script src="./js/d3/d3.min.js"></script>
		<script src="./js/scripta3.js"></script>
@endsection