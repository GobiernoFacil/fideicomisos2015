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
      Treemap = require("views/treemap"); 

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
      this.treemap = new Treemap;
    },
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});