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
  var Backbone = require('backbone'),
      d3       = require('d3'),
      Barcode  = require("views/barcode"), 
      Treemap  = require("views/treemap"), 
      Pack     = require("views/pack"),
      Trusts   = TRUSTS_DATA.trust_array,
      Popup    = {
        width   : 300,
        height  : 300,
        z_index : 10000
      }
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
      this.barcode    = new Barcode({controller : this});
      this.treemap    = new Treemap({controller : this});
      this.pack       = new Pack;
      this.popups     = [];
    },

    append_popup : function(settings){
      var popup = document.createElement("div");
      popup.className = "popup";
      document.body.appendChild(popup);
      popup.style.left    = settings.x + "px";
      popup.style.top     = settings.y + "px";
      popup.style.width   = "100px";
      popup.style.height  = "100px";
      popup.style.border  = "1px solid red";
      popup.style.display = "block";
      popup.style.position = "absolute";
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});