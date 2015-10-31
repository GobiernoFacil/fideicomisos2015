@extends('layouts.master')
@section('body_class', 'elgrafico')

@section('title', 'El Gráfico de los Fideicomisos | Las Cajas Negras')
@section('description', "El Gráfico es una sección que permite comprender a través de tres visualizaciones cómo el Gobierno está gastando el dinero de tus impuestos a través de 614 Fideicomisos públicos.")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>El gráfico</li>
					</ul>
					<h1>El gráfico</h1>
					<p class="lead">El Gráfico es una sección que permite comprender a través de tres herramientas de visualización de datos cómo el Gobierno ha gastado (desde 2006 hasta 2014) el dinero de tus impuestos en <strong>614 Fideicomisos públicos</strong> en México.</p>
				</div>
			</div>
		</div>
	</nav>
</div>
<div class="divider"></div>
<section class="list_news">
<div class="container">
	<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
			<h2>Número de fideicomisos por categoría</h2>
			<!-- TREEMAP CHART -->
			<div id="branch-treemap">
			    <form id="treemap-chart-controls">
			      <p>
			        <label>Categoría</label>
			        <select id="treemap-category" disabled>
			          <option value="0">ramo</option>
			          <option value="1">tipo</option>
			          <option value="2">ámbito</option>
			          <option value="3" selected>tema</option>
			          <option value="4">unidad responsable</option>
			          <option value="5">mandante</option>
			          <option value="6">fiduciario</option>
			        </select>
			      </p>
			    </form>
          <div class="g-container"></div>
          <table class="table">
            <caption></caption>
            <tbody></tbody>
          </table>
			</div>
		</div>
	</div>
</div>
</section>

<section class="data">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h2>Encuentra un Fideicomiso Público</h2>
				<p>Encuentra fideicomiso buscando por palabra clave.</p>
				<a href="/buscador-de-fideicomisos" class="col-sm-12 btn_link">Buscar un fideicomiso ></a>
			</div>
		</div>
	</div>
</section>

<section class="list_news">  
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
  				<div id="line-chart">
  				  <h2>Todos los fideicomisos</h2>
  				  <div class="g-container"></div>
  				</div>
			</div>
		</div>
	</div>
</section>


<section class="data">
<div class="container">
	<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
  <!-- BARCODE CHART -->
  <div id="barcode-chart">
    <form id="barcode-chart-controls">
	 <h2>Máximos históricos</h2>
   <p>Selecciona una categoría y un valor numérico para ordenar los fideicomisos. El valor que se
   muestra en el fideicomiso es el máximo histórico de la categoría, que puede ser de 2006 en adelante.</p>
	 <p>Filtra la información:</p>
      <div class="row">
      	<div class="col-sm-6">
      <p>
        <label>Categoría</label>
        <select id="barcode-category" disabled>
          <option value="0">ramo</option>
          <option value="1">tipo</option>
          <option value="2">ámbito</option>
          <option value="3" selected>tema</option>
          <option value="4">unidad responsable</option>
          <option value="5">mandante</option>
          <option value="6">fiduciario</option>
        </select>
      </p>
      	</div>
      	
      	<div class="col-sm-6">

      <p>
        <label>variable</label>
        <select id="barcode-numfield" disabled>
          <option value="0">ingresos</option>
          <option value="1">rendimientos</option>
          <option value="2">egresos</option>
          <option value="3" selected>disponibilidad</option>
          <option value="4">aportación inicial</option>
        </select>
      </p>
      	</div>
      </div>
    </form>
    <table class="table"> 
      <thead>
        <tr>
          <th class="category"></th>
          <th class="money"></th>
          <th>número de fideicomisos</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
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

  <script data-main="/js/apps/data/main" src="/js/bower_components/requirejs/require.js"></script>
@endsection