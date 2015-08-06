@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', $selected['designation'])
@section('description', "Descripción: ". $selected['designation'])

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a></li>
						<li><a href="{{url('categorias')}}">Explorarador de Fideicomisos</a></li>
					</ul>
					<h1>{{$selected['designation']}}</h1>
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
<div id="im-gregson">
  <!-- [ EL TÍTULO ] -->
  @if(Auth::check())
  <!-- Si es admin, aparece el navegador de admin, porque #Yodo -->
  <nav>
    <ul>
      <li><a href="{{url('admin/dashboard')}}">dashboard</a></li>
      <li><a href="{{url('navegador-de-fideicomisos')}}">fideicomisos</a></li>
    </ul>
  </nav>
  @endif

  <section id="trust-description">
    <h2>Descripción</h2>
    @if(Auth::check())
    <a href="{{url('trusts/update/' . $selected['id'])}}">editar</a>
    @endif
    <ul class="list_description">
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>año:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		{{$selected['year']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>clave de registro:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		{{$selected['registry']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>ramo:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['branch']}}
	      	</div>
      	</div>       
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>tipo:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['type']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>ámbito:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['scope']}}
	      	</div>
      	</div>
      </li>

      <li>
     	 <div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>unidad responsable coordinadora:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['unit']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>fideicomitente o mandante:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['settlor']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>denominación:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['designation']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>objeto:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['objective']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>fiduciario o mandatario:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['fiduciary']}}
	      	</div>
      	</div>
	  </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>grupo temático:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['theme']}}
	      	</div>
      	</div>
      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>tipo de disponibilidad:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['availability_type']}}
	      	</div>
      	</div>

      </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>fecha de aportación inicial:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['initial_date']}}
	      	</div>
      	</div>	
       </li>
      <li>
      	<div class="row">
	      	<div class="col-sm-3 right">
		  		<strong>aportación inicial / observacione:</strong><br>
	      	</div>
	      	<div class="col-sm-9">
		  		 {{$selected['initial_amount_comments']}}
	      	</div>
      	</div>
       </li>

    </ul>
  </section>

  <section id="trust-numbers">
    <h2>Cifras</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Año</th>
          <th>Aportación inicial</th>
          <th>ingresos (pesos)</th>
          <th>rendimientos (pesos)</th>
          <th>egresos (pesos)</th>
          <th>disponibilidad (pesos)</th>
        </tr>
      </thead>
      <tbody>
        @foreach($trusts as $trust)
        <tr>
          <td>{{$trust['year']}}</td>
          <td>
            {{'$' . number_format($trust['initial_amount']!=''?$trust['initial_amount'] : 0)}}
          </td>
          <td>{{'$' . number_format($trust['income']!=''?$trust['income'] : 0)}}</td>
          <td>{{'$' . number_format($trust['yield']!=''?$trust['yield'] : 0)}}</td>
          <td>{{'$' . number_format($trust['expenses']!=''?$trust['expenses'] : 0)}}</td>
          <td>{{'$' . number_format($trust['availability']!=''?$trust['availability'] : 0)}}</td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </section>

  <section id="trust-comments">
    <h2>Observaciones</h2>
    <ul class="list_description">
      @foreach($trusts as $trust)
      <li>
      	<div class="row">
	      	<div class="col-sm-2 right">
		  		<h4><strong>{{$trust['year']}}</strong></h4>
	      	</div>
	      	<div class="col-sm-10">
		  		 <p>{{$trust['comments']}}</p>
	      	</div>
      	</div>       
      </li>
      @endforeach
    </ul>
  </section>
  <section id="trust-reports">
    <h2>Reportes del cumplimiento de la misión y fines</h2>
    <ul class="list_description">
      @foreach($trusts as $trust)
      <li>
      	<div class="row">
	      	<div class="col-sm-2 right">
		  		<h4><strong>{{$trust['year']}}</strong></h4>
	      	</div>
	      	<div class="col-sm-10">
		  		 <p>{{$trust['report']}}</p>
	      	</div>
      	</div> 
      </li>
      @endforeach
    </ul>
  </section>
</div>
			</div>
		</div>
	</div>
</section>
<!-- LA APP
<script data-main="/js/apps/gregson/main" src="/js/bower_components/requirejs/require.js"></script> -->
@endsection