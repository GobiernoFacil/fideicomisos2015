// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade/views
// @file     : dom_manager.js
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
      Template  = require('text!templates/container_template.html'),
      TagName   = "div",
      ClassName = "bar-container",
      Base_url  = "/fideicomiso/",

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
    initialize : function(){
      this._data = {
        trusts : this.model.get('categories_num'),
        total  : this.model.get('categories')[0].get('total'),
        title  : this.model.get('categories')[0].get('title')
      };
      console.log(this._data);
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