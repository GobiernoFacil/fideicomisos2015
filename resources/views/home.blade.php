@extends('layouts.master')
@section('body_class', 'home')

@section('title', 'Fideicomisos | Las cajas negras del Gobierno')
@section('description', "Los fideicomisos")

@section('content')
<!-- news-->
<section class="news">
	@if($main_article)	
	<div class="likeaboss">
		<figure>
			@if ($main_article->image)
			<img src="{{url($file_url . $main_article->image)}}" alt="{{$main_article->title}}">
			@else
			<img src="/images/mexico-bicentenario.jpg">
			@endif
		</figure>
	</div>
	@endif
	
	<div class="container">
		@if($articles)	
		<?php $total_articles = 0;?>
		<ul class="post_list">
			@foreach($articles as $article)
			<?php $total_articles ++;?>
			@if($total_articles == 1)
			<li class="col-xs-12 col-sm-10 col-sm-offset-1">
				<article class="featured">
			@endif
			@if($total_articles == 2)
			<li class="col-xs-12 col-sm-4 col-sm-offset-1">
				<article class="half">
			@endif
			@if($total_articles > 2)
			<li class="col-xs-12 col-sm-3">
				<article class="quarter">
			@endif
			
			@if($total_articles > 1)
				<figure>
					@if($article->image)
					<img src="{{url($file_url . $article->image)}}" alt="{{$article->title}}">
					@else
					<img src="/images/1280px-bruxelles.jpg">
					@endif
				</figure>
			@endif
					<div {{ $total_articles > 1 ? 'class="front"' : ''}}>
						<a class="category">Fideicomiso</a>
						<div>
						<h2><a href="{{url('/reportaje/'.$article->id)}}">{{$article->title}}</a></h2>
							<p class="author"><span>{{$article->author_name}} </span> • <?php 
								$date = strtotime($article->created_at);
								$str  =  date('d x Y', $date); 
								echo str_replace('x', $months[date('n', $date)], $str);
								?> </p>
						@if($total_articles < 2)
							<p class="lead">{{$article->subtitle}}</p>
						@endif
						</div>
					</div>
				</article>
			</li>
			
	
			@endforeach
		</ul>
		@endif
		<div class="clearfix"></div>
		@if($total_articles > 4)
		<a href="/reportajes" class="col-sm-10 col-sm-offset-1 more">Más reportajes sobre Fideicomisos en México >></a>
		@endif
	</div>
</section>  

<section class="fideicomiso">
  <video width="1280" height="auto" controls="true">
    <source src="/videos/fideicomisos_largo.mp4" type="video/mp4">
    <source src="/videos/fideicomisos_largo.ogv" type="video/ogg">
    <source src="/videos/fideicomisos_largo.webm" type="video/webm">
    Your browser does not support the video tag.
  </video>
</section>

<!-- fideicomiso-->
<section class="fideicomiso">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h1>¿Qué es un <strong>fideicomiso</strong>?</h1>
				<p>Los <strong>Fideicomisos Públicos</strong> son contratos por medio de los cuales, el gobierno federal, los gobiernos de los Estados o los Ayuntamientos, con el carácter de fideicomitentes, a través de sus dependencias centrales o paraestatales, transmiten la titularidad de determinados bienes del dominio público, del dominio privado de la Federación, entidad federativa o municipal, o afecta fondos públicos en una institución fiduciaria para 
realizar un fin lícito determinado, de interés público. </p>
				<a href="{{url('/que-es-un-fideicomiso')}}" class="btn_link">+ Información</a>
			</div>
		</div>
	</div>
</section>
<section class="data">
	<div class="container">
		<div class="col-sm-10 col-sm-offset-1">
			<h1>Explorar Datos</h1>
		</div>
		<div class="col-sm-8 col-sm-offset-1">
			<iframe src="{{url('el-grafico/linemap')}}" width="100%" height="700">
			</iframe>
			<p class="center"><a href="{{url('el-grafico')}}" class="btn_link">Explorar más visualizaciones de datos &gt;</a></p>
		</div>
		<div class="col-sm-2 descarga">
			<h2><strong>Consulta</strong> y <strong>descarga gratis</strong> los datos que usamos.</h2>
			<p>
			<a href="{{url('buscador-de-fideicomisos')}}" class="btn_link">BUSCADOR de FIDEICOMISO</a>
			<a href="{{url('explorador-de-fideicomisos')}}" class="btn_link">EXPLORAR FIDEICOMISOS por Categoría</a>
			<a href="{{url('el-grafico')}}" class="btn_link">Visualizar datos</a>
			<a href="/datos-abiertos" class="btn_link">Ver Datos abiertos</a>
			<a href="https://github.com/GobiernoFacil/fideicomisos2015" class="btn_link">
Colabora (github)</a>
			</p>
		</div>
	</div>
</section>

<script>
    var TRUSTS_DATA = {
      trusts   : <?php echo json_encode($trusts); ?>,
      year     : {{$year}},
      category : <?php echo json_encode($category); ?>
    };

  </script>


<script data-main="/js/apps/home/main" src="/js/bower_components/requirejs/require.js"></script>
@endsection