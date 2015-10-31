@extends('layouts.master')
@section('body_class', 'elgrafico')

@section('title', 'El Gráfico de los Fideicomisos')
@section('description', "Visualización de los Fideicomisos Públicos en México")

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
				</div>
			</div>
		</div>
	</nav>
</div>

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

<section>
  <div id="line-chart">
    <h2>Todos los fideicomisos</h2>
    <div class="g-container"></div>
  </div>
</section>

<section class="list_news">
	<div class="container">
	<div class="row">
		<div class="col-sm-8 col-sm-offset-2">
  <div id="circle-pack">
				<h2>Distribución de Fideicomiso Público</h2>
    <form id="pack-chart-controls">
    <ul>
      <li><input type="checkbox" name="pack_category[]" value="0" checked>ramo</li>
      <li><input type="checkbox" name="pack_category[]" value="1" checked>tipo</li>
      <li><input type="checkbox" name="pack_category[]" value="2" checked>ámbito</li>
      <li><input type="checkbox" name="pack_category[]" value="3">tema</li>
      <li><input type="checkbox" name="pack_category[]" value="4">unidad responsable</li>
      <li><input type="checkbox" name="pack_category[]" value="5">mandante</li>
      <li><input type="checkbox" name="pack_category[]" value="6">fiduciario</li>
    </ul>
    </form>
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