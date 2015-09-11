<!DOCTYPE html>
<html>
<head>
  <title>Watson v2</title>
</head>
<body>
  <h1>Buscador de fideicomisos</h1>
  <form id="the-search-app">
  <!-- the CSRF stuff -->
  <input id="_token" type="hidden" name="_token" value="{{ csrf_token() }}">
  <p><input type="text" name="search-string" id="search-string"></p>
  <p><input type="submit" value="Buscar"></p>
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

<script>
  var TRUSTS_DATA = {
    years  : <?php echo json_encode($years); ?>,
    total  : <?php echo json_encode($total); ?>,
    fields : <?php echo json_encode($definitions); ?>,
    admin  : {{Auth::check()? 1:0}}
  };
</script>

</body>
</html>