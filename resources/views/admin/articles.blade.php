<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Artículos</title>
</head>
<body>
<h1>Artículos</h1>
<ul>
  @foreach($articles as $article)
  <li><a href="{{url('articles/update/' . $article->id)}}">{{$article->title}}</a></li>
  @endforeach
</ul>

<p><a href="{{url('articles/add/')}}">crear nuevo artículo</a></p>
</body>
</html>