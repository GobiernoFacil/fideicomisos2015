// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade
// @file     : dom_manager.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone      = require('backbone'),
      d3            = require('d3'),
      Velocity      = require('velocity'),
      Container     = require('views/container_view'),
      D3_manager    = require('d3_manager'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      d3_data_cache = null,
      graph_settings  = {
        // SVG container settings
        top    : 20,
        right  : 200,
        bottom : 100,
        left   : 150,
        width  : 1200,
        height : 2000,
        // barchart settings
        bar_container_width : 100,
        bar_min_width       : 5,
        bar_max_width       : 80,
        bar_height          : "2em",
        bar_width_unit      : "%"
      },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
      the_bars_container = document.getElementById('the-stuff'),
      the_svg_container  = document.getElementById('the-basic-graphics');

  //
  // I N I T I A L I Z E   T H E   D O M   M A N A G E R
  // --------------------------------------------------------------------------------
  //
  var dom_manager = {
    //
    // R E F E R E N C E S
    // ------------------------------------------------------------------------------
    //
    d3_manager : D3_manager,

    //
    // T E M P L A T E S
    // ------------------------------------------------------------------------------
    //

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //

    //
    // [ RENDER CONTAINER ]
    //
    // Esta función agrega una categoría al contenedor de resultados.
    render_container : function(model){
      var _bar_category = new Container({model : model, settings : graph_settings});
      $(the_bars_container).append(_bar_category.render().el);

      return _bar_category;
    },

    //
    // [ RENDER TREE MAP ]
    //
    render_tree_map : function(nodes){
      var _svg = this.render_svg();
      this.d3_manager.tree(_svg, nodes, graph_settings);
    },

    //
    // R E N D E R   H E L P E R S
    // ------------------------------------------------------------------------------
    //
    render_svg : function(){
      if(the_svg_container.querySelector('svg')){
        return d3.select(the_svg_container).select("svg");
      }
      else{
        return d3.select(the_svg_container).append("svg:svg")
               .attr("width", graph_settings.width)
               .attr("height", graph_settings.height);
      }
    },
   

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
  };

  return dom_manager;
});