<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <h2 id="title">Fideicomisos por disponibilidad</h2>
  <!-- TREEMAP CHART -->
  <div id="graph-main">
    <h4 id="line-trust-name">Mueve el mouse sobre una línea</h4>
    <div class="g-container"></div>
  </div>
  <script>
    var TRUSTS_DATA = {
      trusts      : <?php echo json_encode($trusts); ?>,
      categories  : <?php echo json_encode($categories); ?>,
      definitions : <?php echo json_encode($definitions); ?>,
      registries  : <?php echo json_encode($registries); ?>,
      file        : "controllerb"
    };
  </script>

<script data-main="/js/apps/graphs/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>