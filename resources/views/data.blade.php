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
			          <option value="0">Ramo</option>
			          <option value="1">Tipo</option>
			          <option value="2">Ámbito</option>
			          <option value="3" selected>Tema</option>
			          <option value="4">Unidad responsable</option>
			          <option value="5">Mandante</option>
			          <option value="6">Fiduciario</option>
			        </select>
			      </p>
			    </form>
          <div class="g-container"></div>
  		 @include('layouts.source')
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

				<h2>El dinero de tus impuestos en los Fideicomisos Públicos</h2>
				<p>Algunos fideicomisos gastaron más de lo que ingresaron entre 2006 y 2014. Selecciona disponibilidad, gastos, ingresos o rendimientos para observar 
					la variación. Puedes seleccionar una línea para obtener información sobre el fideicomiso.</p> 
  				  <form id="line-chart-controls">
    			    <p class="center">
    			      <select name="line-category" id="line-category">
    			        <option value="0" selected>Disponibilidad</option>
    			        <option value="1">Gastos</option>
    			        <option value="2">Ingresos</option>
    			        <option value="3">Rendimientos</option>
    			      </select>
    			    </p>
              <p>
        <select name="line-max-amount" id="line-max-amount">
          <option value="0" selected>60,000+</option>
          <option value="40000">&lt; 40,000</option>
          <option value="20000">&lt; 20,000</option>
          <option value="10000">&lt; 10,000</option>
          <option value="2000">&lt; 2,000</option>
          <option value="1000">&lt; 1,000</option>
          <option value="200">&lt; 200</option>
          <option value="20">&lt; 20</option>
          <option value="2">&lt; 2</option>
          <option value=".5">&lt; .5</option>
        </select>
      </p>
    			  </form>
  				
		  		  <p class="label">Millones de pesos</p>
            <h4 id="line-trust-name"></h4>
  				  <div class="g-container"></div>
  				  @include('layouts.source')
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
          <option value="0">Ramo</option>
          <option value="1">Tipo</option>
          <option value="2">Ámbito</option>
          <option value="3" selected>Tema</option>
          <option value="4">Unidad responsable</option>
          <option value="5">Mandante</option>
          <option value="6">Fiduciario</option>
        </select>
      </p>
      	</div>
      	
      	<div class="col-sm-6">

      <p>
        <label>Variable</label>
        <select id="barcode-numfield" disabled>
          <option value="0">Ingresos</option>
          <option value="1">Rendimientos</option>
          <option value="2">Egresos</option>
          <option value="3" selected>Disponibilidad</option>
          <option value="4">Aportación inicial</option>
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
          <th>Número de fideicomisos</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  		 @include('layouts.source')
  </div>
		</div>
	</div>
</div>
</section>

  <script>
    var TRUSTS_DATA = {
      trust_array : <?php echo json_encode($trusts); ?>,
      categories  : <?php echo json_encode($categories); ?>,
      definitions : <?php echo json_encode($definitions); ?>,
      registries  : <?php echo json_encode($registries); ?>
    };
  </script>

  <script data-main="/js/apps/data/main" src="/js/bower_components/requirejs/require.js"></script>
@endsection