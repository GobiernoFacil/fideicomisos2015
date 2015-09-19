<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <h1>El gráfico</h1>

  <section id="branch-treemap">
  </section>

  <section id="circle-pack">
  </section>

  <!-- BARCODE CHART -->
  <section id="barcode-chart">
    <form id="barcode-chart-controls">
      <p>
        <label>Categoría</label>
        <select id="barcode-category" disabled>
          <option value="0">ramo</option>
          <option value="1">tipo</option>
          <option value="2">ámbito</option>
          <option value="3" selected>tema</option>
          <option value="4">unidad responsable</option>
          <option value="5">mandante</option>
          <option value="6">fiduciario</option>
        </select>
      </p>

      <p>
        <label>variable</label>
        <select id="barcode-numfield" disabled>
          <option value="0">ingresos</option>
          <option value="1">rendimientos</option>
          <option value="2">egresos</option>
          <option value="3" selected>disponibilidad</option>
          <option value="4">aportación inicial</option>
        </select>
      </p>
    </form>
    <table>
      <thead>
        <tr>
          <th class="category"></th>
          <th class="money"></th>
          <th>número de fideicomisos</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>


  <script>
    var TRUSTS_DATA = {
      trust_array : <?php echo json_encode($trusts); ?>,
      categories  : <?php echo json_encode($categories); ?>,
      definitions : <?php echo json_encode($definitions); ?>
    };
  </script>

  <script data-main="/js/apps/data/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>