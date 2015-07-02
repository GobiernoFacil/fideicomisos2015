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
    tree : function(svg, nodes, settings){
      console.log(svg, nodes, settings);
    }
  };

  return d3_manager;
});