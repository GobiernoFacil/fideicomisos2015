@extends('layouts.master')
@section('body_class', 'watson')

@section('title', 'Estudia los fideicomisos')
@section('description', "Estudia los fideicomisos")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="/">Inicio</a>
						<li>VizData</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</div>
<!-- ends breadcrumb-->


<div class="container">
<!-- Esta aplicación se llama Watson, y obtiene
     información de un endpoint llamado Sherlock. -->
<div id="im-watson" class="row">
<div class="col-sm-10 col-sm-offset-1">
  <!-- [ EL TÍTULO ] -->
  <h1>Navegador de Fideicomisos</h1>
<p>Explora los datos de los fideicomisos públicos en México, utiliza los filtros para mejorar tu búsqueda</p>
  <!-- [ EL BUSCADOR ] -->
  <form id="the-search-app">
  <!-- the CSRF stuff -->
  <input id="_token" type="hidden" name="_token" value="{{ csrf_token() }}">
    <!-- [A] busca por año -->
    <section id="search-by-year">
      <h3>Selecciona fideicomisos por año</h3>
      <ul class="year">
        <!-- la lista de años. Esta viene del servidor -->
        @foreach($years as $year)
        <li>
            <input checked="checked" 
            type="checkbox" 
            name="y{{$year}}" 
            id="y{{$year}}"
            value="{{$year}}">
            <label for="y{{$year}}"><span></span>{{$year}}</label>
        </li>
        @endforeach
        <li><a id="all-years" href="#">Todos</a></li>
      </ul>
    </section>

    <!-- [B] ordena por campo -->
    <section id="order-by-field">
      <h3>Ordenar por campo</h3>
      <p>
        <select name="order-field"></select>
        <select name="order-sort">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <a id="add-sort-field" href="#">Agregar</a>
      </p>
      <ul></ul>
    </section>

    <!-- [C] busca palabras clave -->
    <section id="search-on-field">
      <h3>Buscar palabra clave</h3>
      <p>
        <input type="text" name="search-string">
      </p>
    </section>

    <!-- [D] Selecciona los campos por mostrar -->
    <section id="select-visible-fields">
      <h3>Selecciona los campos visibles</h3>
      <ul>
        <!-- la lista de años. Esta viene del servidor -->
        @foreach($definitions as $field)
        <li>
         
            <input checked="checked" 
            type="checkbox" 
            id="f-{{$field->name}}"
            name="f-{{$field->name}}" 
            value="{{$field->name}}">
             <label for="f-{{$field->name}}">{{$field->full_name}}
          </label>
        </li>
        @endforeach
        <li><a id="all-fields" href="#">Todos</a></li>
      </ul>
    </section>

    <!-- [E] ejecuta la búsqueda -->
    <section>
      <p><input type="submit" value="Buscar"></p>
    </section>
  </form>

  <!-- [ LOS RESULTADOS ] -->
  <p>
    <a href="#" class="results-control-prev">anterior</a>
    <span class="results-control-page"></span>
    <a href="#" class="results-control-next">siguiente</a>
  </p>
  <table id="results">
    <thead></thead>
    <tbody></tbody>
  </table>
</div>
</div>
</div>
<!-- LA APP -->
<script>
  var TRUSTS_DATA = {
    years  : {{ json_encode($years) }},
    total  : {{ json_encode($total) }},
    fields : <?php echo json_encode($definitions); ?>,
    admin  : {{Auth::check()}}
  };
</script>
<script data-main="/js/apps/watson/main" src="/js/bower_components/requirejs/require.js"></script>

@endsection