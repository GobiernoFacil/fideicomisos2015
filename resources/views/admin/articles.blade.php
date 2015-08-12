@extends('layouts.adminmaster')
@section('body_class', 'admin')

@section('title', 'Dashboard')
@section('description', "Dashboard")

@section('content')
<section>
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="{{url('home')}}">Regresar al Dashboard</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
 <div class="container">
	 <div class="row">
		 <div class="col-sm-12">
		 	<h1>Artículos</h1>
		 </div>
		 <div class="col-sm-8">
		 	<ul class="article_list">
		 	  @foreach($articles as $article)
		 	  <li>
		 	  	<div class="box_info {{$article->title == 1 ? 'publicado' : 'borrador' }} ">
		 	  		<h2><a href="{{url('articles/update/' . $article->id)}}">{{$article->title}}</a></h2>
		 	  		<p>{{$article->subtitle}}</p>
		 	  		<p class="author">Escrito por {{$article->author_name}} el {{$article->created_at}} -  última actualización: {{$article->updated_at}}  </p>
		 	  	</div>
		 	  </li>
		 	  @endforeach
		 	</ul>
		 </div>
		 
		 <div class="col-sm-4">
		 	<a href="{{url('articles/add/')}}" class="btn_link">crear nuevo artículo</a>
		 </div>
	 </div>
 </div>
</section>
@endsection