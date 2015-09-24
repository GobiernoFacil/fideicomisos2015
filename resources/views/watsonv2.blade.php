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
	<div id="im-watson" class="row">

		<div class="col-sm-10 col-sm-offset-1">
			<p>Busca por palabra clave los <strong>Fideicomisos Públicos</strong> en México:</p>

			<form id="the-search-app">
			<!-- the CSRF stuff -->
			<input id="_token" type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="row">
				<div class="col-xs-9 col-sm-10">
				<p><input type="text" name="search-string" id="search-string"></p>
				</div>
				<div class="col-xs-3 col-sm-2">
				<p><input type="submit" value="Buscar" class="btn_link"></p>
				</div>
			</div>
			</form>
			
			<!-- [ LOS RESULTADOS ] -->
			<div id="table_content" class="hide">
			<table id="results" class="table">
			  <thead>
			    <tr>
			      <th>Fecha inicial</th>
			      <th>Descripción</th>
			      <th>Objetivo</th>
			      <th>Ramo</th>
			    </tr>
			  </thead>
			  <tbody>
			  </tbody>
			</table>
			</div>
			<p id="nav" class="hide">
			  <a href="#" class="results-control-prev">Anterior</a>
			  <span class="results-control-page" id="results-control-page"></span>
			  <a href="#" class="results-control-next">Siguiente</a>
			</p>
		</div>
	</div>
</div>
<script>
  var TRUSTS_DATA = {
    years  : <?php echo json_encode($years); ?>,
    total  : <?php echo json_encode($total); ?>,
    fields : <?php echo json_encode($definitions); ?>,
    admin  : {{Auth::check()? 1:0}}
  };
</script>
<script data-main="/js/apps/watson/main" src="/js/bower_components/requirejs/require.js"></script>

@endsection