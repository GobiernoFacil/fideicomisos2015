<!doctype html>
<html>
<head>
  <title>Estudia los fideicomisos</title>
  <link rel="stylesheet" type="text/css" href="/css/dev.css">
</head>
<body>
<!-- Esta aplicación se llama Gregson, y no carga ningún
     tipo de información. -->
<div id="im-lestrade" class="main">
  <!-- [ EL TÍTULO ] -->
  <h1>Lestrade</h1>
  <nav id="category-selector">
  @foreach($definitions as $definition)
    @if(in_array($definition->name, $categories))
     <span class="active-order"></span>
     <a href="#" data-trigger="{{$definition->name}}">
     {{$definition->full_name}}</a>
    @endif
  @endforeach 
  </nav>

  <div id="the-basic-graphics"></div>

  <!-- Las categorías -->
  <section id="the-stuff"></section>
</div>

<script>
var TRUSTS_DATA = {
  trust_array : <?php echo json_encode($trusts); ?>,
  categories  : <?php echo json_encode($categories); ?>,
  definitions : <?php echo json_encode($definitions); ?>
};
</script>
<!-- LA APP -->
<script data-main="/js/apps/lestrade/main" src="/js/bower_components/requirejs/require.js"></script> 
</body>
</html>