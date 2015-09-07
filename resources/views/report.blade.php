<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<figure>
  <img src="{{$file_url . $article->image}}">
</figure>
<h1>{{$article->title}}</h1>
<h2>{{$article->subtitle}}</h2>
<h3>{{$article->author_name}}</h3>
<h4>{{$article->lead}}</h4>
<h5>
  <?php 
  $date = strtotime($article->created_at);
  $str  =  date('d x Y', $date); 
  echo str_replace('x', $months[date('n', $date)], $str);
  ?>
</h5>
</body>
</html>