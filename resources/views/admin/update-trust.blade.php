@extends('layouts.adminmaster')
@section('body_class', 'admin trust edit')

@section('title', 'Actualizar Fideicomiso')
@section('description', "Actualizar Usuario")

@section('content')
<section>
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="{{url('home')}}">Ir al Dashboard</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
 <div class="container">
  <h1>Actualizar fideicomiso:  <strong>{{$trust->designation}}</strong></h1>
  <div class="row">
	  <div class="col-sm-8 col-sm-offset-2">
		  <div class="box_info">
  <form method="POST" action="/trusts/update/{{$trust->id}}" class="form-edit">
    {!! csrf_field() !!}
    <p>id: {{$trust->id}}</p>

    <p><label><input type="checkbox" name="all" value="1" checked="checked">Actualizar todos los campos similares en todos los años de este fideicomiso</label></p>
	<div class="row">
	    <div class="col-sm-3">
			<p class="label">Año</label></p>
	    </div>
	    <div class="col-sm-9">
			 <input type="text" name="year" value="{{$trust->year}}">
	    </div>
    </div>
    
	<div class="row">
	    <div class="col-sm-3">
			<p class="label">Ramo</label></p>
	    </div>
	    <div class="col-sm-9">
			<input type="text" name="branch" value="{{$trust->branch}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Tipo</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="type" value="{{$trust->type}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Ámbito</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="scope" value="{{$trust->scope}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Unidad responsable coordinadora</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="unit" value="{{$trust->unit}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Fideicomitente o mandante</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="settlor" value="{{$trust->settlor}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Clave de registro</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="registry" value="{{$trust->registry}}">
	    </div>
    </div>
   
   <div class="row">
	    <div class="col-sm-3">
			<p class="label">Denominación</label></p>
	    </div>
	    <div class="col-sm-9">
      <textarea name="designation">{{$trust->designation}}</textarea>
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Objeto</label></p>
	    </div>
	    <div class="col-sm-9">
    <textarea name="objective">{{$trust->objective}}</textarea>
	    </div>
    </div>
    
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Fiduciario o mandatario</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="fiduciary" value="{{$trust->fiduciary}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Grupo temático</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="theme" value="{{$trust->theme}}">
	    </div>
    </div>
   
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Ingresos (pesos)</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="income" value="{{$trust->income}}">
	    </div>
    </div>

    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Rendimientos (pesos)</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="yield" value="{{$trust->yield}}">
	    </div>
    </div>
    
	<div class="row">
	    <div class="col-sm-3">
			<p class="label">Egresos (pesos)</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="expenses" value="{{$trust->expenses}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Reporte del cumplimiento de la misión y fines</label></p>
	    </div>
	    <div class="col-sm-9">
      <textarea name="report">{{$trust->report}}</textarea>
	    </div>
    </div>

    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Disponibilidad (pesos)</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="availability" value="{{$trust->availability}}">
	    </div>
    </div>
   
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Tipo de Disponibilidad</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="availability_type" value="{{$trust->availability_type}}">
	    </div>
    </div>
    
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Monto aportación inicial</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="initial_amount" value="{{$trust->initial_amount}}">
	    </div>
    </div>

    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Fecha de aportación inicial</label></p>
	    </div>
	    <div class="col-sm-9">
      <input type="text" name="initial_amount" value="{{$trust->initial_amount}}">
	    </div>
    </div>
    
    <div class="row">
	    <div class="col-sm-3">
			<p class="label">Observaciones</label></p>
	    </div>
	    <div class="col-sm-9">
      <textarea name="comments">{{$trust->comments}}</textarea>
	    </div>
    </div>
   
	<div class="row">
	    <div class="col-sm-3">
			<p class="label">Aportación inicial / observaciones</label></p>
	    </div>
	    <div class="col-sm-9">
      <textarea name="initial_amount_comments">{{$trust->initial_amount_comments}}</textarea>
	    </div>
    </div>
   
    <div class="row">
	 	<div class="col-sm-9 col-sm-offset-3">
	 	<p><input type="submit" value="Actualizar"></p>
	 	</div>
     </div>
  </form>
		  </div>
	  </div>
  </div>
 </div>
</section>
@endsection