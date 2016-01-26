@extends('layouts.master')
@section('body_class', 'reportajes')

@section('title', 'Metodología')
@section('description', "Las premisas para crear el proyecto")

@section('content')
<div class="main">
  <nav class="breadcrumb">
    <div class="container">
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <ul>
            <li><a href="/">Inicio</a>
            <li>Metodología</li>
          </ul>
          <h1>Metodología</h1>
        </div>
      </div>
    </div>
  </nav>
</div>

<section class="list_news que_es">
  <div class="container">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          <p><strong>Fideicomisos, las cajas negras de los gobiernos</strong>, se realizó con dos premisas básicas: Ordenar y sistematizar todos los fideicomisos existentes en el gobierno federal y que cualquier persona entienda lo importante que es darle seguimiento a estos instrumentos financieros, pues provienen de recursos públicos.</p>
          <p>Sin embargo, a lo largo de estos meses nos hemos dado cuenta de que las irregularidades y las opacidades en estas cajas negras no competen en su mayoría al gobierno federal, sino a los gobiernos locales e incluso a órganos autónomos, quienes tienen permitido crear fideicomisos y celebrar estos contratos para diversos motivos.</p>
          <p>¿El resultado? Nos dimos a la tarea de dar un primer paso con esta investigación en cuanto a los 614 fideicomisos que existieron de 2006 a 2014 en el gobierno federal y en los que ingresaron más de 2 billones de pesos. Tarea posterior será indagar en los fideicomisos por entidades.</p>
          <p>Uno de los primeros grandes retos fue, en principio, sistematizar todos los fideicomisos públicos que reporta la Secretaría de Hacienda y Crédito Público a la Cámara de Diputados, de manera trimestral, como lo ordena la normatividad.</p>
          <p>De estos fideicomisos, encontramos información disponible a partir de 2006, a pesar de que desde 2004 el entonces Instituto Federal de Acceso a la Información (IFAI) ordenó su organización y sistematización a la Secretaría de Hacienda. </p>
          <p>La respuesta para no tener información disponible en línea, por parte de Hacienda, fue simple: Porque se usaban programas y softwares distintos para la creación y sistematización de estos archivos (esto ya significa de por sí, un gran reto para el gobierno abierto que buscan impulsar).</p>
          <p>El primer paso fue ordenar y sistematizar la información con la que contábamos. Después, convertir los datos de PDF a Excel y después convertir la información a programas como SQL o JSON para realizar las gráficas.</p>
          <p>Otro gran reto para la construcción de estas bases de datos era que ni la misma Secretaría de Hacienda o la Auditoría Superior de la Federación supieron aclarar dudas como el hecho de mantener en diferente status a los Fideicomisos, Mandatos y Análogos. Por ello todos están en la misma base. </p>
          <p>Otra razón difícil de explicar fue el hecho de que varios datos se encuentran en “ingresos” pero con signo negativo. Esta información, Hacienda la trató de explicar con “disponibilidades” que aún no se tenían contempladas.</p>
          <p>Después de obtener las bases de datos listas para trabajarlas, uno de los principales obstáculos era cómo graficar esta información.  Finalmente se logró mostrar a través del buscador 614 gráficas distintas que permiten conocer al lector las partes más importantes del fideicomiso: El ingreso (cuánto dinero le metió a esa cuenta bancaria Hacienda), la disponibilidad (como en una cuenta de banco, cuánto dinero se tiene en la actualidad) y el egreso (lo que se sacó de esa cuenta bancaria), lo que permite ver, a lo largo de los años (de 2006 a 2014) cuánto dinero se “movió” en el tiempo y el comportamiento que tuvieron estos fideicomisos.</p>
          <p>Otra gráfica relevante es la que incluye a todos los fideicomisos para mostrarlos por temas, pues así se denotan las prioridades que tiene el gobierno federal en cuanto a cómo gastar el dinero que se tienen en los fideicomisos.</p>
          <p>La última gráfica es la que concentra temas y ramos, para mostrar a todas las dependencias cuánto dinero acumularon y  quiénes concentraron el mayor número de fideicomisos.</p>
          <p>Todas las gráficas se construyeron a partir de cero, con el programa D3.</p>
          <p>La siguiente etapa de este proyecto es abrir, a través de solicitudes de información, los contratos con los que se abrieron estos fideicomisos. Se solicitaron algunos, pero bajo el argumento del secreto bancario y fiduciario, aún hay resistencias del gobierno federal para abrir esta información.</p>
          <p>También hace falta revelar los procesos de extinción de los fideicomisos y cuantos realmente ya fueron “extinguidos” y cuántos faltan por “extinguir”.</p>
          <p>Y por último  es mostrarle a través de reportajes y de historias lo relevante que puede ser abrir y conocer cómo se manejan estos recursos, pues se obtienen del presupuesto que proviene, al final del día, de los impuestos que pagamos todos los mexicanos.</p>
        </div>
      </div>
    </div>
  
</section>

@endsection