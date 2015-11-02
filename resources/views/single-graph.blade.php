<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <h2 id="title">Número de fideicomisos por {{$category->full_name}} ({{$year}})</h2>
  <!-- TREEMAP CHART -->
  <div id="graph-main">
    <div class="g-container"></div>
  </div>
  <script>
    var TRUSTS_DATA = {
      trusts   : <?php echo json_encode($trusts); ?>,
      year     : {{$year}},
      file     : "controller",
      category : <?php echo json_encode($category); ?>
    };

  </script>

<script data-main="/js/apps/graphs/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>