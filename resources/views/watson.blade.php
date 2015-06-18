<!doctype html>
<html>
<head>
  <title>Estudia los fideicomisos</title>
</head>
<body>
<!-- Esta aplicación se llama Watson, y obtiene
     información de un endpoint llamado Sherlock. -->
<div id="im-watson" class="main">
  <!-- [ EL TÍTULO ] -->
  <h1>Watson</h1>

  <!-- [ EL BUSCADOR ] -->
  <form id="the-search-app">
  <!-- the CSRF stuff -->
  <input id="_token" type="hidden" name="_token" value="{{ csrf_token() }}">
    <!-- [A] busca por año -->
    <section id="search-by-year">
      <h3>Selecciona fideicomisos por año</h3>
      <ul>
        <!-- la lista de años. Esta viene del servidor -->
        @foreach($years as $year)
        <li>
          <label>
            <input checked="checked" 
            type="checkbox" 
            name="y{{$year}}" 
            value="{{$year}}">{{$year}}
          </label>
        </li>
        @endforeach
        <li><a id="all-years" href="#">Todos</a></li>
      </ul>
    </section>

    <!-- [B] ordena por campo -->
    <section id="order-by-field">
      <h3>Ordenar por campo</h3>
      <p>
        <select name="order-field"></select>
        <select name="order-sort">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <a id="add-sort-field" href="#">Agregar</a>
      </p>
      <ul></ul>
    </section>

    <!-- [C] busca palabras clave -->
    <section id="search-on-field">
      <h3>Buscar palabra clave</h3>
      <p>
        <input type="text" name="search-string">
      </p>
    </section>

    <!-- [D] Selecciona los campos por mostrar -->
    <section id="select-visible-fields">
      <h3>Selecciona los campos visibles</h3>
      <ul>
        <!-- la lista de años. Esta viene del servidor -->
        @foreach($definitions as $field)
        <li>
          <label>
            <input checked="checked" 
            type="checkbox" 
            name="f-{{$field->name}}" 
            value="{{$field->name}}">{{$field->full_name}}
          </label>
        </li>
        @endforeach
        <li><a id="all-years" href="#">Todos</a></li>
      </ul>
    </section>

    <!-- [E] ejecuta la búsqueda -->
    <section>
      <p><input type="submit" value="Buscar"></p>
    </section>
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
</div>

<!-- LA APP -->
<script>
  var TRUSTS_DATA = {
    years  : <?php echo json_encode($years); ?>,
    total  : <?php echo json_encode($total); ?>,
    fields : <?php echo json_encode($definitions); ?>
  };
</script>
<script data-main="/js/apps/watson/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>