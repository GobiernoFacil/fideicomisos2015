@extends('layouts.master')
@section('body_class', 'home')

@section('title', 'Fideicomisos')
@section('description', "Los fideicomisos")

@section('content')
<!-- news-->
<section class="news">
	<div class="likeaboss">
		<figure>
			<img src="/images/mexico-bicentenario.jpg">
		</figure>
	</div>
	<div class="container">
		<ul class="post_list">
			<li class="col-sm-10 col-sm-offset-1">
				<article class="featured">
					<div>
						<a href="#" class="category">Bicentenario</a>
						<h2><a href="#">Festejos del Bicentenario</a></h2>
							<p class="author"><span >Lilia Saúl</span> • 17/abril/2015</p>
					</div>
				</article>
			</li>
			
			<li class="col-sm-4 col-sm-offset-1">
				<article class="half">
					
					<figure>
						<img src="/images/1280px-bruxelles.jpg">
					</figure>
					<div class="front">
						<a href="#" class="category">Bicentenario</a>
						<div>
							<h2><a href="#">El Presidente del Bicentenario</a></h2>
							<p class="author"><span >Lilia Saúl</span> • 17/abril/2015</p>
						</div>
					</div>
				</article>
			</li>
			<li class="col-sm-3">
				<article class="quarter">
					<figure>
						<img src="/images/abc.jpg">
					</figure>
					<div class="front">
						<a href="#" class="category">ABC</a>
						<div>
							<h2><a href="#">Guardería ABC</a></h2>
							<p class="author"><span >Lilia Saúl</span> • 17/abril/2015</p>
						</div>
					</div>
				</article>
			</li>
			<li class="col-sm-3">
				<article class="quarter">
					<figure>
						<img src="/images/bicentenario2.jpg">
					</figure>
					<div class="front">
					<a href="#" class="category">Bicentenario</a>
						<div>
							<h2><a href="#">Festejos del Bicentenario</a></h2>
							<p class="author"><span >Lilia Saúl</span> • 17/abril/2015</p>
						</div>
					</div>
				</article>
			</li>
		</ul>
		<div class="clearfix"></div>
		<a href="#" class="col-sm-10 col-sm-offset-1 more">Más reportajes sobre Fideicomisos en México >></a>
	</div>
</section>  

<!-- fideicomiso-->
<section class="fideicomiso">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h1>¿Qué es un <strong>fideicomiso</strong>?</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a enim ac nisl posuere viverra. Donec et orci velit. Maecenas et malesuada massa, eget mattis ex. Donec consectetur justo eu fermentum egestas. Integer dapibus nunc ex, vitae interdum metus consequat eu. Ut sagittis magna purus, at sagittis mauris pretium sagittis. Pellentesque metus elit, ornare ut lorem a, aliquet tempor lacus</p>
				<a href="#" class="btn_link">Información</a>
			</div>
		</div>
	</div>
</section>
<section class="data">
	<div class="container">
		<div class="col-sm-7 col-sm-offset-1">
			<h1>Maecenas et malesuada massa, eget mattis ex.</h1>
		</div>
		<div class="col-sm-3 descarga ">
			<h2><strong>Consulta</strong> y <strong>descarga gratis</strong> los datos que publicamos.</h2>
			<p>Integer dapibus nunc ex, vitae interdum metus consequat eu. Ut sagittis magna purus, at sagittis mauris pretium sagittis. Pellentesque metus elit, ornare ut lorem a, aliquet tempor lacus</p>
			<p><a href="#" class="btn_link">EXPLORAR DATOS</a></p>
			<p><a href="#" class="btn_link">Datos abiertos</a></p>
		</div>
	</div>
</section>

@endsection