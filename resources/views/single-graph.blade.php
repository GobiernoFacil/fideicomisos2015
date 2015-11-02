<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <h2 id="title">Número de fideicomisos por <span></span></h2>
  <!-- TREEMAP CHART -->
  <div id="graph-main">
    <div class="g-container"></div>
  </div>
  <script>
    var TRUSTS_DATA = {
      trusts : <?php echo json_encode($trusts); ?>,
      year   : {{$year}}
    };

  </script>

<script data-main="/js/apps/graphs/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>