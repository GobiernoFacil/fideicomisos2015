<!DOCTYPE html>
<html>
<head>
  <title></title>
  <link rel="stylesheet" type="text/css" href="/css/dev.css">
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

@foreach($contents as $content)
  
  @if(in_array($content->type, ['graph1','graph2','graph3']))
    <section class="{{$content->type}} enable-d3" data-content="{{$content->content}}">
    </section>
  @elseif($content->type == "img")
    <section class="{{$content->type}}">
      <?php $imgs = explode(',', $content->content); ?>
      <ul>
      @foreach($imgs as $img)
        <li><img src="{{$file_url . $img}}"></li>
      @endforeach
      </ul>
    </section>
  @else
    <section class="{{$content->type}}">
      <?php echo $content->content; ?>
    </section>
  @endif
  
@endforeach

<script data-main="/js/apps/adler/main-front" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>