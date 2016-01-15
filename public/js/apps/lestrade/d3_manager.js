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
  var d3 = require("d3"),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  tree     = null,
  svg      = null,
  data     = null, 
  Nodes    = null,
  _i       = 0,
  diagonal = d3.svg.diagonal().projection(function(d){return [d.y, d.x]});

  //
  // I N I T I A L I Z E   T H E   D 3   M A N A G E R
  // --------------------------------------------------------------------------------
  //
  var d3_manager = {

    //
    // [ RENDER STATIC TREE ]
    //
    static_tree : function(_svg, _data, settings){

      this._initialize_tree(_svg, _data, settings);

      var nodes = tree.nodes(data),
          links = tree.links(nodes);

      var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

      var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .on("click", function(d){console.log(d);});

      node.append("circle").attr("r", 4.5);

      node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.title; });
    },

    //
    // [ RENDER INTERACTIVE TREE ]
    //

    live_tree : function(_svg, _data, settings){
      this._initialize_tree(_svg, _data, settings);
      this._render_live_tree(data);

      var drag = d3.behavior.drag();
      
      svg.call(drag);

      drag.on("drag", function(d){
        console.log(d, d3.mouse(this));
      });
    },

    //
    //
    //
    _render_live_tree : function(source){
      var nodes = tree.nodes(data).reverse();
      this._render_live_tree_nodes(nodes, source);
      this._render_live_tree_links(nodes, source);
    },

    //
    //
    //
    _render_live_tree_nodes : function(nodes, source){
      var that = this;
      nodes.forEach(function(d){
        var x_width;
        if(d.depth == 4){
          x_width = 0;
        }
        else if(d.depth == 3){
          x_width = -250;
        }
        else{
          x_width = 0;
        }
        d.y = d.depth * 300 - x_width;
      });

      var node = svg.selectAll("g.node").data(nodes, function(d){
        return d.id || (d.id = ++_i);
      });

      var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d){
              return "translate("+ source.y0 +", " + source.x0 + ")";
            })
            .on("click", function(d){
              that._toogle_live_tree_nodes(d);
              that._render_live_tree(d);
            });

      nodeEnter.append("svg:circle")
        .attr("r", 5)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      var nodeUpdate = node.transition()
            .attr("transform", function(d){
              return "translate(" + d.y + "," + d.x + ")";
            });
      
      nodeUpdate.select("circle")
        .attr("r", 5)
        .style("fill", function (d){
          return d._children ? "lightsteelblue" : "#fff";
        });

      var nodeExit = node.exit().transition()
            .attr("transform", function(d){
              return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

      nodeExit.select("circle").attr("r", 5);

      that._render_live_tree_labels(nodeEnter, nodeUpdate, nodeExit);

      nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },

    //
    //
    //
    _render_live_tree_links : function(nodes, source){
      var link = svg.selectAll("path.link")
                .data(tree.links(nodes), function (d) {
                    return d.target.id;
                });
        link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });
        link.transition()
                .attr("d", diagonal);
        link.exit().transition()
                .attr("d", function (d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();
    },

    //
    //
    //
    _toogle_live_tree_nodes : function(d){
      if(d.children){
        d._children = d.children;
        d.children = null;
      }
      else{
        d.children = d._children;
        d._children = null;
      }
    },

    _toogle_all_live_tree_nodes : function(d){
      if(d.children){
        d.children.forEach(this._toogle_all_live_tree_nodes(d));
        this._toogle_live_tree_nodes(d);
      }
    },

    //
    //
    //
    _render_live_tree_labels : function(nodeEnter, nodeUpdate, nodeExit){
      nodeEnter.append("svg:text")
                .attr("x", function (d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function (d) {
                    return d.title;
                })
                .style("fill-opacity", 0);
        nodeUpdate.select("text")
                .style("fill-opacity", 1);
        nodeExit.select("text")
                .style("fill-opacity", 0);
    },


    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //

    //
    //
    //
    _initialize_tree : function(_svg, _data, settings){
      if(! tree){
        tree  = this._generate_tree_layout(settings);
      }
      if(!svg){
        svg = this._generate_svg_container(_svg, settings);
      }
      if(!data){
        data = _data;
        data.x0 = (settings.height - settings.top - settings.bottom) / 2;
        data.y0 = 0;
      }
    },

    //
    //
    //
    _generate_tree_layout : function(settings){
      return d3.layout.tree()
        .size([
          settings.height - settings.top - settings.bottom,
          settings.width - settings.left - settings.right
        ]);
    },

    //
    //
    //
    _generate_svg_container : function(svg, settings){
      var container =  svg.append("g")
        .attr("class", "tree-container")
        .attr("transform", "translate(" + settings.left + ", " + settings.top + ")");

      container.append("rect")
      .attr("width",settings.width)
      .attr("height", settings.height)
      .attr("fill", "#ddd")
      .attr("transform", "translate(-" + settings.left + ", -" + settings.top + ")");
      return container;
    }
  };

  return d3_manager;
});