@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', 'Reportajes')
@section('description', "Los Reportajes de los fideicomisos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>Reportajes</li>
					</ul>
					<h1>Reportajes</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news">
	<div class="container">
		<div class="row">
			<div class="col-sm-7 col-sm-offset-1">
				@if($articles)
				<?php $total_articles = 0;?>
				<ul class="reporta_list">
					@foreach($articles as $article)
					<?php $total_articles++;?>
					<li {!! $total_articles == 1 ? 'class="featured"' : '' !!}>
						<article>
							<a class="category">Bicentenario</a>
							<a href="{{url('reportaje/'.$article->id)}}" class="link_post">
								<figure>
									@if ($article->image)
									<img src="{{url($file_url . $article->image)}}">
									@else
									<img src="/images/mexico-bicentenario.jpg">
									@endif
								</figure>
								<h2 class="title">{{$article->title}}</h2>
								<p><span><?php 
								$date = strtotime($article->created_at);
								$str  =  date('d x Y', $date); 
								echo str_replace('x', $months[date('n', $date)], $str);
								?> .</span> {{$article->subtitle}}</p>
							</a>
						</article>
					</li>
					@endforeach
				</ul>
				@endif
			</div> <!-- ends col-->
			<aside class="col-xs-10 col-xs-offset-1 col-sm-3">
						<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
						<h2><strong>Consulta</strong> y <strong>descarga gratis</strong> los datos que usamos.</h2>
							<p>
							<a href="{{url('buscador-de-fideicomisos')}}" class="btn_link">BUSCADOR de FIDEICOMISO</a>
							<a href="{{url('explorador-de-fideicomisos')}}" class="btn_link">EXPLORAR FIDEICOMISOS por Categoría</a>
							<a href="{{url('el-grafico')}}" class="btn_link">Visualizar datos</a>
							<a href="/datos-abiertos" class="btn_link">Ver Datos abiertos</a></p>
						</div>
						</div>
			</aside>
			
		</div>
	</div>
</section>

@endsection