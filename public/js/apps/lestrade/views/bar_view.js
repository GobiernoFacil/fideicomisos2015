// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade/views
// @file     : bar_view.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone  = require('backbone'),
      d3        = require('d3'),
      Velocity  = require('velocity'),
      Template  = require('text!templates/simple_bars.html'),
      Trust     = require('text!templates/category-trust.html'),
      TagName   = "div",
      ClassName = "bar-container",
      Base_url  = "/fideicomiso/",
      d3_scale  = null,

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
    trust    : _.template(Trust),

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(data){
      /*
      var _bar = new Bar({
          model    : category,
          scale    : d3_scale,
          settings : this.settings
        });
      */

      /*
        total  : this.model.get('categories')[0].get('total'),
        title  : this.model.get('categories')[0].get('title'),
        width  : d3_scale(this.model.get('trusts_num')) + this.settings.bar_width_unit,
        height : this.settings.bar_height
        */
      this._data = {
        title  : this.model.get('title'),
        width  : data.scale(this.model.get('total')) + data.settings.bar_width_unit,
        height : data.settings.bar_height,
        total  : this.model.get('total')
      }
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render : function(){
      this.$el.append(this.template(this._data));
      return this;
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
  });

  return container;
});