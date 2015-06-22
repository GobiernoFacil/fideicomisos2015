<!doctype html>
<html>
<head>
  <title>Estudia los fideicomisos</title>
</head>
<body>
<!-- Esta aplicación se llama Gregson, y no carga ningún
     tipo de información. -->
<div id="im-gregson" class="main">
  <!-- [ EL TÍTULO ] -->
  <h1>Gregson</h1>
  <section id="trust-description">
    <h2>Descripción</h2>
    <ul>
      <li>
        <strong>año:</strong><br>
        {{$selected['year']}}
      </li>
      <li>
        <strong>clave de registro:</strong><br>
        {{$selected['registry']}}</li>
      <li>
        <strong>ramo:</strong><br>
        {{$selected['branch']}}
      </li>
      <li>
        <strong>tipo:</strong><br>
         {{$selected['type']}}</li>
      <li>
        <strong>ámbito:</strong><br>
         {{$selected['scope']}}</li>

      <li>
        <strong>unidad responsable coordinadora:</strong><br>
         {{$selected['unit']}}</li>
      <li>
        <strong>fideicomitente o mandante:</strong><br>
         {{$selected['settlor']}}</li>
      <li>
        <strong>denominación:</strong><br>
         {{$selected['designation']}}</li>
      <li>
        <strong>objeto:</strong><br>
         {{$selected['objective']}}</li>
      <li>
        <strong>fiduciario o mandatario:</strong><br>
         {{$selected['fiduciary']}}</li>

      <li>
        <strong>grupo temático:</strong><br>
         {{$selected['theme']}}</li>
      <li>
        <strong>tipo de disponibilidad:</strong><br>
         {{$selected['availability_type']}}</li>
      <li><strong>fecha de aportación inicial:</strong><br>
         {{$selected['initial_date']}}</li>
      <li><strong>aportación inicial / observaciones:</strong><br>
         {{$selected['initial_amount_comments']}}</li>

    </ul>
  </section>

  <section id="trust-numbers">
    <h2>Cifras</h2>
    <table>
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
          <td>{{'$' . number_format($trust['initial_amount'])}}</td>
          <td>{{'$' . number_format($trust['income'])}}</td>
          <td>{{'$' . number_format($trust['yield'])}}</td>
          <td>{{'$' . number_format($trust['expenses'])}}</td>
          <td>{{'$' . number_format($trust['availability'])}}</td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </section>

  <section id="trust-comments">
    <h2>observaciones</h2>
    <ul>
      @foreach($trusts as $trust)
      <li>
        <h4>{{$trust['year']}}</h4>
        <p>{{$trust['comments']}}</p>
      </li>
      @endforeach
    </ul>
  </section>
  <section id="trust-reports">
    <h2>Reportes del cumplimiento de la misión y fines</h2>
    <ul>
      @foreach($trusts as $trust)
      <li>
        <h4>{{$trust['year']}}</h4>
        <p>{{$trust['report']}}</p>
      </li>
      @endforeach
    </ul>
  </section>
</div>

<!-- LA APP
<script data-main="/js/apps/gregson/main" src="/js/bower_components/requirejs/require.js"></script> -->
</body>
</html>