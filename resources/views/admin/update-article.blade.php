<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Artículos</title>
  <link rel="stylesheet" type="text/css"  href="/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="/css/styles.css" />
  <link rel="stylesheet" type="text/css" href="/css/dev.css" />
</head>
<body class="post">


<div class="publicar-articulo">Publicar</div>
<article>
  <header>
    <div class="likeaboss">
      <figure>
        <img src="/images/articles/{{$article->image}}">
      </figure>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <a href="#" class="category">Bicentenario</a>
          <h1>{{$article->title}}</h1>
          <h2>{{$article->subtitle}}</h2>
          <p> <span>17/abril/2015</span> | {{$article->author_name}} </p>
          <div><a href="#" class="category">Cambiar imagen</a></div>
        </div>
      </div>
    </div>
  </header>
</article>

<!-- LA APP -->
<script>
  var CONFIG_DATA = {
    token   : "{{csrf_token()}}",
    article : <?php echo json_encode($article); ?>,
    uploads : "/images/articles/" 
  };
</script>
<script data-main="/js/apps/adler/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>