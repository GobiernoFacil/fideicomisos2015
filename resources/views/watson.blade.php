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
    <!-- [A] busca por año -->
    <section id="search-by-year">
      <h3>Selecciona fideicomisos por año</h3>
      <ul>
        <li><input type="checkbox" name="y2014" value="2014">2014</li>
        <li><input type="checkbox" name="y2013" value="2013">2013</li>
        <li><input type="checkbox" name="y0000" value="0000">Todos</li>
      </ul>
    </section>

    <!-- [B] ordena por campo -->
    <section id="order-by-field">
      <h3>Ordenar por campo</h3>
      <p>
        <select name="order-field">
          <option value="total">total</option>
          <option value="year">año</option>
        </select>
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
        <select name="search-field">
          <option value="total">total</option>
          <option value="year">año</option>
        </select>
        <a id="add-sort-field" href="#">Agregar</a>
      </p>
    </section>
  </form>

  <!-- [ LOS RESULTADOS ] -->

  <table id="results">
    <thead></thead>
    <tbody></tbody>
  </table>
</div>

<?php echo app_path(); ?>
</body>
</html>