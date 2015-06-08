// Watson - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/watson
// @file     : controller.admin.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //

  // [ CONTROLLER DATA ]
  endpoint  = "/sherlock/search",
  fields    = ['year','branch','type','scope','unit','settlor','registry',
              'designation', 'objective','fiduciary','theme','income',
              'yield','expenses','report','availability','availability_type',
              'initial_amount','initial_date','comments','initial_amount_comments'],
  years     = TRUSTS_DATA.years,
  total     = TRUSTS_DATA.total,
  token     = document.getElementById("_token").value,
  controller_el = 'body',
  model_obj = {
    years        : years,
    by_years     : [],
    by_fields    : [],
    by_keywords  : [],
    by_filters   : [],
    current_page : 0,
    page_size    : 50,
    trusts_total : total,
    _token       : token
  },

  Model = Backbone.Model.extend({urlRoot  : endpoint}),

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  controller = Backbone.View.extend({
    
    // 
    // [ SET THE CONTAINER ]
    //
    //
    el : controller_el,

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      this.model = new Model(model_obj);
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});