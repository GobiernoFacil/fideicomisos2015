// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade
// @file     : d3_manager.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var d3 = require("d3");

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //

  //
  // I N I T I A L I Z E   T H E   D 3   M A N A G E R
  // --------------------------------------------------------------------------------
  //
  var d3_manager = {
    tree : function(svg, data, settings){
      var tree  = d3.layout.tree()
        .size([
          settings.height - settings.top - settings.bottom,
          settings.width - settings.left - settings.right
        ]);
      var diagonal = d3.svg.diagonal()
        .projection(function(d){return [d.y, d.x]});
      var _svg     = svg.append("g")
        .attr("transform", "translate(" + settings.left + ", " + settings.top + ")");

      var nodes = tree.nodes(data),
          links = tree.links(nodes);

      var link = _svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

      var node = _svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      node.append("circle").attr("r", 4.5);

      node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.title; });
    }
  };

  return d3_manager;
});