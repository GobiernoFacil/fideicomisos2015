@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', 'Datos Abiertos')
@section('description', "Datos abiertos de los fideicomisos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>Datos Abiertos</li>
					</ul>
					<h1>Datos Abiertos</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news">
	<div class="container">
		<div class="row">
			<div class="col-sm-7 col-sm-offset-1">
				
				<h3>Base de datos de Fideicomisos Públicos en México 2006 al 2014</h3>
				<p><a href="/csv/trusts.csv" class="btn_link">Fideicomisos 2006 - 2014 (csv)</a></p>
				<div class="divider"></div>
				<h3>Base de datos de Fideicomisos Públicos en México 2015 (primer y segundo trimestre)</h3>
				<p><a href="/csv/trusts_2015.csv" class="btn_link">Fideicomisos 2015 primer y segundo trimestre (csv)</a></p>
				<div class="divider"></div>
				<h3>Código Abierto</h3>
				<p>Contribuye o replica este proyecto.</p>
				<p><a href="https://github.com/GobiernoFacil/fideicomisos2015" class="btn_link">Código Abierto del proyecto</a></p>
			</div>
			<aside class="col-xs-10 col-xs-offset-1 col-sm-3">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						@include('layouts.sidebar')
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

@endsection