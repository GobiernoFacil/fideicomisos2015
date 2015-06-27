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
  var Backbone  = require('backbone'),
      d3        = require('d3'),
      Velocity  = require('velocity'),
      Container = require('views/container_view'),

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
      the_stuff = document.getElementById('the-stuff');


  var dom_manager = {
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
    // El Modelo de Backbone que recibe contiene: 
    // - category : el identificador de la categoría
    // - title    : el nombre de la categoría
    // - trusts   : array(Backbone Models)
    //     - branch, branch_id, designation, fiduciary, initial_amount, 
    //       registry, scope, settlor, theme, type, unit, year
    render_container : function(model){
      var _container = new Container({model : model});
      $(the_stuff).append(_container.render().el);
    }
   

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
  };

  return dom_manager;
});