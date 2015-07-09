<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  <h1>Actualizar fideicomiso</h1>

  <form method="POST" action="/trusts/update/{{$trust->id}}">
    {!! csrf_field() !!}
    <p>id: {{$trust->id}}</p>

    <p><label>año:</label>
      <input type="text" name="year" value="{{$trust->year}}">
    </p>
    <p><label>ramo:</label>
      <input type="text" name="branch" value="{{$trust->branch}}">
    </p>
    <p><label>tipo:</label>
      <input type="text" name="type" value="{{$trust->type}}">
    </p>

    <p><label>ámbito:</label>
      <input type="text" name="scope" value="{{$trust->scope}}">
    </p>
    <p><label>unidad responsable coordinadora:</label>
      <input type="text" name="unit" value="{{$trust->unit}}">
    </p>
    <p><label>fideicomitente o mandante:</label>
      <input type="text" name="settlor" value="{{$trust->settlor}}">
    </p>

    <p><label>clave de registro:</label>
      <input type="text" name="registry" value="{{$trust->registry}}">
    </p>
    <p><label>denominación:</label>
      <input type="text" name="designation" value="{{$trust->designation}}">
    </p>
    <p><label>objeto:</label>
      <input type="text" name="objective" value="{{$trust->objective}}">
    </p>

    <p><label>fiduciario o mandatario:</label>
      <input type="text" name="fiduciary" value="{{$trust->fiduciary}}">
    </p>
    <p><label>grupo temático:</label>
      <input type="text" name="theme" value="{{$trust->theme}}">
    </p>
    <p><label>ingresos (pesos):</label>
      <input type="text" name="income" value="{{$trust->income}}">
    </p>

    <p><label>rendimientos (pesos):</label>
      <input type="text" name="yield" value="{{$trust->yield}}">
    </p>
    <p><label>egresos (pesos):</label>
      <input type="text" name="expenses" value="{{$trust->expenses}}">
    </p>
    <p><label>reporte del cumplimiento de la misión y fines:</label>
      <input type="text" name="report" value="{{$trust->report}}">
    </p>

    <p><label>disponibilidad (pesos):</label>
      <input type="text" name="availability" value="{{$trust->availability}}">
    </p>
    <p><label>tipo de disponibilidad:</label>
      <input type="text" name="availability_type" value="{{$trust->availability_type}}">
    </p>
    <p><label>monto aportación inicial:</label>
      <input type="text" name="initial_amount" value="{{$trust->initial_amount}}">
    </p>

    <p><label>fecha de aportación inicial:</label>
      <input type="text" name="initial_date" value="{{$trust->initial_date}}">
    </p>
    <p><label>observaciones:</label>
      <input type="text" name="comments" value="{{$trust->comments}}">
    </p>
    <p><label>aportación inicial / observaciones:</label>
      <input type="text" name="initial_amount_comments" value="{{$trust->initial_amount_comments}}">
    </p>

    <p><input type="submit" value="Actualizar"> </p>
  </form>
</body>
</html>