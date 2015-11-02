// GRAPHS - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/graphs
// @file     : controller.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      d3       = require('d3'),
      Trusts   = TRUSTS_DATA.trusts,
      Year     = TRUSTS_DATA.year,
      Category = TRUSTS_DATA.category.name,
      SVG = {
      width  : 500,
      height : 500,
      margin : {
          top    : 10,
          right  : 10,
          bottom : 10,
          left   : 10
        },
      },
      SCALE    = 1000000,
      Popup    = {
        width   : 300,
        height  : 300,
        z_index : 10000
      },
      Style = d3.format("$,"),
      Blues  = ["#031B33", "#0E2C4A", "#2171b5"],
      Colors = d3.scale.linear()
            .domain([600,300,0])
            .range(Blues);

  //
  // C A C H E   T H E   L A B E L S
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
      this.collection = new Backbone.Collection(Trusts);
      this.colors     = Colors;
      this.root       = null;
      this.treemap    = d3.layout.treemap()
                        .round(false)
                        .size([SVG.width, SVG.height]);

      this.render();
    },

    render : function(){
      var that  = this,
          data  = this.branch_nodes(),
          tree  = this.treemap(data),
          chart = this.render_svg("#graph-main .g-container", SVG),
          nodes = chart.selectAll("g.node")
            .data(tree).enter()
            .append("svg:g")
            .attr("class", "node"),
          rects = nodes.append("svg:rect")
                  .attr("class", "category")
                  .attr("x", function(d){ return d.x})
                  .attr("y", function(d){ return d.y})
                  .attr("width", function(d){ return d.dx})
                  .attr("height", function(d){ return d.dy})
                  .attr("stroke", "white")
                  .attr("stroke-width","2")
                  .attr("fill", function(d,i){ return Colors(d.value)}),

          text = nodes.append("svg:text")
                 .attr("x", function (d) {return d.x+5;})
                 .attr("y", function (d) {return d.y+20;})
                 .attr("dy", ".35em")
                 .attr("text-anchor", "start");

          text.append("tspan")
                   .text(function(d){ 
                     if((d.dx * d.dy) > 1500) {
                       return d.name;
                     }
                   });
          text.append("tspan")
                   .attr("dy", "1.2em")
                   .attr("x", function(d){
                    return d.x + 5;
                   })
                   .text(function(d){ 
                     if((d.dx * d.dy) > 1500) {
                       return d.availability;
                     }
                   });

          paths = nodes.append("svg:clipPath")
          .attr("id", function(d){ return d.id})
          .append("svg:rect")
            .attr("x", function(d){ return d.x})
            .attr("y", function(d){ return d.y})
            .attr("width", function(d){ return d.dx})
            .attr("height", function(d){ return d.dy});

      d3.selectAll("text")
          .attr("clip-path", function(d){ return "url(#" + d.id + ")"});

      rects.on("click", function(e){
            var settings = {x:50, y:50};
            that.controller.append_popup(settings);
          })
          .on("mouseover", function(e){
            console.log(e);
          });
    },

    render_svg : function(div, layout){
      var svg = d3.select(div).append("svg")
                .attr("width", layout.width)
                .attr("height", layout.height)
                .attr("class", "main_graph");

      svg.append('g').attr("class", "main_container");
      return svg;
    },

    //
    // C R E A T E   H E L P E R S
    // ------------------------------------------------------------------------------
    //

    branch_nodes : function(){
      var branches = _.uniq(this.collection.pluck(Category)),
          root     = {name : "branches", children : []},
          where    = {};

      branches.forEach(function(branch, id){
        where[Category] = branch;

        var list  = this.collection.where(where),
            total = list.reduce(function(memo, model){
              var val = +model.get("availability");
              val = val != NaN && val >= 0 ? val : 0;
              return memo + val;
            }, 0),
            el    = {
              name : branch, 
              value : list.length, 
              id : id, 
              availability : Style((total/SCALE).toFixed(2))
            };
        root.children.push(el);
      }, this);

      this.root = root;

      return root;
    },
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});