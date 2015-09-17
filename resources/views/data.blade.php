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

  <section id="barcode-chart">
    <table>
      <thead>
        <tr>
          <th class="category"></th>
          <th class="money"></th>
          <th>número de fideicomisos</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
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