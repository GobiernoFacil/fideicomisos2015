@extends('layouts.master')
@section('body_class', 'home')

@section('title', 'Fideicomisos | Las cajas negras del Gobierno')
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
						<h2><a href="/reportajes/post">Festejos del Bicentenario</a></h2>
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
							<h2><a href="/reportajes/post">El Presidente del Bicentenario</a></h2>
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
						<a href="" class="category">ABC</a>
						<div>
							<h2><a href="/reportajes/post">Guardería ABC</a></h2>
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
							<h2><a href="/reportajes/post">Festejos del Bicentenario</a></h2>
							<p class="author"><span >Lilia Saúl</span> • 17/abril/2015</p>
						</div>
					</div>
				</article>
			</li>
		</ul>
		<div class="clearfix"></div>
		<a href="/reportajes" class="col-sm-10 col-sm-offset-1 more">Más reportajes sobre Fideicomisos en México >></a>
	</div>
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
		<div class="col-sm-7 col-sm-offset-1">
			<h2><strong>$424,025 millones de pesos</strong> de disponibilidad total en Fideicomisos Públicos en 2013</h3>
			<p class="lead">Cada rectángulo representa un ramo, el tamaño es equivalente a la cantidad en pesos mexicanos, y el color brillante indica un mayor número de fideicomisos. <img src="/images/ramos.png"></p>
		</div>
		<div class="col-sm-3 descarga ">
			<h2><strong>Consulta</strong> y <strong>descarga gratis</strong> los datos que publicamos.</h2>
			<p>Integer dapibus nunc ex, vitae interdum metus consequat eu. Ut sagittis magna purus, at sagittis mauris pretium sagittis. Pellentesque metus elit, ornare ut lorem a, aliquet tempor lacus</p>
			<p><a href="<?= url();?>/navegador-de-fideicomisos" class="btn_link">EXPLORAR DATOS</a></p>
			<p><a href="/datos-abiertos" class="btn_link">Datos abiertos</a></p>
		</div>
	</div>
</section>

@endsection