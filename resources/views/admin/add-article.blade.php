<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Artículos</title>
</head>
<body>
  <h1>Crear Artículo</h1>

  <form enctype="multipart/form-data" method="POST" action="{{url('articles/add')}}">
    {!! csrf_field() !!}
    <p>{{csrf_token()}}</p>
    <p>título    : <input name="title"></p>
    <p>subtítulo : <input name="subtitle"></p>
    <p>Autor     : <input name="author_name"></p>
    <p>Portada   : <input type="file" name="image"></p>

    <p><input type="submit" value="crear artículo"></p>
  </form>
</body>
</html>