// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/adler
// @file     : controller-front.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone  = require('backbone'),
      d3        = require('d3'),
  //  [ templates ]
      Graph     = require('text!templates/graph.html'),
      Graph2    = require('text!templates/graph_bar.html'),
      Graph3    = require('text!templates/graph_stacked_bar.html'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Data_url = '/data/registry/',
  SVG      = {
    width  : 600,
    height : 400,
    margin : {
      top    : 20,
      right  : 20,
      bottom : 50,
      left   : 50
    } 
  },
  Money_scale = 1000000,
  Bar_width   = 20;


  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
 
 

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
   
    },

    // 
    // [ SET THE CONTAINER ]
    //
    //
    el : "body",

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){

      var graphs = document.querySelectorAll('.enable-d3');
      for(var i=0; i< graphs.length; i++){
        if(this.$(graphs[i]).hasClass('graph1')){
          var d = graphs[i].getAttribute("data-content");
          this.get_data(d, graphs[i], 1);
        }
        else if(this.$(graphs[i]).hasClass('graph2')){
          var d = graphs[i].getAttribute("data-content");
          this.get_data(d, graphs[i], 2);
        }
        else if(this.$(graphs[i]).hasClass('graph3')){
          var d = graphs[i].getAttribute("data-content");
          this.get_data(d, graphs[i], 3);
        }
      }
    },

    //
    //
    get_data : function(data, el ,type){
      var that = this;
      $.get(Data_url + data, null,function(d){
        if(type == 1){
          that.make_graph(d, el);
        }
        else if(type == 2){
          that.make_graph2(d, el);
        }
        else if(type == 3){
          that.make_graph3(d, el);
        }
        else{
          //
        }
      }, 'json');
    },

    //
    //
    //
    make_graph : function(d, el){
      this.$(el).append(Graph);
      // CACHE
      var collection  = new Backbone.Collection(d),
          container   = el.querySelector('.graph'),
          graph_title = el.querySelector('.graph_title'),
          ramo        = el.querySelector('.ramo'),
          unidad      = el.querySelector('.unidad'),
          link_to     = el.querySelector('.fide_link'),
          graph       = d3.select(container).append('svg:svg'),
          chart       = graph.append('svg:g'),
          field       = null, 

      // DATA
          registry   = _.uniq(collection.pluck('registry'))[0],
          data       = new Backbone.Collection(collection.where({registry : registry})),
          data_json  = data.toJSON(),
          years        = data.pluck('year'),
          incomes      = data.pluck('income').map(function(x){return x/Money_scale}),
          yields       = data.pluck('yield').map(function(x){return x/Money_scale}),
          expenses     = data.pluck('expenses').map(function(x){return x/Money_scale}),
          availability = data.pluck('availability').map(function(x){return x/Money_scale}),
          initial_amount = data.pluck('initial_amount')[0],
          fields = ['expenses', 'yield', 'income', 'availability'],
          m_scale      = incomes.concat(yields,expenses, availability),

      // HELPERS
          x_scale = d3.scale.linear().domain(d3.extent(years)).range([
            SVG.margin.left, SVG.width - SVG.margin.right
          ]),
          y_scale = d3.scale.linear().domain(d3.extent(m_scale)).range([
            SVG.height - SVG.margin.bottom - SVG.margin.top, SVG.margin.top
          ]),
          //years   = d3.range(d3.extent(years)),
          format  = d3.format(","),
          line    = d3.svg.line().x(function(d, i){return x_scale(+d.get('year'))})
                      .y(function(d){return y_scale(+d.get(field)/Money_scale);});

      // SET THE GRAPH
      // SVG
      graph.attr('width', SVG.width).attr('height', SVG.height);   
      /// h4
      graph_title.innerHTML =  graph_title.innerHTML + data.at(0).attributes.designation;
      /// agrega Ramo a notas
      ramo.innerHTML = data.at(0).attributes.branch;
      /// agrega Unidad a notas
      unidad.innerHTML = data.at(0).attributes.unit;
      /// agrega enlace a notas
      link_to.href= "/fideicomiso/" + data.at(0).attributes.registry;

      this.draw_axis(chart);
      this.draw_labels(chart, years, x_scale, y_scale, format);
      this.draw_ticks(chart, years, x_scale, y_scale, format);

      fields.forEach(function(fld){
        field = fld;
        chart.append('svg:path')
          .data([data.models])
          .attr('class', fld)
          .attr('d', line);
      });
    },

    //

    //
    //
    make_graph2 : function(d, el){
      this.$(el).append(Graph2);
      // CACHE
      var collection  = new Backbone.Collection(d),
          container   = el.querySelector('.graph'),
          graph_title = el.querySelector('.graph_title'),
          ramo        = el.querySelector('.ramo'),
          unidad      = el.querySelector('.unidad'),
          link_to     = el.querySelector('.fide_link'),
          graph       = d3.select(container).append('svg:svg'),
          chart       = graph.append('svg:g'),
          field       = null, 

      // DATA
          registry   = _.uniq(collection.pluck('registry'))[0],
          data       = new Backbone.Collection(collection.where({registry : registry})),
          data_json  = data.toJSON(),
          years        = data.pluck('year'),
          incomes      = data.pluck('income').map(function(x){return x/Money_scale}),
          yields       = data.pluck('yield').map(function(x){return x/Money_scale}),
          expenses     = data.pluck('expenses').map(function(x){return x/Money_scale}),
          availability = data.pluck('availability').map(function(x){return x/Money_scale}),
          initial_amount = data.pluck('initial_amount')[0],
          fields = ['expenses', 'income'],
          m_scale      = incomes.concat(yields,expenses, availability),

      // HELPERS
          x_scale = d3.scale.linear().domain(d3.extent(years)).range([
            SVG.margin.left + 40, SVG.width - SVG.margin.right -40
          ]),
          y_scale = d3.scale.linear().domain(d3.extent(m_scale)).range([
            SVG.height - SVG.margin.bottom - SVG.margin.top, SVG.margin.top
          ]),
          y_scale_inverse = d3.scale.linear().domain(d3.extent(m_scale)).range([
            SVG.margin.top, SVG.height - SVG.margin.bottom - SVG.margin.top
          ]),
          //years   = d3.range(d3.extent(years)),
          format  = d3.format(","),
          line    = d3.svg.line().x(function(d, i){return x_scale(+d.get('year'))})
                      .y(function(d){return y_scale(+d.get(field)/Money_scale);});

      // SET THE GRAPH
      // SVG
      graph.attr('width', SVG.width).attr('height', SVG.height);   
      /// h4
      graph_title.innerHTML =  graph_title.innerHTML + data.at(0).attributes.designation;
      /// agrega Ramo a notas
      ramo.innerHTML = data.at(0).attributes.branch;
      /// agrega Unidad a notas
      unidad.innerHTML = data.at(0).attributes.unit;
      /// agrega enlace a notas
      link_to.href= "/fideicomiso/" + data.at(0).attributes.registry;

      this.draw_axis(chart);
      this.draw_labels(chart, years, x_scale, y_scale, format);
      this.draw_ticks(chart, years, x_scale, y_scale, format);

      fields.forEach(function(fld){
        field = fld;
        var bar = chart.selectAll('rect')
          .data(data.models)
          .enter();

          bar.append('svg:rect')
          .attr('class', 'expense')
          .attr('x', function(d){
            return x_scale(+d.get('year'));
          })
          .attr('y', function(d){
            return SVG.height - SVG.margin.bottom - SVG.margin.top - y_scale_inverse(+d.get(field)/Money_scale);
          })
          .attr('width', function(d){
            return Bar_width;
          })
          .attr('height', function(d){
            return y_scale_inverse(+d.get('expenses')/Money_scale);
          });

          bar.append('svg:rect')
          .attr('class', 'income')
          .attr('x', function(d){
            return x_scale(+d.get('year')) - Bar_width;
          })
          .attr('y', function(d){
            return SVG.height - SVG.margin.bottom - SVG.margin.top - y_scale_inverse(+d.get('income')/Money_scale);
          })
          .attr('width', function(d){
            return Bar_width;
          })
          .attr('height', function(d){
            return y_scale_inverse(d.get('income')/Money_scale);
          });
      });
    },

    make_graph3 : function(d, el){
      this.$(el).append(Graph3);
      // CACHE
      var collection  = new Backbone.Collection(d),
          container   = el.querySelector('.graph'),
          graph_title = el.querySelector('.graph_title'),
          ramo        = el.querySelector('.ramo'),
          unidad      = el.querySelector('.unidad'),
          link_to     = el.querySelector('.fide_link'),
          graph       = d3.select(container).append('svg:svg'),
          chart       = graph.append('svg:g'),
          field       = null, 

      // DATA
          registries = _.uniq(collection.pluck('registry')),
          names      = _.uniq(collection.pluck('designation')),
          years      = _.uniq(collection.pluck('year')),
          layers     = [],
          colors     = ["#183152", "#ABC8E2", "#375D81"],
          field      = 'expenses',
          format     = d3.format(","),
          _x;

      // make the layers for the stack bars
      for(var i = 0; i < registries.length; i++){
        var g = new Backbone.Collection(collection.where({registry : registries[i]}));
        var d = {name : registries[i], values : []};

        for(var j = 0; j < years.length; j++){
          if(_x = g.findWhere({year : years[j]}) ){
            d.values.push({x: years[j],y : +_x.get(field)/Money_scale});
          }
          else{
            d.values.push({x: years[j],y: 0});
          }
        }
        layers.push(d);
      }
    

      // create the layout
      var stack = d3.layout.stack()
        .offset("zero")
        .values(function(d) { return d.values; });

      // create the scales
      var max = d3.max(stack(layers), function(d){
        return d3.max(d.values, function(el){
          return (el.y + el.y0) * 1.12
        });
      });

      var x_scale = d3.scale.linear().domain(d3.extent(years)).range([
            SVG.margin.left + 40, SVG.width - SVG.margin.right - 40
          ]);
      var h_scale = d3.scale.linear().domain([0, max]).range([
            0, SVG.height - SVG.margin.bottom - SVG.margin.top
          ]);
      var y_scale = d3.scale.linear().domain([0, max]).range([
            SVG.height - SVG.margin.bottom - SVG.margin.top, SVG.margin.top
          ]);
      var k_scale = d3.scale.linear().domain([0,max]).range([
            SVG.height - SVG.margin.bottom - SVG.margin.top,0
          ]);

      // SET THE GRAPH
      // SVG
      graph.attr('width', SVG.width).attr('height', SVG.height);  

      // render the data // 20040630001369
      stack(layers).forEach(function(st, index){
        var data = st.values;
        data.forEach(function(rect){
        /// intentando agregar el label……
        var fide_name  = this.el.querySelector('.fide_name_' +index);
        fide_name.innerHTML =  g.at(index).attributes.designation;
        
          chart.append('svg:rect')
          .attr('fill', colors[index])
          .attr('x',x_scale(rect.x) - (Bar_width/2))
          .attr('y', k_scale(rect.y0) - h_scale(rect.y))
          .attr('width', Bar_width)
          .attr('height', h_scale(rect.y));
        }, this);
      }, this);
      this.draw_axis(chart);
      this.draw_labels(chart, years, x_scale, y_scale, format);
      this.draw_ticks(chart, years, x_scale, y_scale, format);
    },

    draw_axis : function(chart){
       // the axis
      chart.append("svg:line")
        .attr('x1', SVG.margin.left)
        .attr('y1', SVG.height - SVG.margin.bottom - SVG.margin.top)
        .attr('x2', SVG.width)
        .attr('y2', SVG.height - SVG.margin.bottom - SVG.margin.top)
        .attr('class', 'axis');

      chart.append("svg:line")
        .attr('x1', SVG.margin.left)
        .attr('y1', SVG.margin.top)
        .attr('x2', SVG.margin.left)
        .attr('y2', SVG.height - SVG.margin.bottom - SVG.margin.top )
        .attr('class', 'axis');
    },

    //
    //
    //
    draw_labels : function(chart, years, x_scale, y_scale, format){
      chart.selectAll(".xLabel")
        .data(x_scale.ticks(years.length))
        .enter().append("svg:text")
        .attr("class", "xLabel")
        .text(String)
        .attr("x", function(d) { return x_scale(d) })
        .attr("y", SVG.height - SVG.margin.top - SVG.margin.bottom + 20)
        .attr("text-anchor", "middle");

      chart.selectAll(".yLabel")
        .data(y_scale.ticks(10))
        .enter().append("svg:text")
        .attr("class", "yLabel")
        .text(format)
        .attr("x", SVG.margin.left - 10)
        .attr("y", function(d) { return y_scale(d) })
        .attr("text-anchor", "end")
        .attr("dy", 3);
    },

    //
    //
    //
    draw_ticks : function(chart, years, x_scale, y_scale, format){
      chart.selectAll(".xTicks")
        .data(x_scale.ticks(years.length))
        .enter().append("svg:line")
        .attr("class", "xTicks")
        .attr("x1", function(d) { return x_scale(d); })
        .attr("y1", SVG.height - SVG.margin.top - SVG.margin.bottom)
        .attr("x2", function(d) { return x_scale(d); })
        .attr("y2", SVG.height - SVG.margin.top - SVG.margin.bottom + 5)

      chart.selectAll(".yTicks")
        .data(y_scale.ticks(10))
        .enter().append("svg:line")
        .attr("class", "yTicks")
        .attr("y1", function(d) { return y_scale(d); })
        .attr("x1", SVG.margin.left - 5)
        .attr("y2", function(d) { return y_scale(d); })
        .attr("x2", SVG.margin.left)
    }

    //
    //
    //
    

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});