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
					<p><a href="/csv/trusts.csv">Fideicomisos 2006 - 2014 (csv)</p>
					<p><a href="/csv/trusts_2015.csv">Fideicomisos 2015 primer y segundo trimestre (csv)</p>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news">
</section>

@endsection