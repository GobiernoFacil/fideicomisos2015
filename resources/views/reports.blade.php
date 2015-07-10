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
				<ul class="reporta_list">
					<li  class=" featured">
						<article>
							<a href="#" class="category">Bicentenario</a>
							<a href="post.html" class="link_post">
								<figure>
									<img src="/images/mexico-bicentenario.jpg">
								</figure>
								<h2 class="title">Festejos del Bicentenario</h2>
								<p><span>17/abril/2015.</span> El primer astronauta mexicano evalúa lanzarse como candidato en 2018</p>
							</a>
						</article>
						
					</li>


					<li>
						<article>	
							<a href="#" class="category">Bicentenario</a>
							<a href="#" class="link_post">
								<figure>
									<img src="/images/1280px-bruxelles.jpg">
								</figure>
								<h2 class="title">El Presidente del Bicentenario</h2>
								<p><span>17/abril/2015.</span> Le imputan cargos por lavado de dinero por un monto estimado en 30 millones de dólares</p>
							</a>
						</article>
					</li>
					<li>
						<article>
							<a href="#" class="category">ABC</a>
							<a href="#" class="link_post">
								<figure>
									<img src="/images/abc.jpg">
								</figure>
								<h2 class="title">Guardería ABC</h2>
								<p><span>17/abril/2015.</span> Embajadores de 12 países presentan cartas credenciales a EPN</p>
							</a>
						</article>
					</li>
					<li>
						<article>
							<a href="#" class="category">Bicentenario</a>
							<a href="#" class="link_post">
								<figure>
									<img src="/images/bicentenario2.jpg">
								</figure>
								<h2 class="title">Festejos del Bicentenario</h2>
								<p><span>17/abril/2015.</span> En 2014 la cifra llegó a 14 mil y superó las solicitudes de ciudadanos chinos</p>
							</a>
						</article>
					</li>
					<li>
						<article>
							<a href="#" class="category">Bicentenario</a>
							<a href="#" class="link_post">
								<figure>
									<img src="/images/mexico-bicentenario.jpg">
								</figure>
								<h2 class="title">Festejos del Bicentenario</h2>
								<p><span>17/abril/2015.</span> El primer astronauta mexicano evalúa lanzarse como candidato en 2018</p>
							</a>
						</article>
					</li>

				</ul>
			</div> <!-- ends col-->
			<aside class="col-sm-3">
						<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
						<h2>Categorías</h2>
						<a class="category">ABC</a> 
						<a class="category">Bicentenario</a>					
						<a class="category">IMSS</a> 
						<a class="category">Presidentes</a>
						<a class="category">Soldados</a>
						<a class="category">SOL</a> 
						<a class="category">SHCP</a> 
						</div>
						</div>
			</aside>
			
		</div>
	</div>
</section>

@endsection