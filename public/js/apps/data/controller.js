// Data - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/data
// @file     : controller.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone    = require('backbone'),
      d3          = require('d3'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      SVG = {
        width : 700,
        height : 700
      },
      Trusts     = TRUSTS_DATA.trust_array,
      Categories = ["type", "scope", "theme", "branch"], //"unit", "settlor", "fiduciary"],//TRUSTS_DATA.categories,
      Tree       = [Categories[0], Categories[1], Categories[2]],
      Colors     = d3.scale.category20();
 
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
      this.collection = new Backbone.Collection(Trusts);
      // treemap
      var treemap = d3.layout.treemap()
                      .round(false)
                      .size([SVG.width, SVG.height])
                      //.sticky(true),
          _nodes  = this.branch_nodes(),
          nodes   = treemap(_nodes);
      this.render_treemap(nodes);
      this.render_pack();
    },

    //
    // I N I T I A L I Z E   R E N D E R
    // ------------------------------------------------------------------------------
    //
    render_treemap : function(nodes){
      var svg   = d3.select("#branch-treemap"),
          chart = svg.append("svg:svg")
                  .attr("width", SVG.width)
                  .attr("height", SVG.height),

          enter = chart.selectAll("g").data(nodes).enter()
        .append("svg:g");

        enter.append("svg:rect")
          .attr("x", function(d){ return d.x})
          .attr("y", function(d){ return d.y})
          .attr("width", function(d){ return d.dx})
          .attr("height", function(d){ return d.dy})
          .attr("fill", function(d,i){ return Colors(i)});

        enter.append("svg:text")
          .text(function(d){ return d.value})
          .attr("x", function (d) {return d.x+5;})
          .attr("y", function (d) {return d.y+20;})
          .attr("dy", ".35em")
          .attr("text-anchor", "middle");
    },

    //
    //
    //
    render_pack : function(){
      var root = {collection : this.collection, name : "trusts"},
          pack = d3.layout.pack()
                 .sort(null)
                 .size([SVG.width, SVG.height])
                 .value(function(d){
                  return d.collection ? d.collection.length : 1;
                 });

      root.children = this.generate_tree(root, 0);

      var svg   = d3.select("#circle-pack"),
          chart = svg.append("svg:svg")
                  .attr("width", SVG.width)
                  .attr("height", SVG.height),

          enter = chart.selectAll("g").data(pack(root)).enter()
          .append("svg:g");

      enter.append("svg:circle")
          .attr("r", function(d){ return d.r})
          .attr("cx", function(d){ return d.x})
          .attr("cy", function(d){ return d.y})
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 1);
          /*
          .attr("y", function(d){ return d.y})
          .attr("width", function(d){ return d.dx})
          .attr("height", function(d){ return d.dy})
          .attr("fill", function(d,i){ return Colors(i)});
          */
      /*
      enter.append("svg:text")
          .text(function(d){ return d.value})
          .attr("x", function (d) {return d.x+5;})
          .attr("y", function (d) {return d.y+20;})
          .attr("dy", ".35em")
          .attr("text-anchor", "middle");
      */
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //

    //
    // nodes for any level
    //
    generate_tree : function(parent, deep){
      var category  = Categories[deep],
          list      = _.uniq(parent.collection.pluck(category)),
          search    = {},
          childrens = list.map(function(cat){
            search[category] = cat;
            var child = {
              name      : cat, 
              collection : new Backbone.Collection(parent.collection.where(search))
            };
            child.value = child.collection.length;
            child.children = child.collection.map(function(ch){
              return {
                name : ch.get("designation"),
                trust : ch
              };
            });
            return child;
          }, this);

      if(deep + 1 < Categories.length){
        childrens.forEach(function(ch){
          ch.children = this.generate_tree(ch, deep+1);
        }, this);
      }

      return childrens;
    },

    //
    // nodes for one level
    //
    branch_nodes : function(){
      var branches = _.uniq(this.collection.pluck("fiduciary")),
          root     = {name : "branches", children : []};

      branches.forEach(function(branch){
        var el = {name : branch, value : this.collection.where({fiduciary : branch}).length};
        root.children.push(el);
      }, this);

      return root;
    }


   
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});