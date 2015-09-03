<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Artículos</title>
  <link rel="stylesheet" type="text/css"  href="/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="/css/styles.css" />
  <link rel="stylesheet" type="text/css" href="/css/quill/quill.base.css" />
  <link rel="stylesheet" type="text/css" href="/css/quill/quill.snow.css" />
  <link rel="stylesheet" type="text/css" href="/css/dev.css" />
  <!-- img uploader -->
  <link rel="stylesheet" type="text/css" href="/js/bower_components/dropzone/dist/basic.css">
  <link rel="stylesheet" type="text/css" href="/js/bower_components/dropzone/dist/dropzone.css">
</head>
<body class="post edit">
<nav class="breadcrumb admin">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="{{url('articles')}}" class="back_admin">Regresar a los Artículos</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
<!-- EL HEADER CON LA INFO PRINCIPAL -->
<div class="publicar-articulo btn_link">{{$article->public ? 'Ocultar' : 'Publicar'}}</div>
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
        Agregar Contenido:
        <select name="type">
          <option value="h2">Título Nivel 2</option>
          <option value="h3">Título Nivel 3</option>
          <option value="p">Texto</option>
          <option value="lq">Cita izquierda</option>
          <option value="rq">Cita derecha</option>
          <option value="yt">Youtube</option>
          <option value="img">Imágenes</option>
          <option value="graph1">Gráfica 1</option>
          <option value="graph2">Gráfica 2</option>
          <option value="graph3">Gráfica 3</option>
        </select>
        <input type="submit" value="agregar" class="btn_link">
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
    uploads : "/images/articles/",
    content : <?php echo json_encode($content->toArray()); ?>
  };
</script>
<script data-main="/js/apps/adler/main" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>