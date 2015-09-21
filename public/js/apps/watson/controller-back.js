// Watson - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/watson
// @file     : controller.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      DOM_manager = require('dom_manager'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //

  fields    = TRUSTS_DATA.fields,
  years     = TRUSTS_DATA.years,
  total     = TRUSTS_DATA.total,
  Is_admin  = TRUSTS_DATA.admin;
  token     = document.getElementById("_token").value,
  controller_el = 'body',
  model_obj = {
    by_fields    : new Backbone.Collection,
    by_filters   : [],
    current_page : 0,
    fields       : new Backbone.Collection(fields),
    page_size    : 50,
    query        : "",
    query_total  : 0,
    query_pages  : 1,
    trusts       : [],
    trusts_total : total,
    years        : years.slice(0),
    _token       : token
  },

  endpoint  = "/sherlock/search",
  Model     = Backbone.Model.extend({urlRoot  : endpoint}),

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  year_inputs        = document.querySelectorAll("#search-by-year input"),
  field_inputs       = document.querySelectorAll("#select-visible-fields input"),
  order_field_select = document.querySelector("select[name='order-field']"),
  order_sort_select  = document.querySelector("select[name='order-sort']"),
  order_list         = document.querySelector("#order-by-field ul"),
  search_field_input = document.querySelector("input[name='search-string']"),
  trusts_table       = document.getElementById("results");

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'change #search-by-year input'  : 'update_years_array',
      'change #select-visible-fields input' : 'update_fields_array',
      'click #all-years'              : 'select_all_years',
      'click #all-fields'             : 'select_all_fields',
      'click #add-sort-field'         : 'add_sort_field',
      'click #order-by-field .delete' : 'remove_sort_field',
      'click .results-control-prev'   : 'call_sherlock_prev',
      'click .results-control-next'   : 'call_sherlock_next',
      'submit #the-search-app'        : 'call_sherlock'
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
      model_obj.current_fields = model_obj.fields.pluck('name');
      this.model      = new Model(model_obj);
      this.collection = new Backbone.Collection;
      DOM_manager.render_fields_list(order_field_select, fields);

      this.listenTo(this.model, 'sync', this.on_model_update);

      // just for testing
      this.dom_manager = DOM_manager;
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
          _index = this.model.get("years").indexOf(_year);

      // [2.1] si se seleccionó y el año no está en el array, lo agrega
      if(_add && _index === -1){
        this.model.get("years").push(_year);
      }
      // [2.2]si se deseleccionó y el año está en el array, lo remueve
      else if(! _add && _index !== -1){
        this.model.get("years").splice(_index, 1);
      }
    },

    //
    // [ ADD ALL YEARS TO THE QUERY ]
    //
    //
    select_all_years : function(e){
      e.preventDefault();
      // [1] agrega todos los años al array de years
      this.model.set({years : years.slice(0)});
      // [2] selecciona todos los checkbox de año
      DOM_manager.check_years(year_inputs);
    },

    //
    // [ ADD ALL FIELDS TO THE RESULT ]
    //
    //
    select_all_fields : function(e){
       e.preventDefault();
      // [1] agrega todos los años al array de fields
      this.model.set({current_fields : this.model.get('fields').pluck('name')});
      // [2] selecciona todos los checkbox de campos
      DOM_manager.check_fields(field_inputs);
      // [3] actualiza la tabla de resultados
      this.render_response();
    },

    //
    // [ ADD OR REMOVE A FIELD FROM RESULT TABLE ]
    //
    //
    update_fields_array : function(e){
      // [1] obtiene el campo; revisa si se seleccionó o deseleccionó;
      //     y busca si el campo está en el array de fields o no
      var _field  = e.target.value,
          _add    = e.target.checked,
          _index = this.model.get("current_fields").indexOf(_field);
          console.log(_field, _add, _index);
      // [2.1] si se seleccionó y el campo no está en el array, lo agrega
      if(_add && _index === -1){
        this.model.get("current_fields").push(_field);
      }
      // [2.2]si se deseleccionó y el campo está en el array, lo remueve
      else if(! _add && _index !== -1){
        this.model.get("current_fields").splice(_index, 1);
      }

      this.render_response();
    },

    //
    // [ ADD A FIELD TO THE SORT LIST ]
    //
    //
    add_sort_field : function(e){
      e.preventDefault();
      // [1] obtiene el orden, campo y nombre para generar el objeto de búsqueda
      var _field  = order_field_select.value,
          _order  = order_sort_select.value,
          _f_list = this.model.get('fields'),
          _model  = _f_list.findWhere({name : _field}),
          _name   = _model.get('full_name'),
          _obj    = {field : _field, order : _order, name : _name},
          _new_model;

      // [2] si no existe el campo en la lista de elementos por
      //     ordenar, lo agrega.
      //     Hay un listener para la colección; cuando se agrega un modelo,
      //     se llama a la función DOM_manager.add_sort_item
      if(!this.model.get("by_fields").findWhere({field : _field})){
        _new_model = this.model.get("by_fields").add(_obj);
        DOM_manager.add_sort_item(order_list, _new_model);
      }
    },

    //
    // [ REMOVE A FIELD FROM THE SORT LIST ]
    //
    //
    remove_sort_field : function(e){
      e.preventDefault();
      // [1] obtiene el model y el html por eliminar
      var _el    = e.currentTarget.parentNode,
          _cid   = _el.getAttribute("data-cid"),
          _coll  = this.model.get('by_fields'),
          _model = _coll.get(_cid);

      // [2] elimina el modelo de la colección y elimina el li
      _coll.remove(_model);
      DOM_manager.remove_sort_item(_el);
    },

    //
    // [ MAKE A QUERY TO SHERLOCK ]
    //
    //
    call_sherlock : function(e){
      e.preventDefault();
      this.model.set({query : search_field_input.value.trim()});
      this.model.save();
    },

    //
    // [ MAKE A QUERY TO SHERLOCK (PREV) ]
    //
    //
    call_sherlock_prev : function(e){
      e.preventDefault();
      var _current_page = this.model.get('current_page'),
          _page_size    = this.model.get('page_size'),
          _query_total  = this.model.get('query_total'),
          _total_pages  = _query_total ? Math.ceil(_query_total/_page_size): 1;

      if(!_current_page || !_query_total) return;

      this.model.set({current_page : _current_page - 1});
      this.model.set({query : search_field_input.value.trim()});
      this.model.save();
    },

    //
    // [ MAKE A QUERY TO SHERLOCK (NEXT) ]
    //
    //
    call_sherlock_next : function(e){
      e.preventDefault();
      var _current_page = this.model.get('current_page'),
          _page_size    = this.model.get('page_size'),
          _query_total  = this.model.get('query_total'),
          _total_pages  = _query_total ? Math.ceil(_query_total/_page_size): 1;

      if(_current_page == _total_pages - 1 || !_query_total) return;

      this.model.set({current_page : 1 + _current_page});
      this.model.set({query : search_field_input.value.trim()});
      this.model.save();
    },

    //
    // L I S T E N E R S
    // ------------------------------------------------------------------------------
    //

    //
    // M O D E L   M E T H O D S
    // ------------------------------------------------------------------------------
    //

    //
    // [ R E N D E R   T H E   R E S P O N S E ]
    //
    //
    on_model_update : function(model, response, options){
      this.collection.reset(response.trusts);

      this.model.set({
        current_page : 0,
        query_pages : Math.ceil(this.model.get('query_total') / this.model.get('page_size'))
      });

      this.render_response();
    },

    render_response : function(){
      fields_to_render = this._get_current_fields();
      DOM_manager.render_trusts(trusts_table, this.collection, fields_to_render);

      var _page_num_el = this.$(".results-control-page")[0];
      var _pagination = {
        page_num : 1 + this.model.get('current_page'),
        pages    : this.model.get('query_pages'),
        results  : this.model.get('query_total')
      };
      DOM_manager.render_page_num(_pagination, _page_num_el);
    },

    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    _get_current_fields : function(){
      var _current_fields = this.model.get('current_fields'),
          _fields         = this.model.get('fields'),
          _response       = [];

      _response.push(new Backbone.Model({full_name : " ", name : 'link'}));

      _current_fields.forEach(function(field){
        _response.push(_fields.findWhere({name : field}));
      });

      return _response;
    }

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});