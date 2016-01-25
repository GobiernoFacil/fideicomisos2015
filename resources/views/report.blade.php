@extends('layouts.master')
@section('body_class', 'post')

@section('title',  $article->title)
@section('description', $article->title. ' ' .$article->subtitle )

@section('content')
<div class="main">
	<nav class="breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ul>
						<li><a href="/">Inicio</a>
						<li><a href="/reportajes">Reportajes</a></li>
						<li>{{$article->title}}</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</div>
<!-- ends breadcrumb-->
<article>
	<header>
		<div class="likeaboss">
			<figure>
				 <img src="{{$file_url . $article->image}}">
			</figure>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<a class="category">Fideicomiso</a>
				<h1>{{$article->title}}</h1>
				<h2>{{$article->subtitle}}</h2>
				<p> <span><?php 
  $date = strtotime($article->created_at);
  $str  =  date('d x Y', $date); 
  echo str_replace('x', $months[date('n', $date)], $str);
  ?></span> | {{$article->author_name}} </p>
  @if( $article->id =="4") 
																 <img class="lgoFundar" src="{{ URL::asset('/images/LogoFundar.png') }}" alt="Fundar">
								@endif
				</div>
			</div>
		</div>
	</header>

	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<p class="lead">{{$article->lead}}</p>
				@foreach($contents as $content)
					@if(in_array($content->type, ['graph1','graph2','graph3']))
					  <div class="{{$content->type}} enable-d3" data-content="{{$content->content}}">
					  </div>
					@elseif($content->type == "img")
					  <div class="{{$content->type}}">
					    <?php $imgs = explode(',', $content->content); ?>
					    <ul>
					    @foreach($imgs as $img)
					      <li  class="liste_des_images"><img src="{{$file_url . $img}}"></li>
					    @endforeach
					    </ul>
					  </div>
					@else
						@if($content->type=="lq" || $content->type=="rq")
						<div class="columna_frase {{$content->type}}">
						  <p class="lafrase"><?php echo $content->content; ?></p>
						</div>
						
						@else
						<div class="{{$content->type}}">
						  <?php echo $content->content; ?>
						</div>
					  	@endif
					@endif
				@endforeach
			</div>
		</div>
	</div>
</article>

<!--comentarios-->
<div class="divider"></div>
	<div class="container">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<h3>Comentarios</h3>
				<div id="disqus_thread"></div>
				<script type="text/javascript">
	    /* * * CONFIGURATION VARIABLES * * */
	    var disqus_shortname = 'cajasnegras';
	    
	    /* * * DON'T EDIT BELOW THIS LINE * * */
	    (function() {
	        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();
	</script>
				<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
			</div>
		</div>
	</div>




<script data-main="/js/apps/adler/main-front" src="/js/bower_components/requirejs/require.js"></script>
</body>
</html>
