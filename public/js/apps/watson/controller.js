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
    by_keywords  : [],
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
      'click .results-control-prev'  : 'call_sherlock_prev',
      'click .results-control-next'  : 'call_sherlock_next',
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
      // [1] obtiene el año, revisa si se seleccionó o deseleccionó
      //     y busca si el año está en el array de años o no
      var _year  = +e.target.value,
          _add   = e.target.checked,
          _index = this.model.get("by_years").indexOf(_year);

      // [2.1] si se seleccionó y el año no está en el array, lo agrega
      if(_add && _index === -1){
        this.model.get("by_years").push(_year);
      }
      // [2.2]si se deseleccionó y el año está en el array, lo remueve
      else if(! _add && _index !== -1){
        this.model.get("by_years").splice(_index, 1);
      }
    },

    //
    // [ ADD ALL YEARS TO THE QUERY ]
    //
    //
    select_all_years : function(e){
      e.preventDefault();
      // [1] agrega todos los años al array de by_year
      this.model.set({by_years : years.slice(0)});
    },

    //
    // [ ADD A FIELD TO THE SORT LIST ]
    //
    //
    add_sort_field : function(e){
      e.preventDefault();
      // [1] obtiene el orden, el campo, y genera el objeto de búsqueda
      var _field = order_field_select.value,
          _order = order_sort_select.value,
          _obj   = {field : _field, order : _order};

      // [2] si no existe el campo en la lista de elementos por
      //     ordenar, lo agrega.
      if(!this.model.get("by_fields").findWhere({field : _field})){
        this.model.get("by_fields").add(_obj);
      }
    },

    //
    // [ ADD A SEARCH FIELD ]
    //
    //
    add_search_field : function(e){
      e.preventDefault();
      var _search = search_field_input.value.trim();

      if(this.model.get("by_keywords").indexOf(_search) !== -1){
        this.model.get("by_keywords").push(_search);
      }
    },

    call_sherlock : function(e){
      e.preventDefault();
      this.model.save();
    },

    call_sherlock_prev : function(e){

    },

    call_sherlock_next : function(e){

    }

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});