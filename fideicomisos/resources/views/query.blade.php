<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script id="list-item-template" type="text/x-dot-template">
    @{{=it.objective}}
  </script>
</head>
<body>
  <h1>Buscador</h1>
  <form id="select-by-year-form">
    <fieldset>
    <p>
      <label>Selecciona el año</label>
      <select id="select_year">
        <option>2006</option>
        <option>2007</option>
        <option>2008</option>
        <option>2009</option>
        <option>2010</option>
        <option>2011</option>
        <option>2012</option>
        <option>2013</option>
        <option>2014</option>
      </select>
    </p>
    <p><input type="submit" value="buscar"></p>
    </fieldset>
  </form>
  <ul id="lista"></ul>
  <ul id="lista-permanente"></ul>
  <script src="/js/doT.min.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>