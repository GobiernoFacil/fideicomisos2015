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

<!-- EL HEADER CON LA INFO PRINCIPAL -->
<div class="publicar-articulo">{{$article->public ? 'Ocultar' : 'Publicar'}}</div>
<article>
  <header>
    <div class="likeaboss">
      <figure>
        <img src="/images/articles/{{$article->image}}">
      </figure>
    </div>
    <div class="container">
      <div class="row main-fields">
        <div class="col-sm-10 col-sm-offset-1">
          <a href="#" class="category">Bicentenario</a>
          <h1><span data-field="title" class="input">{{$article->title}}</span></h1>
          <h2><span data-field="subtitle" class="input">{{$article->subtitle}}</span></h2>
          <p> 
            <span>17/abril/2015</span> | 
            <span data-field="author_name" class="input">{{$article->author_name}}</span>
          </p>
          <div><a href="#" class="category">Cambiar imagen</a></div>
        </div>
      </div>
    </div>
  </header>

<!-- EL CONTENIDO DEL CHISME ESTE -->
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2" id="content-container">
        <!-- LEAD -->
        <p class="lead">
        <span data-field="lead" class="input">
          {{empty($article->lead)? "Editar" : $article->lead}}
        </span>
        </p>

        <!-- ADD MORE CONTENT -->
        <form id="add-more-content">
        <p>
        <select name="type">
          <option value="h2">título lv.2</option>
          <option value="h3">título lv.3</option>
          <option value="p">texto</option>
          <option value="lq">cita izquierda</option>
          <option value="rq">cita derecha</option>
          <!--<option value="img">foto</option>
          <option value="carousell">Carrusel</option>
          <option value="graph">Gráfica</option>
          <option value="youtube">Youtube</option>
          -->
        </select>
        <input type="submit" value="agregar">
        </p>
        </form>

      </div>
    </div>
  </div>

  <!-- Create the toolbar container
<div id="toolbar">
  <button class="ql-bold">Bold</button>
  <button class="ql-italic">Italic</button>
  <span title="Link" class="ql-format-button ql-link">anchor</span>
</div>
 -->
<!-- Create the editor container
<div id="editor">
  <div>Hello World!</div>
</div>
 -->
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