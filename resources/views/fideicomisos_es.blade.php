@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', 'Qué es un Fideicomiso')
@section('description', "Los fideicomisos son")

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul>
						<li><a href="/">Inicio</a>
						<li>¿Qué es un Fideicomiso?</li>
					</ul>
					<h1>¿Qué es un Fideicomiso Público?</h1>
				</div>
			</div>
		</div>
	</nav>
</div>

<section class="list_news que_es">
	<div class="container">
			<div class="row">
				<div class="col-sm-8 col-sm-offset-2">
					<p>Los Fideicomisos Públicos son contratos por medio de los cuales, el gobierno federal, los gobiernos de los Estados o los Ayuntamientos, con el carácter de fideicomitentes, a través de sus dependencias centrales o paraestatales, transmiten la titularidad de determinados bienes del dominio público, del dominio privado de la Federación, entidad federativa o municipal, o afecta fondos públicos en una institución fiduciaria para 
realizar un fin lícito determinado, de interés público. </p>
					
					<div class="row fideicomitente">
						<div class="col-sm-8 col-sm-offset-2 partes">
							<h2>Partes del Fideicomiso</h2>
						</div>
						<div class="clearfix"></div>
						<div class="col-sm-4">
							<h4 class="first">Fideicomitente</h4>
							<p>Destina bienes o derechos para constituir el fideicomiso. </p>
						</div>
						<div class="col-sm-4">
							<h4>Fiduciario</h4>
							<p>Institución con autorización quien recibe los bienes del cliente (Patrimonio) para realizar los fines lícitos determinados por el fideicomitente. </p>
						</div>
						<div class="col-sm-4">
							<h4 class="last">Fideicomisario</h4>
							<p>Recibe el beneficio derivado del fideicomiso, puede ser el mismo fideicomitente. </p>
						</div>
					</div>
					<div class="divider"></div>
					<h2>Línea de tiempo de la Normatividad o reglamentación de los Fideicomisos</h2>
					<p>Hasta 2006 la Secretaría de Hacienda y Crédito Público (SHCP) era la única con la facultad de crear fideicomisos públicos. Con la expedición de la Ley Federal de Presupuesto y Responsabilidad Hacendaria, el criterio legislador cambió y determinó que la SHCP sólo sería fideicomitente único de la Administración Pública Centralizada, lo que abrió la posibilidad de que también el Poder Judicial, las cámaras de diputados y de senadores, así como los órganos constitucionales autónomos actúen como fideicomitentes y constituyan fideicomisos públicos con recursos provenientes de sus presupuestos autorizados.
					</p>
					<p><img src="/images/normatividad.png"></p>
					<p>Los <strong>Fideicomisos Públicos no paraestatales</strong>, no sólo no cuentan con una estructura orgánica propia, sino que también carecen de un órgano interno de control. La Auditoría Superior de la Federación, ha venido señalando que los fideicomisos no paraestatales  constituyen una de las áreas de mayor opacidad y riesgo, sobre las cuales es necesario profundizar en su existencia, regulación, control, transparencia y rendición de cuentas, ya que prácticamente se encuentran regulados por el contrato de constitución particular de cada uno de ellos y las reglas de operación que sus propios comités técnicos emiten. </p>
					
							<a href="/buscador-de-fideicomisos" class="btn_link">Buscador &gt;&gt;</a>

				</div>
			</div>
		</div>
	
</section>

@endsection