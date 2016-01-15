function onFrame(event) {

}

$('#buscador').val('');

$('#buscador').focus(
    function(){
        $(this).val('');
    });

$('#buscador').click(
    function(){
        $(this).val('');
    });

var margin = {left:20, right:20, bottom: 50, top: 50},
	widthdiv = parseInt(d3.select("#vis1").style("width"),10);

var width = widthdiv - margin.left - margin.right;
var	height = (width * 0.45) - margin.top - margin.bottom;

if(widthdiv < 768){height = (width * 1.6) - margin.top - margin.bottom;};

var colordis = "#34214d";
var coloring = "#6e5f8b";
var colorren = "#bcb3e5";
var coloregr = "#85baa1";

var colordis = "#80617F";
var coloring = "#A57D6B";
var colorren = "#D19D49";
var coloregr = "#B02938";

var colordis = "#1C5DA7";
var coloring = "#2177AB";
var colorren = "#07B1BE";
var coloregr = "#85baa1";

var format = d3.format("$,.2f");

var anesca = d3.scale.ordinal()
	.domain(["2006","2007","2008","2009","2010","2011","2012","2013","2014"])
	.rangeRoundBands([width*1/4*0.3,width*3/4],0.15);

var baesca = d3.scale.linear()
	.range([height,0]);

var xaxis = d3.svg.axis().scale(anesca);
var yaxis = d3.svg.axis().scale(baesca).orient("left");

var svg = d3.select("#vis1").append("svg").attr("class","svgb")
			.attr("width",0)
			.attr("height",0)
			.append("g")
			.attr("class","mainpl")
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

var barras = svg.append("g")
	.attr("class","barras");

d3.select("#bloodhound").attr("class","vertical-center");

/*barras.append("text")
	.attr("class","nodate")
	.attr("x",anesca("2010"))
	.attr("y",height*0.5)
	.style("font-size",width/60 + "px")
	.style("text-anchor","middle")
	.style("fill",colordis)
	.text("Para comenzar busque un fideicomiso en el buscador");*/

d3.json("./datos/Full2014.json",function(error,landata){

	lanas = landata;

	var states = [];

	for (var i=0, len=lanas.length;i < len;i++){
		states.push(lanas[i].Designacion);
	}

	m = d3.map(lanas,function(d){return d.Designacion;});

	var states = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: $.map(states, function(state) {return {value: state}; })
	});

	states.initialize();

	$('#bloodhound .typeahead').typeahead({
  		hint: true,
  		highlight: true,
  		minLength: 1
	},
	{
  		name: 'states',
  		displayKey: 'value',
  		source: states.ttAdapter(),
  		templates: {
    	empty: [
      		'<div class="empty-message">',
      		'No hay ninguna coincidencia con los fideicomisos',
      		'</div>'
    	].join('\n')}
	});

	$('.twitter-typeahead').css("display","block");

	var widthva = $('.twitter-typeahead').css("width");

	$('.tt-dropdown-menu').css("width",widthva);

	$('#bloodhound .typeahead')
	.on('typeahead:selected', function (e,datum){
		if(widthdiv < 768){
			plottermv(e,datum)}
		else{plotter(e,datum)}
	});

})

function labelpl(){

	d3.select(".barrasl").remove();

	var label = svg.append("g")
	.attr("class","barrasl");

	var scw = 3.5/4;
	var scs = 0.2;

	label.append("text")
		.attr("class","labte")
		.attr("x",width*scw)
		.attr("y",height*(1-scs*2.8))
		.style("text-anchor","middle")
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("¿Cómo leer esta gráfica?");

	label.append("text")
		.attr("class","labte")
		.attr("x",width*scw)
		.attr("y",height*(1-scs*2.55))
		.style("text-anchor","middle")
		.style("font-size",width/110 + "px")
		.style("fill","#686868")
		.text("Cada conjunto de barras muestra el monto")
		.append("tspan")
		.attr("x",width*scw)
		.attr("y",height*(1-scs*2.40))
		.text("correspondiente a los movimientos financieros")
		.append("tspan")
		.attr("x",width*scw)
		.attr("y",height*(1-scs*2.25))
		.text("que hubo en el fideicomiso ese año.");

	label.append("rect")
		.attr("class","barldis")
		.attr("x",width*scw - anesca.rangeBand()/2)
		.attr("y",height*(1-scs*1))
		.attr("width",anesca.rangeBand()/2)
		.attr("height",height*scs)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",colordis);

	label.append("line")
		.attr("x1",width*scw - anesca.rangeBand()*1.5)
		.attr("x2",width*scw - anesca.rangeBand()*0.5)
		.attr("y1",height*(1-scs*1*0.5))
		.attr("y2",height*(1-scs*1*0.5))
		.style("stroke",colordis)
		.style("stroke-width","0.7")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw - anesca.rangeBand()*1.0)
		.attr("y",height*(1-scs*1*0.50-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/110 + "px")
		.style("fill",colordis)
		.text("Disponible");

	label.append("rect")
		.attr("class","barling")
		.attr("x",width*scw - anesca.rangeBand()/2)
		.attr("y",height*(1-scs*1.5))
		.attr("width",anesca.rangeBand()/2)
		.attr("height",height*scs*0.5)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",coloring);

	label.append("line")
		.attr("x1",width*scw - anesca.rangeBand()*1.5)
		.attr("x2",width*scw - anesca.rangeBand()*0.5)
		.attr("y1",height*(1-scs*1.5+scs*0.5*0.5))
		.attr("y2",height*(1-scs*1.5+scs*0.5*0.5))
		.style("stroke",coloring)
		.style("stroke-width","0.7")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw - anesca.rangeBand()*1.0)
		.attr("y",height*(1-scs*1.5+scs*0.5*0.50-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/110 + "px")
		.style("fill",coloring)
		.text("Ingresos");

	label.append("rect")
		.attr("class","barlren")
		.attr("x",width*scw - anesca.rangeBand()/2)
		.attr("y",height*(1-scs*2))
		.attr("width",anesca.rangeBand()/2)
		.attr("height",height*scs*0.5)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",colorren);

	label.append("line")
		.attr("x1",width*scw - anesca.rangeBand()*1.5)
		.attr("x2",width*scw - anesca.rangeBand()*0.5)
		.attr("y1",height*(1-scs*2+scs*0.5*0.5))
		.attr("y2",height*(1-scs*2+scs*0.5*0.5))
		.style("stroke",colorren)
		.style("stroke-width","0.7")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw - anesca.rangeBand()*1.0)
		.attr("y",height*(1-scs*2+scs*0.5*0.5-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/110 + "px")
		.style("fill",colorren)
		.text("Rendimientos");

	label.append("rect")
		.attr("class","barlegr")
		.attr("x",width*scw)
		.attr("y",height*(1-scs*2))
		.attr("width",anesca.rangeBand()/2)
		.attr("height",height*scs*0.75)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",coloregr);

	label.append("line")
		.attr("x1",width*scw + anesca.rangeBand()*1.5)
		.attr("x2",width*scw + anesca.rangeBand()*0.5)
		.attr("y1",height*(1-scs*2+scs*0.75*0.5))
		.attr("y2",height*(1-scs*2+scs*0.75*0.5))
		.style("stroke",coloregr)
		.style("stroke-width","0.7")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw + anesca.rangeBand()*1.0)
		.attr("y",height*(1-scs*2+scs*0.75*0.5-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/110 + "px")
		.style("fill",coloregr)
		.text("Egresos");	

}

function labelplv(){

	d3.select(".barrasl").remove();

	var label = svg.append("g")
	.attr("class","barrasl");

	var scw = 2.2/4;
	var scs = 0.2;

	label.append("text")
		.attr("class","labte")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*2.8))
		.style("text-anchor","middle")
		.style("font-size",height/40 + "px")
		.style("fill","#686868")
		.text("¿Cómo leer esta gráfica?");

	label.append("text")
		.attr("class","labte")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*2.59))
		.style("text-anchor","middle")
		.style("font-size",height/50 + "px")
		.style("fill","#686868")
		.text("Las barras muestran el monto")
		.append("tspan")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*2.44))
		.text("correspondiente a los")
		.append("tspan")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*2.29))
		.text("movimientos financieros que")
		.append("tspan")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*2.14))
		.text("hubo en el fideicomiso ese año.");

	label.append("rect")
		.attr("class","barldis")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()/4)
		.attr("y",height*(1-scs*1))
		.attr("width",anesca.rangeBand()/4)
		.attr("height",height*scs)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",colordis);

	label.append("line")
		.attr("x1",width*scw + width*1.7/8 - anesca.rangeBand()*0.75)
		.attr("x2",width*scw + width*1.7/8 - anesca.rangeBand()*0.25)
		.attr("y1",height*(1-scs*1*0.5))
		.attr("y2",height*(1-scs*1*0.5))
		.style("stroke",colordis)
		.style("stroke-width","1.0")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()*0.5)
		.attr("y",height*(1-scs*1*0.50-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/40 + "px")
		.style("fill",colordis)
		.text("Disponible");

	label.append("rect")
		.attr("class","barling")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()/4)
		.attr("y",height*(1-scs*1.5))
		.attr("width",anesca.rangeBand()/4)
		.attr("height",height*scs*0.5)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",coloring);

	label.append("line")
		.attr("x1",width*scw + width*1.7/8 - anesca.rangeBand()*0.75)
		.attr("x2",width*scw + width*1.7/8 - anesca.rangeBand()*0.25)
		.attr("y1",height*(1-scs*1.5+scs*0.5*0.5))
		.attr("y2",height*(1-scs*1.5+scs*0.5*0.5))
		.style("stroke",coloring)
		.style("stroke-width","1.0")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()*0.5)
		.attr("y",height*(1-scs*1.5+scs*0.5*0.50-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/40 + "px")
		.style("fill",coloring)
		.text("Ingresos");

	label.append("rect")
		.attr("class","barlren")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()/4)
		.attr("y",height*(1-scs*1.9))
		.attr("width",anesca.rangeBand()/4)
		.attr("height",height*scs*0.5)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",colorren);

	label.append("line")
		.attr("x1",width*scw + width*1.7/8 - anesca.rangeBand()*0.75)
		.attr("x2",width*scw + width*1.7/8 - anesca.rangeBand()*0.25)
		.attr("y1",height*(1-scs*1.9+scs*0.5*0.5))
		.attr("y2",height*(1-scs*1.9+scs*0.5*0.5))
		.style("stroke",colorren)
		.style("stroke-width","1.0")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw + width*1.7/8 - anesca.rangeBand()*0.5)
		.attr("y",height*(1-scs*1.9+scs*0.5*0.5-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/40 + "px")
		.style("fill",colorren)
		.text("Rendimientos");

	label.append("rect")
		.attr("class","barlegr")
		.attr("x",width*scw + width*1.7/8)
		.attr("y",height*(1-scs*1.9))
		.attr("width",anesca.rangeBand()/4)
		.attr("height",height*scs*0.75)
		.style("stroke","black")
		.style("stroke-width",0.5)
		.style("fill",coloregr);

	label.append("line")
		.attr("x1",width*scw + width*1.7/8 + anesca.rangeBand()*0.75)
		.attr("x2",width*scw + width*1.7/8 + anesca.rangeBand()*0.25)
		.attr("y1",height*(1-scs*1.9+scs*0.75*0.5))
		.attr("y2",height*(1-scs*1.9+scs*0.75*0.5))
		.style("stroke",coloregr)
		.style("stroke-width","1.0")
		.style("stroke-dasharray","5,2");

	label.append("text").attr("class","labte")
		.attr("x",width*scw + width*1.7/8 + anesca.rangeBand()*0.5)
		.attr("y",height*(1-scs*1.9+scs*0.75*0.5-scs*0.05))
		.style("text-anchor","middle")
		.style("font-size",width/40 + "px")
		.style("fill",coloregr)
		.text("Egresos");	


}

//function strbtf(stringa) {return stringa.charAt(0) + stringa.slice(1).toLowerCase();}
function strbtf(stringa) {return stringa;}

function htlp(datum){

	d3.select(".fidata").remove();
	d3.select(".fndata").remove();
	d3.select(".fudata").remove();

	var fidata = d3.select("#desi").append("g").attr("class","fidata");
	var fndata = d3.select("#desf").append("g").attr("class","fndata");
	var fudata = d3.select("#desu").append("g").attr("class","fudata");

	fidata.append("h1").attr("class","textadeh text-center").html(strbtf(datum.Designacion));

	fidata.append("hr");

	fidata.append("h3").attr("class","textadep").html("Objetivo del fideicomiso");

	var obje = fidata.append("p").attr("class","textadep");

	obje.append("span").attr("class","datoob").html(strbtf(datum.Objetivo));


	fidata.append("hr");

	fidata.append("h3").attr("class","textadep").html("Movimientos financieros");

	fidata.append("p").html("La siguiente gráfica muestra la información financiera del fideicomiso desde 2006 a 2014 de acuerdo a datos de la Secretaría de Hacienda y Crédito Público. Cada conjunto de barras muestra el monto correspondiente a los movimientos financieros del fideicomiso durante ese año.");

	fildl = fidata.append("dl");

	fildl.append("dt").html("Ingresos");
	fildl.append("dd").html("Es el dinero con el que se abrió o se siguió depositando a la cuenta del fideicomiso");

	fildl.append("dt").html("Disponible");
	fildl.append("dd").html("Es el dinero que se encuentra, como dice la palabra, disponible en el momento en que se reportó la información financiera");

	fildl.append("dt").html("Rendimientos");
	fildl.append("dd").html("Es el dinero que se acumula, gracias a que el dinero en el banco genera intereses a favor de quien abrió el fideicomiso");

	fildl.append("dt").html("Egresos");
	fildl.append("dd").html(" Es el dinero que se retiró de la cuenta del fideicomiso");

	if(widthdiv >= 768){fidata.append("p").html("Pasa el cursor por cada barra para leer los detalles por año de este fideicomiso.")};

	fndata.append("hr");

	fndata.append("h3").attr("class","textadep").html("Datos iniciales");

	var regi = fndata.append("p").attr("class","textadep");

	regi.append("span").append("strong").html("Registro: ");
	regi.append("span").attr("class","datoin").html(datum.Registro);

	var inif = fndata.append("p").attr("class","textadep");

	inif.append("span").append("strong").html("Fecha de inicio: ");
	inif.append("span").attr("class","datoin").html(strbtf(datum.Fecha_Inicio));

	var monti = fndata.append("p").attr("class","textadep");

	monti.append("span").append("strong").html("Monto inicial: ");
	monti.append("span").attr("class","datoin").html(format(strbtf(datum.Monto_Inicial)));

	fndata.append("hr");

	fndata.append("h3").attr("class","textadep").html("Partes involucradas");

	var fidei = fndata.append("p").attr("class","textadep");

	fidei.append("span").append("strong").html("Fideicomitente: ");
	fidei.append("span").attr("class","datoin").html(strbtf(datum.Fideicomitente));

	var fiduc = fndata.append("p").attr("class","textadep");

	fiduc.append("span").append("strong").html("Fiduciario: ");
	fiduc.append("span").attr("class","datoin").html(strbtf(datum.Fiduciario));

	var coord = fndata.append("p").attr("class","textadep");

	coord.append("span").append("strong").html("Coordinador: ");
	coord.append("span").attr("class","datoin").html(strbtf(datum.Coordinador));

	fndata.append("hr");

	fndata.append("h3").attr("class","textadep").html("Clasificación del fideicomiso");

	var tipo = fndata.append("p").attr("class","textadep");

	tipo.append("span").append("strong").html("Tipo: ");
	tipo.append("span").attr("class","datoin").html(strbtf(datum.Tipo));

	var ramo = fndata.append("p").attr("class","textadep");

	ramo.append("span").append("strong").html("Ramo: ");
	ramo.append("span").attr("class","datoin").html(strbtf(datum.Ramo));

	var ambit = fndata.append("p").attr("class","textadep");

	ambit.append("span").append("strong").html("Ambito: ");
	ambit.append("span").attr("class","datoin").html(strbtf(datum.Ambito));

	var tema = fndata.append("p").attr("class","textadep");

	tema.append("span").append("strong").html("Tema: ");
	tema.append("span").attr("class","datoin").html(strbtf(datum.Tema));

	fndata.append("hr");

	fudata.append("h3").attr("class","textadep").html("Observaciones y Reporte por año");

	var butgr = fudata.append("div").attr("class","text-center buts")
				.append("div")
				.attr("class","btn-group")
				.attr("role","group")
				.attr("aria-label","...");

	evodat = datum.Evolucion;
	yein = 0;

	butgr.append("button").attr("type","button").attr("class","btn btn-default")
		.html("&larr;")
		.on("click",bapr);

	butgr.append("button").attr("type","button").attr("class","btn btn-default midbt").html(evodat[yein].Año);

	butgr.append("button").attr("type","button").attr("class","btn btn-default")
		.html("&rarr;")
		.on("click",fopr);

	obrep(evodat,yein);
}


function bapr(){
	if(evodat.length == 0 || yein == 0){
		return yein;
	}

	obrep(evodat,yein - 1);
	yein = yein - 1;
}

function fopr(){
	if(evodat.length == 0 || yein == (evodat.length - 1)){
		return yein;
	}

	obrep(evodat,yein + 1);
	yein = yein + 1;
}

function obrep(nedat,ind){

	d3.select(".obsg").remove();
	d3.select(".cumg").remove();
	d3.select(".fudata").select("hr").remove();

	d3.select(".midbt").html(nedat[ind].Año);

	var obsg = d3.select(".fudata").append("g").attr("class","obsg");

	obsg.append("p").attr("class","textadep").append("strong").html("Observaciones: ");
	obsg.append("p").attr("class","textadep").html(strbtf(nedat[ind].Observaciones));

	var cumg = d3.select(".fudata").append("g").attr("class","cumg");

	cumg.append("p").attr("class","textadep").append("strong").html("Reporte del cumplimiento: ");
	cumg.append("p").attr("class","textadep").html(strbtf(nedat[ind].Reporte_Cumplimiento));

	d3.select(".fudata").append("hr");

}

function plottermv(e,datum){
	d3.select(".svgb").attr("width",width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

	d3.select("#bloodhound").attr("class","");

	var ndata = m.get(datum.value);

	htlp(ndata);

	var data = ndata.Evolucion;
	var code = ndata.Registro;
	var inic = ndata.Monto_Inicial;

	var lanbar = barajeador(data);
	var maxra = maximer(lanbar);

	var scw = 2.2/4;
	var scs = 0.2;

	baesca.domain([0,maxra]);

	var yeine = 0;
	var anomv = data[yeine].Año;
	//var anomv = "2038";

	var butgre = d3.select(".fidata").append("div").attr("class","text-center ")
				.append("div")
				.attr("class","btn-group")
				.attr("role","group")
				.attr("aria-label","...");

	butgre.append("button").attr("type","button").attr("class","btn btn-default")
		.html("&larr;")
		.on("click",bapre);

	butgre.append("button").attr("type","button").attr("class","btn btn-default midbte").html(anomv);

	butgre.append("button").attr("type","button").attr("class","btn btn-default")
		.html("&rarr;")
		.on("click",fopre);

	function bapre(){
	if(data.length == 0 || yeine == 0){
		return yeine;
	}

	var anomv = data[yeine - 1].Año;
	plotmv(anomv,lanbar);
	yeine = yeine - 1;
	}

	function fopre(){
	if(data.length == 0 || yeine == (data.length - 1)){
		return yeine;
	}

	var anomv = data[yeine + 1].Año;
	plotmv(anomv,lanbar);
	yeine = yeine + 1;
}

	plotmv(anomv,lanbar);

	function plotmv(yean,lanbar){

		d3.select(".midbte").html(yean);

		d3.select(".mainlab").remove();

		var mainl = svg.append("g")
			.attr("class","mainlab");

		mainl.append("line")
			.attr("x1",width*scw)
			.attr("x2",width*scw + width*1.7/4)
			.attr("y1",height*0.15)
			.attr("y2",height*0.15)
			.style("stroke",colordis)
			.style("stroke-width","1.7");

		mainl.append("line")
			.attr("x1",width*scw)
			.attr("x2",width*scw + width*1.7/4)
			.attr("y1",height*0.35)
			.attr("y2",height*0.35)
			.style("stroke",colordis)
			.style("stroke-width","1.7");

		mainl.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*1.6/4)
			.attr("y",height*0.34)
			.style("text-anchor","end")
			.style("font-size",width/40 + "px")
			.style("fill","#686868")
			.text("en Millones de Pesos");

		d3.select(".xaxis").remove();
		d3.select(".yaxis").remove();

		anesca.domain([yean])
			.rangeRoundBands([width*1/4*0.3,width*2/4],0.15);

		labelplv();

		xaxisg = svg.append("g").attr("class","xaxis")
			.attr("transform","translate(0," + height*1.02 +")")
			.call(xaxis);

		xaxisg.selectAll("text").attr("class","axislab")
			.style("font-size",width/30 + "px")
			.style("fill","#282828");

		xaxisg.select("path")
			.style("stroke","#DADADA")
			.style("fill","none");

		yaxisg = svg.append("g").attr("class","yaxis")
			.attr("transform","translate(" + width*1/4*0.25 +",0)")
			.call(yaxis);

		yaxisg.selectAll("text").attr("class","axislab")
			.style("font-size",width/30 + "px")
			.style("fill","#282828");

		yaxisg.select("path")
			.style("stroke","#DADADA")
			.style("fill","none");

		yaxisg.append("text").attr("class","axislab")
			.attr("x",0)
			.attr("y",0)
			.attr("transform","rotate(-90)")
			.attr("dy","1.1em")
			.style("font-size",width/30 + "px")
			.style("text-anchor","end")
			.style("fill","#686868")
			.text("Millones de pesos");

		d3.select(".barras").remove();

		var barras = svg.append("g")
			.attr("class","barras");

		var wst = 0.5;
		var wsc = "black";

		var nlanbar = lanbar.filter(function(ar){return ar.ano === yean});

		barras.selectAll(".bardis")
			.data(nlanbar)
			.enter().append("rect")
			.attr("class","bardis")
			.attr("x",function(d){return anesca(d.ano);})
			.attr("y",function(d){return baesca(d.dis[1]);})
			.attr("width",function(d){return anesca.rangeBand()/2;})
			.attr("height",function(d){return baesca(d.dis[0]) - baesca(d.dis[1]);})
			.style("stroke",wsc)
			.style("stroke-width",wst)
			.style("fill",colordis);

		barras.selectAll(".baring")
			.data(nlanbar)
			.enter().append("rect")
			.attr("class","baring")
			.attr("x",function(d){return anesca(d.ano);})
			.attr("y",function(d){return baesca(d.ing[1]);})
			.attr("width",function(d){return anesca.rangeBand()/2;})
			.attr("height",function(d){return baesca(d.ing[0]) - baesca(d.ing[1]);})
			.style("stroke",wsc)
			.style("stroke-width",wst)
			.style("fill",coloring);

		barras.selectAll(".barren")
			.data(nlanbar)
			.enter().append("rect")
			.attr("class","barren")
			.attr("x",function(d){return anesca(d.ano);})
			.attr("y",function(d){return baesca(d.ren[1]);})
			.attr("width",function(d){return anesca.rangeBand()/2;})
			.attr("height",function(d){return baesca(d.ren[0]) - baesca(d.ren[1]);})
			.style("stroke",wsc)
			.style("stroke-width",wst)
			.style("fill",colorren);

		barras.selectAll(".baregr")
			.data(nlanbar)
			.enter().append("rect")
			.attr("class","baregr")
			.attr("x",function(d){return anesca(d.ano) + anesca.rangeBand()/2;})
			.attr("y",function(d){return baesca(d.egr[0]);})
			.attr("width",function(d){return anesca.rangeBand()/2;})
			.attr("height",function(d){return baesca(d.egr[1]) - baesca(d.egr[0]);})
			.style("stroke",wsc)
			.style("stroke-width",wst)
			.style("fill",coloregr);

		if (nlanbar.length != 0) {labelermv(nlanbar[0])};

		if (nlanbar.length == 0) {

			d3.select(".mainlab").remove();
			d3.select(".barrasl").remove();

			barras.append("g").attr("transform","translate(" + width*1/4*1.1 +","+ height*0.5 +")")
				.append("g").attr("transform","rotate(-90)")
				.append("text")
				.attr("class","nodate")
				.attr("x",0)
				.attr("y",0)
				.style("font-size",width/20 + "px")
				.style("text-anchor","middle")
				.style("fill",colordis)
				.text("Este fideicomiso no presentó")
				.append("tspan")
				.attr("x",0)
				.attr("y",height*0.04)
				.text("movimientos financieros en " + yean)
				.style("fill",colordis)
				.style("font-size",width/20 + "px");

		};

		console.log(maxra);

		if (maxra == 0) {

			d3.select(".mainlab").remove();
			d3.select(".barrasl").remove();

			barras.append("g").attr("transform","translate(" + width*1/4*1.1 +","+ height*0.5 +")")
				.append("g").attr("transform","rotate(-90)")
				.append("text")
				.attr("class","nodate")
				.attr("x",0)
				.attr("y",0)
				.style("font-size",width/20 + "px")
				.style("text-anchor","middle")
				.style("fill",colordis)
				.text("Este fideicomiso no presentó")
				.append("tspan")
				.attr("x",0)
				.attr("y",height*0.04)
				.text("movimientos financieros de 2006 a 2014")
				.style("fill",colordis)
				.style("font-size",width/20 + "px");

		};

	}

	function labelermv(d){

		d3.select(".mainte").remove();

		var maint = d3.select(".mainlab").append("g")
			.attr("class","mainte");

		var esp = 0.035

		maint.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*0.1/4)
			.attr("y",height*0.19 + height*esp*0)
			.style("font-size",width/30 + "px")
			.style("fill","#686868")
			.text("Disponible: ")
			.append("tspan")
			.text(function(){return format(d.dis[1]-d.dis[0])})
			.style("fill",colordis)
			.style("font-size",width/30 + "px");

		maint.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*0.1/4)
			.attr("y",height*0.19 + height*esp*1)
			.style("font-size",width/30 + "px")
			.style("fill","#686868")
			.text("Ingresos: ")
			.append("tspan")
			.text(function(){return format(d.ing[1]-d.ing[0])})
			.style("fill",colordis)
			.style("font-size",width/30 + "px");

		maint.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*0.1/4)
			.attr("y",height*0.19 + height*esp*2)
			.style("font-size",width/30 + "px")
			.style("fill","#686868")
			.text("Rendimientos: ")
			.append("tspan")
			.text(function(){return format(d.ren[1]-d.ren[0])})
			.style("fill",colordis)
			.style("font-size",width/30 + "px");

		maint.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*0.1/4)
			.attr("y",height*0.19 + height*esp*3)
			.style("font-size",width/30 + "px")
			.style("fill","#686868")
			.text("Egresos: ")
			.append("tspan")
			.text(function(){return format(d.egr[0]-d.egr[1])})
			.style("fill",colordis)
			.style("font-size",width/30 + "px");

		maint.append("text")
			.attr("class","labmte")
			.attr("x",width*scw + width*1.7/8)
			.attr("y",height*0.13)
			.style("text-anchor","middle")
			.style("font-size",height/10 + "px")
			.style("fill",colordis)
			.text(function(){return d.ano});

	}
}

function plotter(e,datum){

	d3.select(".svgb").attr("width",width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

	d3.select("#bloodhound").attr("class","");

	labelpl();

	var ndata = m.get(datum.value);

	htlp(ndata);

	var data = ndata.Evolucion;
	var code = ndata.Registro;
	var inic = ndata.Monto_Inicial;

	var lanbar = barajeador(data);
	var maxra = maximer(lanbar);

	var scw = 3.5/4;
	var scs = 0.2;

	baesca.domain([0,maxra]);

	d3.select(".mainlab").remove();

	var mainl = svg.append("g")
		.attr("class","mainlab");

	mainl.append("line")
		.attr("x1",width*scw - width*1/4*0.4)
		.attr("x2",width*scw + width*1/4*0.4)
		.attr("y1",height*0.05)
		.attr("y2",height*0.05)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	mainl.append("line")
		.attr("x1",width*scw - width*1/4*0.4)
		.attr("x2",width*scw + width*1/4*0.4)
		.attr("y1",height*0.35)
		.attr("y2",height*0.35)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	mainl.append("text")
		.attr("class","labmte")
		.attr("x",width*scw + width*1/4*0.37)
		.attr("y",height*0.335)
		.style("text-anchor","end")
		.style("font-size",width/120 + "px")
		.style("fill","#686868")
		.text("en Millones de Pesos");

	labelerm0();

	d3.select(".xaxis").remove();
	d3.select(".yaxis").remove();


	xaxisg = svg.append("g").attr("class","xaxis")
			.attr("transform","translate(0," + height*1.02 +")")
			.call(xaxis);

	xaxisg.selectAll("text").attr("class","axislab")
			.style("font-size",width/100 + "px")
			.style("fill","#282828");

	xaxisg.select("path")
		.style("stroke","#DADADA")
		.style("fill","none");

	yaxisg = svg.append("g").attr("class","yaxis")
			.attr("transform","translate(" + width*1/4*0.25 +",0)")
			.call(yaxis);

	yaxisg.selectAll("text").attr("class","axislab")
		.style("font-size",width/100 + "px")
		.style("fill","#282828");

	yaxisg.select("path")
		.style("stroke","#DADADA")
		.style("fill","none");

	yaxisg.append("text").attr("class","axislab")
		.attr("x",0)
		.attr("y",0)
		.attr("transform","rotate(-90)")
		.attr("dy","1.1em")
		.style("font-size",width/100 + "px")
		.style("text-anchor","end")
		.style("fill","#686868")
		.text("Millones de pesos");

	xaxisg.append("text").attr("class","axislab")
		.attr("x",width*3/4)
		.attr("y",0)
		.attr("dy","-0.4em")
		.style("font-size",width/100 + "px")
		.style("text-anchor","end")
		.style("fill","#686868")
		.text("Año");

	d3.select(".barras").remove();

	var barras = svg.append("g")
		.attr("class","barras");

	var wst = 0.5;
	var wsc = "black";

	barras.selectAll(".bardis")
		.data(lanbar)
		.enter().append("rect")
		.attr("class","bardis")
		.attr("x",function(d){return anesca(d.ano);})
		.attr("y",function(d){return baesca(d.dis[1]);})
		.attr("width",function(d){return anesca.rangeBand()/2;})
		.attr("height",function(d){return baesca(d.dis[0]) - baesca(d.dis[1]);})
		.style("stroke",wsc)
		.style("stroke-width",wst)
		.style("fill",colordis);

	barras.selectAll(".baring")
		.data(lanbar)
		.enter().append("rect")
		.attr("class","baring")
		.attr("x",function(d){return anesca(d.ano);})
		.attr("y",function(d){return baesca(d.ing[1]);})
		.attr("width",function(d){return anesca.rangeBand()/2;})
		.attr("height",function(d){return baesca(d.ing[0]) - baesca(d.ing[1]);})
		.style("stroke",wsc)
		.style("stroke-width",wst)
		.style("fill",coloring);

	barras.selectAll(".barren")
		.data(lanbar)
		.enter().append("rect")
		.attr("class","barren")
		.attr("x",function(d){return anesca(d.ano);})
		.attr("y",function(d){return baesca(d.ren[1]);})
		.attr("width",function(d){return anesca.rangeBand()/2;})
		.attr("height",function(d){return baesca(d.ren[0]) - baesca(d.ren[1]);})
		.style("stroke",wsc)
		.style("stroke-width",wst)
		.style("fill",colorren);

	barras.selectAll(".baregr")
		.data(lanbar)
		.enter().append("rect")
		.attr("class","baregr")
		.attr("x",function(d){return anesca(d.ano) + anesca.rangeBand()/2;})
		.attr("y",function(d){return baesca(d.egr[0]);})
		.attr("width",function(d){return anesca.rangeBand()/2;})
		.attr("height",function(d){return baesca(d.egr[1]) - baesca(d.egr[0]);})
		.style("stroke",wsc)
		.style("stroke-width",wst)
		.style("fill",coloregr);

	d3.select(".hova").remove();

	var hova = svg.append("g")
		.attr("class","hova");

	hova.selectAll(".hovas")
		.data(lanbar)
		.enter().append("rect")
		.attr("class","hovas")
		.attr("x",function(d){return anesca(d.ano);})
		.attr("y",function(d){return baesca(maxra);})
		.attr("width",function(d){return anesca.rangeBand()*1.2;})
		.attr("height",function(d){return baesca(0) - baesca(maxra);})
		.style("fill","white")
		.style("opacity",0)
		.on("mouseover",labelerm)
		.on("mouseout",labelerm0);

	if (maxra == 0) {

		barras.append("text")
			.attr("class","nodate")
			.attr("x",anesca("2010"))
			.attr("y",height*0.5)
			.style("font-size",width/60 + "px")
			.style("text-anchor","middle")
			.style("fill",colordis)
			.text("Este fideicomiso no presentó movimientos")
			.append("tspan")
			.attr("x",anesca("2010"))
			.attr("y",height*0.55)
			.text("financieros de 2006 a 2014.")
			.style("fill",colordis)
			.style("font-size",width/60 + "px");

	};

	function labelerm(d,i){
		
	d3.select(".mainte").remove();

	var maint = d3.select(".mainlab").append("g")
		.attr("class","mainte");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",height*0.11)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Disponible: ")
		.append("tspan")
		.text(function(){return format(d.dis[1]-d.dis[0])})
		.style("fill",colordis)
		.style("font-size",width/75 + "px");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",height*0.17)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Ingresos: ")
		.append("tspan")
		.text(function(){return format(d.ing[1]-d.ing[0])})
		.style("fill",colordis)
		.style("font-size",width/75 + "px");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",height*0.23)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Rendimientos: ")
		.append("tspan")
		.text(function(){return format(d.ren[1]-d.ren[0])})
		.style("fill",colordis)
		.style("font-size",width/75 + "px");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",height*0.29)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Egresos: ")
		.append("tspan")
		.text(function(){return format(d.egr[0]-d.egr[1])})
		.style("fill",colordis)
		.style("font-size",width/75 + "px");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw)
		.attr("y",height*0.03)
		.style("text-anchor","middle")
		.style("font-size",width/20 + "px")
		.style("fill",colordis)
		.text(function(){return d.ano});

	}

	function labelerm0(d,i){

	d3.select(".mainte").remove();
		
	var maint = d3.select(".mainlab").append("g")
		.attr("class","mainte");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",-height*0.03)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Fideicomiso No. ");

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw)
		.attr("y",height*0.03)
		.style("text-anchor","middle")
		.style("font-size",width/50 + "px")
		.style("fill",colordis)
		.text(code);

	maint.append("text")
		.attr("class","labmte")
		.attr("x",width*scw - width*1/4*0.35)
		.attr("y",height*0.2)
		.style("font-size",width/80 + "px")
		.style("fill","#686868")
		.text("Monto inicial: ")
		.append("tspan")
		.text(format(parseFloat(inic)/1000000))
		.style("fill",colordis)
		.style("font-size",width/75 + "px");
	}

}

function maximer(lanbar){

	var maxs = [];
	for (var i = 0; i < lanbar.length; i++) {
		maxs.push(lanbar[i].egr[0])
	};

	return d3.max(maxs);

}

function barajeador(lanarr){

	var lilies = [];

	var anov = lanarr[0].Año;
	var dist = parseFloat(lanarr[0].Disponible) - parseFloat(lanarr[0].Ingresos) - parseFloat(lanarr[0].Rendimientos) + parseFloat(lanarr[0].Egresos);
	var ingt = dist + parseFloat(lanarr[0].Ingresos);
	var rent = ingt + parseFloat(lanarr[0].Rendimientos);
	var egrt = rent - parseFloat(lanarr[0].Egresos);
	var disv = [0,dist/1000000];
	var ingv = [dist/1000000,ingt/1000000];
	var renv = [ingt/1000000,rent/1000000];
	var egrv = [rent/1000000,egrt/1000000];

	lilies.push({ano:anov,dis:disv,ing:ingv,ren:renv,egr:egrv});

	for (var i = 1; i < lanarr.length; i++) {
		var anov = lanarr[i].Año;
		var dist = parseFloat(lanarr[i-1].Disponible);
		var ingt = dist + parseFloat(lanarr[i].Ingresos);
		var rent = ingt + parseFloat(lanarr[i].Rendimientos);
		var egrt = rent - parseFloat(lanarr[i].Egresos);
		var disv = [0,dist/1000000];
		var ingv = [dist/1000000,ingt/1000000];
		var renv = [ingt/1000000,rent/1000000];
		var egrv = [rent/1000000,egrt/1000000];

		lilies.push({ano:anov,dis:disv,ing:ingv,ren:renv,egr:egrv});
	};

	return lilies;
}