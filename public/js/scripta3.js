function truncate(str, maxLength, suffix) {
    if(str.length > maxLength) {
        str = str.substring(0, maxLength + 1); 
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
        str = str + suffix;
    }
    return str;
}

var colordis = "#005383";
var coloring = "#006FB2";
var colorren = "#72A8D1";
var coloregr = "#EA5B73";

var colordis = "#1C5DA7";
var coloring = "#2177AB";
var colorren = "#07B1BE";
var coloregr = "#85baa1";
var colort = "#464646";

//var margin = {left:0, right:10, bottom: 30, top: 50},

var margin = {left:0, right:10, bottom: 0, top: 10},
    widthdiv = parseInt(d3.select("#vis").style("width"),10);

var width = widthdiv - margin.left - margin.right,
    height = (width * 0.45) - margin.top - margin.bottom;

var start_year = 2006,
    end_year = 2014;

var formatYears = d3.format("0000");
var format = d3.format(",");

var x = d3.scale.linear()
    .range([width*0.1, width*0.70]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .tickFormat(formatYears);

var svg = d3.select("#vis").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class","vis")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width * .86) + "," + (-1*height*0.17) + ")")
            .selectAll("g")
            .data([1500,105000,215000])
            .enter().append("g");

var legend2 = svg.append("g")
            .attr("class","legend2")
            .attr("transform","translate(" + (width * .86) + "," + (height) + ")");

d3.json("./datos/fideicomisos.json",function(error, data){


    var names = [];
    var values = [];

    for (var i=0, len=data.length;i < len;i++){
        names.push(data[i]['name']);
    }

    for (var i=0, len=data.length; i < len; i++){
        for(var j=0, len2=data[i]['fideicomiso'].length; j<len2;j++){
            values.push(data[i]['fideicomiso'][j][1]); 
            values.push(data[i]['fideicomiso'][j][3]); 
        }
    }

    x.domain([start_year, end_year]);

    xaxisg = svg.append("g")
                .attr("class", "xaxis")
                .attr("transform","translate(" + width*0.090 + "," + (height*0.90) + ")")
                .style("fill","#282828")
                //.style("stroke","#b6b6b6")
                .style("shape-rendering","crispEdges")
                .call(xAxis);

    xaxisg.selectAll("text").attr("class","axislab")
            .style("font-size",width/82 + "px")
            .style("fill","#282828");

    xaxisg.select("path")
        .style("stroke","#DADADA")
        .style("fill","none");

    // svg.append("text")
    //     .attr("y", -height*0.03)
    //     .attr("x", width*0.01)
    //     .attr("class","labeltxt")
    //     .style("font-size",width/55 + "px")
    //     //.style("fill","black")
    //     .style("fill","#686868")
    //     .text("A dónde se va el dinero de las Cajas Negras");

    svg.append("text")
        .attr("class","txtnamecifra")
        .attr("x",width*0.795)
        .attr("y",height*1.5/1.59)
        .text("Año")
        .style("text-anchor","middle")
        .style("font-size",width/85 + "px")
        .style("fill","#686868");

    svg.append("text")
        .attr("y", height*0.965)
        .attr("x", width*0.01)
        .attr("class","labeltxt")
        .style("font-size",width/90 + "px")
        .style("fill","#686868")
        .text("Nota: Pasa el cursor por encima de los círculos para conocer la cifra total de los fideicomisos por tema.");


    // svg.append("text")
    //     .attr("y", height*0.965)
    //     .attr("x", width*0.01)
    //     .attr("class","labeltxt")
    //     .style("font-size",width/140 + "px")
    //     .style("fill","black")
    //     .text(names[0]);

    // svg.append("text")
    //     .attr("y", height*0.965)
    //     .attr("x", width*0.105)
    //     .attr("class","labeltxt")
    //     .style("font-size",width/140 + "px")
    //     .style("fill","black")
    //     .text(": La estabilidad presupuestaria es la pauta que fija que las administraciones públicas deben cerrar en equilibrio sus finanzas a lo largo de un período de tiempo, sea un año o más, pudiendo incurrir en superávit (más ingresos ");


    // svg.append("text")
    //     .attr("y", height*0.985)
    //     .attr("x", width*0.01)
    //     .attr("class","labeltxt")
    //     .style("font-size",width/140 + "px")
    //     .style("fill","black")
    //     .text("que gastos) pero nunca en déficit (más gastos que ingresos). Los fideicomisos sirven, entonces, para brindar una Estabilidad Presupuestaria a las dependencias o ramos solicitados. Pensiones: Una pensión, en relación con el seguro social o a la seguridad");


    svg.append("text")
        .attr("class","txtname")
        .attr("x",width*0.9)
        .attr("y",height*1.5/18)
        .text("Fideicomisos por Tema")
        .style("text-anchor","middle")
        .style("font-size",width/65 + "px")
        .style("fill","#686868");

    svg.append("text")
        .attr("class","txtname")
        .attr("x",width*0.901)
        .attr("y",height*1/7.5)
        .style("text-anchor","middle")
        .style("font-size",width/110 + "px")  
        .style("fill","#686868")        
        .text("El total indica la suma de todos los años");

    svg.append("text")
        .attr("class","txtname")
        .attr("x",width*0.873)
        .attr("y",height*1.5/7.5)
        .text("Total Ingresos: $")
        .style("text-anchor","middle")
        .style("font-size",width/90 + "px")
        .style("fill","#686868")
        .append("tspan")
        .attr("x",width*0.873)
        .attr("y",height*1.5/5.2)
        .text("Total Egresos: $")
        .append("tspan")
        .attr("x",width*0.94)
        .attr("y",height*1.5/4.1)
        .style("text-anchor","middle")
        .style("font-size",width/115 + "px")          
        .text("en Billones de Pesos");

    svg.append("text")
        .attr("class","txtname")
        .style("text-anchor","middle")
        .style("font-size",width/85 + "px")
        .style("fill",colordis)
        .attr("x",width*0.94)
        .attr("y",height*1.5/7.5)
        //.text(format(2083.3))
        .text(format(80.5))
        .append("tspan")
        .attr("x",width*0.94)
        .attr("y",height*1.5/5.2)
        .text(format(2002.78));

    svg.append("text")
        .attr("class","txtname2")
        .attr("x",width*0.9)
        .attr("y",height*1.5/3.3)
        .style("fill","#686868")
        .style("text-anchor","middle")
        .text("¿Cómo leer esta gráfica?")
        .style("font-size",width/80 + "px")
        .append("tspan")
        .attr("x",width*0.899)
        .attr("y",height*1.5/3.05)
        .text("Cada conjunto de círculos muestra")
        .style("font-size",width/125 + "px")
        .append("tspan")
        .attr("x",width*0.899)
        .attr("y",height*1.5/2.9)
        .text("el monto correspondiente a los")
        .style("font-size",width/125 + "px")
        .append("tspan")
        .attr("x",width*0.9)
        .attr("y",height*1.5/2.76)
        .text("movimientos de egresos e ingresos")
        .style("font-size",width/125 + "px");

    svg.append("text")
        .attr("class","txtname2")
        .attr("x",width*0.90)
        .attr("y",height*1.5/2.37)
        .text("Ingresos")
        .style("text-anchor","middle")
        .style("font-size",width/90 + "px")
        .style("fill",colort);

    svg.append("text")
        .attr("class","txtname2")
        .attr("x",width*0.899)
        .attr("y",height*1.5/2.22)
        .text("Egresos")
        .style("text-anchor","middle")
        .style("font-size",width/90 + "px")
        .style("fill",colort);

    svg.append("text")
        .attr("class","txtnamecifra")
        .attr("x",width*0.945)
        .attr("y",height*1.5/1.69)
        .text("Millones de Pesos")
        .style("text-anchor","middle")
        .style("font-size",width/110 + "px")
        .style("fill",colort);

    svg.append("line")
        .attr("class","lin")
        .attr("x1",width*6.09/7)
        .attr("x2",width*6.4/7)
        .attr("y1",height*2.34/2.830)
        .attr("y2",height*2.34/2.830)
        .style("stroke","#999")
        .style("stroke-dasharray" ,4)
        .style("stroke-width",1.5);

    svg.append("text")
        .attr("class","txtnamecifra")
        .attr("x",width*0.93)
        .attr("y",height*2.34/2.810)
        .text("1,500")
        .style("text-anchor","middle")
        .style("font-size",width/113 + "px")
        .style("fill",colort);

    svg.append("line")
        .attr("class","lin")
        .attr("x1",width*6.14/7)
        .attr("x2",width*6.4/7)
        .attr("y1",height*2.34/2.93)
        .attr("y2",height*2.34/2.93)
        .style("stroke","#999")
        .style("stroke-dasharray" ,4)
        .style("stroke-width",1.5);

    svg.append("text")
        .attr("class","txtnamecifra")
        .attr("x",width*0.935)
        .attr("y",height*2.34/2.91)
        .text("105,000")
        .style("text-anchor","middle")
        .style("font-size",width/113 + "px")
        .style("fill",colort);

    svg.append("line")
        .attr("class","lin")
        .attr("x1",width*6.21/7)
        .attr("x2",width*6.4/7)
        .attr("y1",height*2.34/3.02)
        .attr("y2",height*2.34/3.02)
        .style("stroke","#999")
        .style("stroke-dasharray" ,4)
        .style("stroke-width",1.5);

    svg.append("text")
        .attr("class","txtnamecifra")
        .attr("x",width*0.935)
        .attr("y",height*2.34/3.01)
        .text("215,000")
        .style("text-anchor","middle")
        .style("font-size",width/113 + "px")
        .style("fill",colort);

    for (var j = 0; j < data.length; j++) {


        var rScale = d3.scale.linear()
            .domain([d3.min(values), d3.max(values)])
            .range([width*0.009,width*0.0245]);

        var f = svg.append("g")
                    .attr("class","fideicomiso-rect"); 

        var g = svg.append("g")
                    .attr("class","fideicomiso"); 

        var h = svg.append("g")
                    .attr("class","fideicomiso2"); 

        var rectsombra = f.selectAll("rect")
            .data(data[j]['fideicomiso'])
            .enter()
            .append("rect");

        var circlesmax = g.selectAll("circle")
            .data(data[j]['fideicomiso'])
            .enter()
            .append("circle");

        g.append("text")
            .attr("y", j*(height*0.135) + height*0.06)
            .attr("x", width*0.01)
            .attr("class","labeltxt")
            .style("font-size",width/90 + "px")
            .style("font-style","normal")
            .style("fill","#686868")
            .text(truncate(data[j]['name'],40," ..."));
            //.text(names[j]);

        var circlesmin = h.selectAll("circle")
            .data(data[j]['fideicomiso'])
            .enter()
            .append("circle");


        rectsombra
            .attr("x", function(d, i) { return x(d[0]) + width*0.055; })
            .attr("y", j*(height*0.135))
            .attr("width", width * 0.0749)
            .attr("height", height*0.135)
            .attr("rx",1)
            .attr("ry", 1)
            .style("fill", "red")
            .style("opacity",0.0)
            .on("mouseover",over3)
            .on("mouseout",outed3);


        circlesmax
            .attr("cx", function(d, i) { return x(d[0]) + width*0.090; })
            //.attr("cy", j*(height*0.135) + height*0.06)
            .attr("cy", j*(height*0.135) + height*0.05)
            .attr("r", function(d) { return rScale(d[1]); })
            .style("fill", function(d) { return d[2]; })
            .style("cursor","pointer")
            .on("mouseover",over3)
            .on("mouseout",outed3);

        circlesmin
            .attr("cx", function(d, i) { return x(d[0]) + width*0.090; })
            //.attr("cy", j*(height*0.135) + height*0.06)
            .attr("cy", j*(height*0.135) + height*0.05)
            .attr("r", function(d) { return rScale(d[3]); })
            .style("fill", function(d) { return d[4];})
            .style("cursor","pointer")
            .on("mouseover",over3)
            .on("mouseout",outed3);

        var colorline = colordis;

        d3.select(".fideicomiso")
            .append("line")
            .attr("class","lin")
            .attr("x1",width*5.5/6.7)
            .attr("x2",width*5.55/5.65)
            .attr("y1",height*1.24/12)
            .attr("y2",height*1.24/12)
            .style("stroke",colorline)
            .style("stroke-width","1.7");


        d3.select(".fideicomiso")
            .append("line")
            .attr("class","lin")
            .attr("x1",width*5.5/6.7)
            .attr("x2",width*5.55/5.65)
            .attr("y1",height*3.34/9)
            .attr("y2",height*3.34/9)
            .style("stroke",colorline)
            .style("stroke-width","1.7");
    }

        var datascale = [0,105000,215000];

        legend.append("circle")
            .attr("cy", function(d,i) { return height*1.02 - rScale(datascale[i]); })
            .style("fill","none")
            .style("stroke","#ccc")
            .attr("r", function(d) {return rScale(d); });

        legend2.append("circle")
            .attr("r",7)
            .attr("cy", -height*1.5/4)
            .style("fill",colordis);

        legend2.append("circle")
            .attr("r",7)
            .attr("cy", -height*1.5/4.5)
            .style("fill",coloregr);

        var ftdata = d3.select("#tit").append("g").attr("class","ftdata");
        var fndata = d3.select("#def").append("g").attr("class","fndata");
        //fndata.append("hr");

        //ftdata.append("h1").attr("class","textadeh text-center").html("A dónde se va el dinero de las Cajas Negras");
        ftdata.append("h1").attr("class","textadeh").html("A dónde se va el dinero de las Cajas Negras");

        fndata.append("h3").attr("class","textadep").html("Fideicomisos por Tema");
        var obje1 = fndata.append("p").attr("class","textadep");
        var obje2 = fndata.append("p").attr("class","textadep");
        var obje3 = fndata.append("p").attr("class","textadep");
        var obje4 = fndata.append("p").attr("class","textadep");
        var obje5 = fndata.append("p").attr("class","textadep");
        var obje6 = fndata.append("p").attr("class","textadep");
        var obje7 = fndata.append("p").attr("class","textadep");

        obje1.append("span").append("strong").html("Estabilidad Presupuestaria: ");
        obje1.append("span").attr("class","datoob").html("La estabilidad presupuestaria es la pauta que fija que las administraciones públicas deben cerrar en equilibrio sus finanzas a lo largo de un período de tiempo, sea un año o más, pudiendo incurrir en superávit (más ingresos que gastos) pero nunca en déficit (más gastos que ingresos). Los fideicomisos sirven, entonces, para brindar una Estabilidad Presupuestaria a las dependencias o ramos solicitados.");
    
        obje2.append("span").append("strong").html("Pensiones: ");
        obje2.append("span").attr("class","datoob").html("Una pensión,  en relación con el seguro social o a la seguridad social, es un pago, temporal o de por vida, que recibe una persona cuando se encuentra en una situación, establecida por ley en cada país, que la hace acreedora de hecho de una cantidad económica, ya sea de los sistemas públicos de previsión nacionales o de entidades privadas. En el caso de las pensiones, los fideicomisos sirven para pagarlas a los beneficiarios.");

        obje3.append("span").append("strong").html("Prestaciones laborales: ");
        obje3.append("span").attr("class","datoob").html("Entrega de recursos que el empleador le otorga a sus trabajadores, en cosas materiales o servicios además del pago del salario. Los fideicomisos abiertos por ciertas dependencias o ramos, sirven para el pago de estas prestaciones laborales.");

        obje4.append("span").append("strong").html("Infraestructura: ");
        obje4.append("span").attr("class","datoob").html("Conjunto de elementos, dotaciones o servicios necesarios para el buen funcionamiento de un país, de una ciudad o de una organización cualquiera. La infraestructura urbana, para el transporte, sanitaria, etcétera, se ha construido gracias a diversos fideicomisos abiertos por dependencias gubernamentales.");

        obje5.append("span").append("strong").html("Apoyos financieros: ");
        obje5.append("span").attr("class","datoob").html("Son recursos otorgados para apoyar a las dependencias gubernamentales para concretar ciertos proyectos o programas de trabajo relacionados con el desempeño de sus tareas. Los fideicomisos abiertos bajo este rubro sirvieron en su momento para diversos fines, entre ellos, los de solventar carencias económicas de ciertas dependencias, para ejecutar sus obligaciones.");

        obje6.append("span").append("strong").html("Subsidios y apoyos: ");
        obje6.append("span").attr("class","datoob").html("Un subsidio, como estímulo de la economía, es la diferencia entre el precio real de un bien o servicio y el precio real cobrado al consumidor de estos bienes o servicios. Algunos fideicomisos fueron creados para apoyar, en su momento, a través de subsidios, a ciertos sectores en México.");

        obje7.append("span").append("strong").html("Fuente: ");
        obje7.append("span").attr("class","datoob").html("Elaboración propia con el glosario del Banco de México y la Real Academia Española.");

        function over3(d,i){

            d3.selectAll(".txtname").remove();

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.905)
                .attr("y",height*1.5/18)
                .text(d[0])
                .style("text-anchor","middle")
                .style("font-size",width/22 + "px")
                .style("fill",colordis);     

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.903)
                .attr("y",height*1.5/9)
                .text(d[5])
                .style("text-anchor","middle")
                .style("font-size",width/83.0 + "px")
                .style("fill","#686868");     

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.87)
                .attr("y",height*1.5/6.3)
                .text("Ingresos: $")
                .style("text-anchor","middle")
                .style("font-size",width/90 + "px")
                .style("fill","#686868");  

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.93)
                .attr("y",height*1.5/6.3)
                .text(function(){
                    var returnnumero;
                    if(d[2] === "#85baa1"){
                        returnnumero = d[1];
                    }else if(d[2]=== "#1C5DA7"){
                        returnnumero = d[3];
                    }
                    return format(returnnumero);
                })
                .style("text-anchor","middle")
                .style("font-size",width/85 + "px")
                .style("fill",colordis);

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.87)
                .attr("y",height*1.5/4.9)
                .text("Egresos: $")
                .style("text-anchor","middle")
                .style("font-size",width/90 + "px")
                .style("fill","#686868"); 

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.93)
                .attr("y",height*1.5/4.9)
                .text(function(){
                   var returnnumero;
                   if(d[2] === "#85baa1"){
                        returnnumero = d[3];
                    }else if(d[2]=== "#1C5DA7"){
                        returnnumero = d[1];
                    }
                    return format(returnnumero);
                })            
                .style("text-anchor","middle")
                .style("font-size",width/85 + "px")
                .style("fill",colordis);

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .style("font-size",width/90 + "px")
                .style("fill","#686868")
                .attr("x",width*0.94)
                .attr("y",height*1.5/4.1)
                .style("text-anchor","middle")
                .style("font-size",width/115 + "px")          
                .text("en Millones de Pesos");


        }

        function outed3(d,i){

            d3.selectAll(".txtname").remove();

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.9)
                .attr("y",height*1.5/18)
                .text("Fideicomisos por Tema")
                .style("text-anchor","middle")
                .style("font-size",width/65 + "px")
                .style("fill","#686868");

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.901)
                .attr("y",height*1/7.5)
                .style("text-anchor","middle")
                .style("font-size",width/110 + "px")  
                .style("fill","#686868")        
                .text("El total indica la suma de todos los años");


            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .attr("x",width*0.873)
                .attr("y",height*1.5/7.5)
                .text("Total Ingresos: $")
                .style("text-anchor","middle")
                .style("font-size",width/90 + "px")
                .style("fill","#686868")
                .append("tspan")
                .attr("x",width*0.873)
                .attr("y",height*1.5/5.2)
                .text("Total Egresos: $")
                .append("tspan")
                .attr("x",width*0.94)
                .attr("y",height*1.5/4.1)
                .style("text-anchor","middle")
                .style("font-size",width/115 + "px")          
                .text("en Billones de Pesos");

            d3.select(".fideicomiso")
                .append("text")
                .attr("class","txtname")
                .style("text-anchor","middle")
                .style("font-size",width/85 + "px")
                .style("fill",colordis)
                .attr("x",width*0.94)
                .attr("y",height*1.5/7.5)
                //.text(format(2083.3))
                .text(format(80.5))
                .append("tspan")
                .attr("x",width*0.94)
                .attr("y",height*1.5/5.2)
                .text(format(2002.78));


        }


});




