var margin = {left:0, right:0, bottom: 0, top: 10},
	widthd = parseInt(d3.select("#visj").style("width"),10);

var width = widthd - margin.left - margin.right,
	height = (width * 0.5) - margin.top - margin.bottom;
	radius = Math.min(width*1/2, height) / 2;

if(widthd < 768){
	margin.bottom = 70;
	height = (width * 1.3) - margin.top - margin.bottom;
	radius = Math.min(width*0.95, height) / 2;
};

var angsca = d3.scale.linear()
	.range([0, 2 * Math.PI]);

var radsca = d3.scale.sqrt()
	.range([0,radius]);

var cols = 1;

var format = d3.format("$,.2f");

var cuadscx = d3.scale.ordinal()
	.rangeRoundBands([width*1/2,width],0.15)
	.domain(d3.range(cols));

var cuadscy = d3.scale.ordinal()
	.rangeRoundBands([0,height],0.15)
	.domain(d3.range(40));

var colordis = "#1C5DA7";
var coloring = "#2177AB";
var colorren = "#07B1BE";
var coloregr = "#85baa1";

var colors = ["#005487","#8AA6C2","#A7BEAA","#D9D9D9"];
var colors = ["none","#8BA7C0","#8A8A8A","#C9C8B7"];
var colors = ["none","#1C5DA7","#07B1BE","#85baa1"];
var colorl = "#FFFFFF";

var svg = d3.select("#visj").append("svg").attr("class","svgj")
			.attr("width",width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("class","circam")
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

if(widthd < 768){
var circ = svg.append("g")
	.attr("class","circs")
	.attr("transform","translate(" + (width*1 / 2) + "," + (height / 2) + ")");}
else{
var circ = svg.append("g")
	.attr("class","circs")
	.attr("transform","translate(" + (width*1/2 / 2) + "," + (height / 2) + ")");
}

var labs = svg.append("g")
	.attr("class","labs");

var partition = d3.layout.partition()
	.value(function(d) {return d.Ing;})
	.sort(function(a,b) {return -(b.value - a.value)});

var arc = d3.svg.arc()
	.startAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, angsca(d.x)));})
	.endAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, angsca(d.x + d.dx)));})
	.innerRadius(function(d) {return Math.max(0, radsca(d.y));})
	.outerRadius(function(d) {return Math.max(0, radsca(d.y + d.dy));});

d3.json("./datos/Full2014.json",function(error,fdata){

	var fuldat = bird(fdata);
	var ramos = ramox(fdata);
	var temas = temax(fdata);

	var path = circ.selectAll("path")
		.data(partition.nodes(fuldat))
		.enter().append("path")
		.attr("class",function(d){return "arco prof"+d.depth})
		.attr("d", arc)
		.style("fill",function(d){return colors[d.depth]})
		.style("stroke", colorl)
		.style("stroke-width",0.4);

	d3.selectAll(".prof1").on("mouseover",overarc1).on("mouseout",outedarc1);
	d3.selectAll(".prof2").on("mouseover",overarco).on("mouseout",outedarco);
	d3.selectAll(".prof3").on("mouseover",overarc3).on("mouseout",outedarc3);

	if(widthd >= 768){
		labas(ramos,temas);
		ploto();
	} else {
		d3.selectAll(".prof3").remove();
		plotomv();
	}

	

})

function labas(ramos,temas){

	labs.selectAll(".letx")
		.data(temas)
		.enter().append("text").attr("class","temte")
		.attr("x",function(d,i){return cuadscx(i%cols);})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 3);})
		.style("font-size",width/110 + "px")
		.text(function(d){return d.charAt(0) + d.slice(1).toLowerCase()});

	labs.selectAll(".srtx")
		.data(temas)
		.enter().append("rect")
		.attr("x",function(d,i){return cuadscx(i%cols) - width*0.006 - width*0.003;})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 3) - width*0.0065;})
		.attr("width",width*0.006)
		.attr("height",width*0.006)
		.style("fill",colors[1])
		.style("stroke",colorl)
		.style("stroke-width",0.4);

	labs.selectAll(".hocua")
		.data(temas)
		.enter().append("rect").attr("class","temho")
		.attr("x",function(d,i){return cuadscx(i%cols) - width*0.006 - width*0.003;})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 3) - width*0.0062*1.5;})
		.attr("width",width*0.3)
		.attr("height",width*0.0062*2)
		.style("fill","white")
		.style("opacity",0)
		.on("mouseover",overedt)
		.on("mouseout",outedt);

	labs.append("text").attr("class","temte")
		.attr("x",cuadscx(0))
		.attr("y",cuadscy(1))
		.style("font-size",width/60 + "px")
		.text("Temas:");

	labs.selectAll(".letx")
		.data(ramos)
		.enter().append("text").attr("class","temte")
		.attr("x",function(d,i){return cuadscx(i%cols);})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 13);})
		.style("font-size",width/110 + "px")
		.text(function(d){return d.charAt(0) + d.slice(1).toLowerCase()});

	labs.selectAll(".srtx")
		.data(ramos)
		.enter().append("rect")
		.attr("x",function(d,i){return cuadscx(i%cols) - width*0.006 - width*0.003;})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 13) - width*0.0065;})
		.attr("width",width*0.006)
		.attr("height",width*0.006)
		.style("fill",colors[2])
		.style("stroke",colorl)
		.style("stroke-width",0.4);

	labs.selectAll(".hocua")
		.data(ramos)
		.enter().append("rect").attr("class","ramho")
		.attr("x",function(d,i){return cuadscx(i%cols) - width*0.006 - width*0.003;})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 13) - width*0.0062*1.5;})
		.attr("width",width*0.3)
		.attr("height",width*0.0062*2)
		.style("fill","white")
		.style("opacity",0)
		.on("mouseover",overedr)
		.on("mouseout",outedr);

	labs.append("text").attr("class","temte")
		.attr("x",cuadscx(0))
		.attr("y",cuadscy(11))
		.style("font-size",width/60 + "px")
		.text("Ramos:");

	labs.selectAll(".srtx")
		.data(["Fideicomisos"])
		.enter().append("rect")
		.attr("x",function(d,i){return cuadscx(i%cols) - width*0.006 - width*0.003;})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 38) - width*0.0065;})
		.attr("width",width*0.006)
		.attr("height",width*0.006)
		.style("fill",colors[3])
		.style("stroke",colorl)
		.style("stroke-width",0.4);

	labs.selectAll(".letx")
		.data(["Fideicomisos"])
		.enter().append("text").attr("class","fidte")
		.attr("x",function(d,i){return cuadscx(i%cols);})
		.attr("y",function(d,i){return cuadscy(Math.floor(i/cols) + 38);})
		.style("font-size",width/110 + "px")
		.text(function(d){return d});

}

function overarc1(d,i){

	var arco1 = d3.selectAll(".arco");
	var sele1 = arco1.classed("actvea",function(p,j){return p !== d});

	d3.selectAll(".actvea").style("opacity",0.2);

	var tema1 = d3.selectAll(".temho");
	var selt1 = tema1.classed("actht",function(p,j){return p !== d.Tema});

	d3.selectAll(".actht").style("opacity",0.8);

	if(widthd < 768){

		plotamv(d);

		d3.select(".labamv").remove();

		var labag = labs.append("g").attr("class","labamv");

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.035)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[1])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.06)
			.style("font-size",width/40 + "px")
			.text(d.Tema.charAt(0) + d.Tema.slice(1).toLowerCase());


	}else{plota(d)};

}

function overarco(d,i){

	var arco1 = d3.selectAll(".arco");
	var sele1 = arco1.classed("actvea",function(p,j){return p !== d});

	d3.selectAll(".actvea").style("opacity",0.2);

	var tema1 = d3.selectAll(".temho");
	var selt1 = tema1.classed("actht",function(p,j){return p !== d.Tema});

	var ramo1 = d3.selectAll(".ramho");
	var selr1 = ramo1.classed("acthr",function(p,j){return p !== d.Ramo});

	d3.selectAll(".actht").style("opacity",0.8);
	d3.selectAll(".acthr").style("opacity",0.8);

	if(widthd < 768){

		plotamv(d);

		d3.select(".labamv").remove();

		var labag = labs.append("g").attr("class","labamv");

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.035)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[1])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.06)
			.style("font-size",width/40 + "px")
			.text(d.Tema.charAt(0) + d.Tema.slice(1).toLowerCase());

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.085)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[2])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.11)
			.style("font-size",width/40 + "px")
			.text(d.Ramo.charAt(0) + d.Ramo.slice(1).toLowerCase());

	}else{plota(d)};

}

function overarc3(d,i){

	var arco1 = d3.selectAll(".arco");
	var sele1 = arco1.classed("actvea",function(p,j){return p !== d});

	d3.selectAll(".actvea").style("opacity",0.2);

	var tema1 = d3.selectAll(".temho");
	var selt1 = tema1.classed("actht",function(p,j){return p !== d.Tema});

	var ramo1 = d3.selectAll(".ramho");
	var selr1 = ramo1.classed("acthr",function(p,j){return p !== d.Ramo});

	d3.selectAll(".actht").style("opacity",0.8);
	d3.selectAll(".acthr").style("opacity",0.8);

	if(widthd < 768){

		plotamv(d);

		d3.select(".labamv").remove();

		var labag = labs.append("g").attr("class","labamv");

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.035)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[1])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.06)
			.style("font-size",width/40 + "px")
			.text(d.Tema.charAt(0) + d.Tema.slice(1).toLowerCase());

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.085)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[2])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.11)
			.style("font-size",width/40 + "px")
			.text(d.Ramo.charAt(0) + d.Ramo.slice(1).toLowerCase());

		labag.append("rect")
			.attr("x",width * 0.1)
			.attr("y",height * 1.135)
			.attr("width",width*0.025)
			.attr("height",width*0.025)
			.style("fill",colors[3])
			.style("stroke",colorl)
			.style("stroke-width",0.4);

		labag.append("text")
			.attr("class","fidte")
			.attr("x",width * 0.14)
			.attr("y",height * 1.16)
			.style("font-size",width/40 + "px")
			.text(d.Registro.charAt(0) + d.Registro.slice(1).toLowerCase());

	}else{

		plota(d);

		d3.select(".fidte").text("Fideicomiso No. " + d.Registro);

	};

}

function outedarc1(d,i){

	var arcos = d3.selectAll(".arco");
	var temah = d3.selectAll(".temho");

	arcos.classed("actvea",false);
	d3.selectAll(".arco").style("opacity",1);

	temah.classed("actht",false);
	d3.selectAll(".temho").style("opacity",0);

	d3.select(".inslab").remove();

	if(widthd < 768){plotomv()}else{ploto()};

	d3.select(".labamv").remove();

}

function outedarco(d,i){

	var arcos = d3.selectAll(".arco");
	var ramoh = d3.selectAll(".ramho");
	var temah = d3.selectAll(".temho");

	arcos.classed("actvea",false);
	d3.selectAll(".arco").style("opacity",1);

	ramoh.classed("acthr",false);
	d3.selectAll(".ramho").style("opacity",0);

	temah.classed("actht",false);
	d3.selectAll(".temho").style("opacity",0);

	d3.select(".inslab").remove();

	if(widthd < 768){plotomv()}else{ploto()};

	d3.select(".labamv").remove();

}

function outedarc3(d,i){

	var arcos = d3.selectAll(".arco");
	var ramoh = d3.selectAll(".ramho");
	var temah = d3.selectAll(".temho");

	arcos.classed("actvea",false);
	d3.selectAll(".arco").style("opacity",1);

	ramoh.classed("acthr",false);
	d3.selectAll(".ramho").style("opacity",0);

	temah.classed("actht",false);
	d3.selectAll(".temho").style("opacity",0);

	d3.select(".inslab").remove();

	if(widthd < 768){plotomv()}else{ploto()};

	d3.select(".labamv").remove();

	d3.select(".fidte").text("Fideicomisos");

}

function overedr(d,i){

	var arcos = d3.selectAll(".arco");
	var seles = arcos.classed("active",function(p,j){return p.Ramo !== d;});

	var ramhos = d3.selectAll(".ramho");
	var ramsel = ramhos.classed("activerh",function(p,j){return p !== d}); 

	d3.selectAll(".active").style("opacity",0.2);
	d3.selectAll(".activerh").style("opacity",0.8);

	arcos.classed("tempcl",function(p,j){return p.Ramo === d;});
	var temdat = d3.selectAll(".tempcl").data();
	var objfi = sumaf(temdat);
	if(widthd < 768){plotamv(objfi)}else{plota(objfi)};
}

function outedr(d,i){

	var arcos = d3.selectAll(".arco");
	var ramhos = d3.selectAll(".ramho");

	arcos.classed("active",false);
	d3.selectAll(".arco").style("opacity",1);

	ramhos.classed("activerh",false);
	d3.selectAll(".ramho").style("opacity",0);

	d3.select(".inslab").remove();

	if(widthd < 768){plotomv()}else{ploto()};
}

function overedt(d,i){

	var arcos = d3.selectAll(".arco");
	var seles = arcos.classed("active",function(p,j){return p.Tema !== d;});

	var temhos = d3.selectAll(".temho");
	var temsel = temhos.classed("activeth",function(p,j){return p !== d}); 

	d3.selectAll(".active").style("opacity",0.2);
	d3.selectAll(".activeth").style("opacity",0.8);

	arcos.classed("tempcl",function(p,j){return p.Tema === d;});
	var temdat = d3.selectAll(".tempcl").data();
	var objfi = sumaf(temdat);
	if(widthd < 768){plotamv(objfi)}else{plota(objfi)};
}

function outedt(d,i){

	var arcos = d3.selectAll(".arco");
	var temhos = d3.selectAll(".temho");

	arcos.classed("active",false);
	d3.selectAll(".arco").style("opacity",1);

	temhos.classed("activeth",false);
	d3.selectAll(".temho").style("opacity",0);

	d3.select(".inslab").remove();

	if(widthd < 768){plotomv()}else{ploto()};
}

function sumaf(temdat){
	var objfi = {Ing:0, Egr:0, Ren:0};
	for (var i = 0; i < temdat.length; i++) {
		objfi.Ing = objfi.Ing + temdat[i].Ing;
		objfi.Egr = objfi.Egr + temdat[i].Egr;
		objfi.Ren = objfi.Ren + temdat[i].Ren;
	};
	return objfi;
}

function ploto(){

	d3.select(".inslab").remove();
	var inslab = circ.append("g").attr("class","inslab");

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.02)
		.text("La gran")
		.style("fill","#686868")
		.style("font-size",width/30 + "px")
		.style("text-anchor","middle");

	inslab.append("text")
		.attr("x",0)
		.attr("y",width*0.5*0.06)
		.style("font-size",width/30 + "px")
		.style("text-anchor","middle")
		.text("caja negra")
		.style("fill","#686868");

	inslab.append("line")
		.attr("x1",-width*0.095)
		.attr("x2",+width*0.095)
		.attr("y1",height*0.09)
		.attr("y2",height*0.09)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	inslab.append("line")
		.attr("x1",-width*0.095)
		.attr("x2",+width*0.095)
		.attr("y1",-height*0.1)
		.attr("y2",-height*0.1)
		.style("stroke",colordis)
		.style("stroke-width","1.7");
}

function plotomv(){

	d3.select(".inslab").remove();
	var inslab = circ.append("g").attr("class","inslab");

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.04)
		.text("La gran")
		.style("fill","#686868")
		.style("font-size",height/15 + "px")
		.style("text-anchor","middle");

	inslab.append("text")
		.attr("x",0)
		.attr("y",width*0.5*0.11)
		.style("font-size",height/15 + "px")
		.style("text-anchor","middle")
		.text("caja negra")
		.style("fill","#686868");

	inslab.append("line")
		.attr("x1",-width*0.18)
		.attr("x2",+width*0.18)
		.attr("y1",height*0.09)
		.attr("y2",height*0.09)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	inslab.append("line")
		.attr("x1",-width*0.18)
		.attr("x2",+width*0.18)
		.attr("y1",-height*0.1)
		.attr("y2",-height*0.1)
		.style("stroke",colordis)
		.style("stroke-width","1.7");
}

function plota(dat){

	d3.select(".inslab").remove();
	var inslab = circ.append("g").attr("class","inslab");

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.05)
		.text("Ingresos: ")
		.style("fill","#686868")
		.style("font-size",width/90 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Ing)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.05*0)
		.text("Egresos: ")
		.style("fill","#686868")
		.style("font-size",width/90 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Egr)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",0)
		.attr("y",+width*0.5*0.05)
		.text("Rendimientos: ")
		.style("fill","#686868")
		.style("font-size",width/90 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Ren)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",+width*0.09)
		.attr("y",+height*0.083)
		.text("en millones de pesos")
		.style("fill","#686868")
		.style("font-size",width/130 + "px")
		.style("text-anchor","end")

	inslab.append("line")
		.attr("x1",-width*0.095)
		.attr("x2",+width*0.095)
		.attr("y1",height*0.09)
		.attr("y2",height*0.09)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	inslab.append("line")
		.attr("x1",-width*0.095)
		.attr("x2",+width*0.095)
		.attr("y1",-height*0.1)
		.attr("y2",-height*0.1)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

}

function plotamv(dat){

	d3.select(".inslab").remove();
	var inslab = circ.append("g").attr("class","inslab");

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.10)
		.text("Ingresos: ")
		.style("fill","#686868")
		.style("font-size",height/35 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Ing)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",0)
		.attr("y",-width*0.5*0.05*0)
		.text("Egresos: ")
		.style("fill","#686868")
		.style("font-size",height/35 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Egr)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",0)
		.attr("y",+width*0.5*0.10)
		.text("Rendimientos: ")
		.style("fill","#686868")
		.style("font-size",height/35 + "px")
		.style("text-anchor","middle")
		.append("tspan")
		.text(function(){return format(dat.Ren)})
		.style("fill",colordis);

	inslab.append("text")
		.attr("x",+width*0.18)
		.attr("y",+height*0.083)
		.text("en millones de pesos")
		.style("fill","#686868")
		.style("font-size",height/50 + "px")
		.style("text-anchor","end")

	inslab.append("line")
		.attr("x1",-width*0.18)
		.attr("x2",+width*0.18)
		.attr("y1",height*0.09)
		.attr("y2",height*0.09)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

	inslab.append("line")
		.attr("x1",-width*0.18)
		.attr("x2",+width*0.18)
		.attr("y1",-height*0.1)
		.attr("y2",-height*0.1)
		.style("stroke",colordis)
		.style("stroke-width","1.7");

}

function temax(fudat){

	var temas = [];
	for (var i = 0; i < fudat.length; i++) {
		if(temas.indexOf(fudat[i].Tema) == -1){
			temas.push(fudat[i].Tema);
		}
	}
	return temas;
}

function ramox(fudat){

	var ramos = [];
	for (var i = 0; i < fudat.length; i++) {
		if(ramos.indexOf(fudat[i].Ramo) == -1){
			ramos.push(fudat[i].Ramo);
		}
	}
	return ramos;
}

function bird(fudat){

	var temas = [];
	var ramos = [];
	var sumados = [];

	for (var i = 0; i < fudat.length; i++) {
		if(temas.indexOf(fudat[i].Tema) == -1){
			temas.push(fudat[i].Tema);
		}
		if(ramos.indexOf(fudat[i].Ramo) == -1){
			ramos.push(fudat[i].Ramo);
		}
		var temp = {Ramo: fudat[i].Ramo,Tema: fudat[i].Tema,Ing: 0,Egr: 0, Ren: 0, Registro: fudat[i].Registro, Designacion: fudat[i].Designacion};
		for (var j = 0; j < fudat[i].Evolucion.length; j++) {
			temp.Ing = temp.Ing + parseFloat(fudat[i].Evolucion[j].Ingresos)/1000000;
			temp.Egr = temp.Egr + parseFloat(fudat[i].Evolucion[j].Egresos)/1000000;
			temp.Ren = temp.Ren + parseFloat(fudat[i].Evolucion[j].Rendimientos)/1000000;
		};
		sumados.push(temp);
	};

	var tempi = {Ing: 0, Egr: 0, Ren: 0, children: []};
	for (var i = 0; i < temas.length; i++) {
		var ramt = sumados.filter(function(d){return d.Tema == temas[i];});
		if (ramt.length > 0) {
			var tempj = {Tema: temas[i], Ing: 0, Egr: 0, Ren: 0, children: []};
			for (var j = 0; j < ramos.length; j++) {
				var temt = ramt.filter(function(d){return d.Ramo == ramos[j];});
				if (temt.length > 0) {;
					var tempk = {Tema: temas[i], Ramo: ramos[j], Ing: 0, Egr: 0, Ren: 0};
					for (var k = 0; k < temt.length; k++) {
						tempk.Ing = tempk.Ing + temt[k].Ing;
						tempk.Egr = tempk.Egr + temt[k].Egr;
						tempk.Ren = tempk.Ren + temt[k].Ren;
					};
					tempk.children = temt;
					tempj.Ing = tempj.Ing + tempk.Ing;
					tempj.Egr = tempj.Egr + tempk.Egr;
					tempj.Ren = tempj.Ren + tempk.Ren;
					(tempj.children).push(tempk);
				};	
			};
			tempi.Ing = tempi.Ing + tempj.Ing;
			tempi.Egr = tempi.Egr + tempj.Egr;
			tempi.Ren = tempi.Ren + tempj.Ren;
			(tempi.children).push(tempj);
		};
	};
	return tempi;
}