// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade/views
// @file     : container_view.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone  = require('backbone'),
      Template  = require('text!templates/container_template.html'),
      Bar       = require('views/bar_view'),
      d3        = require('d3'),
      Velocity  = require('velocity'),
      TagName   = "div",
      ClassName = "bar-container",
      d3_scale  = null,
      bar_array = [],

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      No_definido   = "DESCONOCIDO";

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  // --------------------------------------------------------------------------------
  //
  var container = Backbone.View.extend({

    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
    },

    // 
    // [ SET THE CONTAINER ]
    //
    //
    tagName   : TagName,
    className : ClassName, 

    //
    // T E M P L A T E S
    // ------------------------------------------------------------------------------
    //
    template : _.template(Template),

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(data){
      //console.log(this.model.attributes);
      //console.log(this.model.get('categories')[0].attributes);
      this.settings = data.settings;

      d3_scale = d3.scale.linear()
        .domain(this.model.get('extent'))
        .range([this.settings.bar_min_width, this.settings.bar_max_width]);

      
      this._data = {
        trusts : this.model.get('categories_num'),
        /*
        total  : this.model.get('categories')[0].get('total'),
        title  : this.model.get('categories')[0].get('title'),
        width  : d3_scale(this.model.get('trusts_num')) + this.settings.bar_width_unit,
        height : this.settings.bar_height
        */
      };
      
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render : function(){
      // genera el contenedor inicial
      this.$el.append(this.template(this._data));

      // agrega las barras a cada contenedor
      this.model.get('categories').forEach(function(category, index, array){
        var _bar = new Bar({
          model    : category,
          scale    : d3_scale,
          settings : this.settings
        });

        var _bar_html = _bar.render().el;
        if(index){
          $(_bar_html).hide();
        }
        this.$(".bars-collection").append(_bar_html);
        bar_array.push(_bar);
      }, this);

      
      return this;
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
  });

  return container;
});