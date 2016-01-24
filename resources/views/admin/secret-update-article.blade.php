@extends('layouts.adminmaster')
@section('body_class', 'admin add_article')

@section('title', 'Editar Artículo')
@section('description', "Editar Artículo")

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
	
	
	<div class="col-sm-8 col-sm-offset-2">
		<h1>Editar Artículo</h1>
  <form enctype="multipart/form-data" method="POST" action="{{url('articles/secretupdate/' . $article->id)}}">
    {!! csrf_field() !!}
    <p>Título    : <input name="title" value="{{$article->title}}"></p>
    <p>Subtítulo : <input name="subtitle" value="{{$article->suvtitle}}"></p>
    <p>Autor     : <input name="author_name" value="{{$article->author_name}}"></p>
    <p>Portada   : <input type="file" name="image"></p>
    <p><input type="submit" value="editar artículo" class="btn_link"></p>
  </form>
	</div>
	</div>
</section>
@endsection