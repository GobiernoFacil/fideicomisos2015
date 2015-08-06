@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', 'Estudia los fideicomisos')
@section('description', "Estudia los fideicomisos")

@section('content')

<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a></li>
						<li>VizData</li>
					</ul>
					<h1>Explorador de Fideicomisos</h1>
					<!-- <h1>Lestrade</h1>-->
				</div>
			</div>
		</div>
	</nav>	
</div>

<section class="list_news">
	<div class="container">
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<!-- Esta aplicación se llama Gregson, y no carga ningún
     tipo de información. -->
	 			<div id="im-lestrade">
	 			  <!-- [ EL TÍTULO ] -->
	 			 
	 			  <nav id="category-selector">
		 			  <p>Selecciona una categoría:</p>
	 			  @foreach($definitions as $definition)
	 			    @if(in_array($definition->name, $categories))
	 			     <span class="active-order"></span>
	 			     <a href="#" data-trigger="{{$definition->name}}">
	 			     {{$definition->full_name}}</a>
	 			    @endif
	 			  @endforeach 
	 			  </nav>
	 			
	 			  <div id="the-basic-graphics">
	 			  </div>
	 			
	 			  <!-- Las categorías -->
	 			  <section id="the-stuff"></section>
	 			</div>
			</div>
		</div>
	</div>
</section>




<script>
var TRUSTS_DATA = {
  trust_array : <?php echo json_encode($trusts); ?>,
  categories  : <?php echo json_encode($categories); ?>,
  definitions : <?php echo json_encode($definitions); ?>
};
</script>
<!-- LA APP -->
<script data-main="/js/apps/lestrade/main" src="/js/bower_components/requirejs/require.js"></script> 
@endsection