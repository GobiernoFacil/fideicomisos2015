@extends('layouts.adminmaster')
@section('body_class', 'admin add_article')

@section('title', 'Crear Artículo')
@section('description', "Crear Artículo")

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
		<h1>Crear Artículo</h1>
  <form enctype="multipart/form-data" method="POST" action="{{url('articles/add')}}">
    {!! csrf_field() !!}
    <p>Título    : <input name="title"></p>
    <p>Subtítulo : <input name="subtitle"></p>
    <p>Autor     : <input name="author_name"></p>
    <p>Portada   : <input type="file" name="image"></p>
    <p><input type="submit" value="crear artículo" class="btn_link"></p>
  </form>
	</div>
	</div>
</section>
@endsection