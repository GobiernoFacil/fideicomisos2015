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
    by_years     : years.slice(0),
    by_fields    : new Backbone.Collection,
    by_keywords  : new Backbone.Collection,
    by_filters   : new Backbone.Collection,
    current_page : 0,
    page_size    : 50,
    trusts_total : total,
    _token       : token
  },

  Model = Backbone.Model.extend({urlRoot  : endpoint}),

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  year_inputs         = document.querySelectorAll("#search-by-year input"),
  order_field_select  = document.querySelector("select[name='order-field']"),
  order_sort_select   = document.querySelector("select[name='order-sort']"),
  order_list          = document.querySelector("#order-by-field ul"),
  search_field_select = document.querySelector("select[name='search-field']"),
  search_field_input  = document.querySelector("input[name='search-string']");

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'change #search-by-year input' : 'update_years_array',
      'click #all-years'             : 'select_all_years',
      'click #add-sort-field'        : 'add_sort_field',
      'click #add-search-field'      : 'add_search_field',
      'submit #the-search-app'       : 'call_sherlock'
    },

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
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //

    //
    // [ ADD OR REMOVE YEAR FROM QUERY ]
    //
    //
    update_years_array : function(e){
      console.log(e);
      console.log("update_years_array");
    },

    //
    // [ ADD ALL YEARS TO THE QUERY ]
    //
    //
    select_all_years : function(e){
      e.preventDefault();
      this.model.set({by_years : years.slice(0)});
      console.log("select_all_years");
    },

    //
    // [ ADD A FIELD TO THE SORT LIST ]
    //
    //
    add_sort_field : function(e){
      console.log("add_sort_field");
    },

    //
    // [ ADD A SEARCH FIELD ]
    //
    //
    add_search_field : function(e){
      e.preventDefault();
      console.log("add_search_field");
    },

    call_sherlock : function(e){
      e.preventDefault();
      this.model.save();
      console.log("call_sherlock");
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});