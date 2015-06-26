<!doctype html>
<html>
<head>
  <title>Estudia los fideicomisos</title>
</head>
<body>
<!-- Esta aplicación se llama Gregson, y no carga ningún
     tipo de información. -->
<div id="im-lestrade" class="main">
  <!-- [ EL TÍTULO ] -->
  <h1>Lestrade</h1>
</div>

<script>
var TRUSTS_DATA = {
  trust_array : <?php echo json_encode($trusts); ?>,
  categories  : <?php echo json_encode($categories); ?>,
  category    : "{{$category}}"
};
</script>
<!-- LA APP -->
<script data-main="/js/apps/lestrade/main" src="/js/bower_components/requirejs/require.js"></script> 
</body>
</html>