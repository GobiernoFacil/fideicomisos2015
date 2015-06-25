var 
		menuRight = $('#fide-menu-s2'),
		showRightPush = $( '#showRightPush' ),
		body = document.body;
			
		showRightPush.on('click', function() {
			console.log("hola");
			$(this).toggleClass( 'active' );
			$(body).toggleClass( 'fide-menu-push-toleft' );
			$(menuRight).toggleClass( 'fide-menu-open' );
		});
var cbpAnimatedHeader=(function(){
	
	/*
	var bodyclass = $("body").attr("class"),
		header_a  = 30;
	
	if (bodyclass == "home fide-menu-push") {
		header_a = 170
	}
	*/
	var b=document.documentElement,
		g=$(".top-header"),
		e=false,
		a=60;

	function f(){
		window.addEventListener("scroll",function(h){
			if(!e){e=true;setTimeout(d,250)}},false)
		}
	function d(){
		var h=c();
		if(h>=a){
			g.addClass("header-shrink");
		}
		else{
			g.removeClass("header-shrink")
		}
		
		e=false }
		
	function c(){
		return window.pageYOffset||b.scrollTop}
	
	f()})();