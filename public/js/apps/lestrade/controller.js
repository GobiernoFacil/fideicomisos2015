// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade
// @file     : controller.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone    = require('backbone'),
      d3          = require('d3'),
      Dom_manager = require('dom_manager'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      controller_el = "body",
      categories    = TRUSTS_DATA.categories,
      definitions   = new Backbone.Collection(TRUSTS_DATA.definitions),
      collection    = new Backbone.Collection(TRUSTS_DATA.trust_array),
      current_bars  = [],
      No_definido   = "DESCONOCIDO";
  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
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
      'click #category-selector a' : 'generate_bars'
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
      // [ COLLECTIONS ]
      // la lista de fideicomisos
      this.collection    = collection;
      // la información de cada categoría
      this.definitions   = definitions;
      // los fideicomisos organizador por categoría
      this.current_order = new Backbone.Collection;
      // el menú para ordenar los fideicomisos
      this.titles = new Backbone.Collection;
      
      // [ ARRAYS ]
      // la lista de categorías disponible
      this.categories    = categories;

      // [ DEV ]
      // access to the dom_manager
      this.dom_manager = Dom_manager;

      // genera la colección de títutlos para las gráficas
      this._set_titles();
    },

    //
    // I N I T I A L I Z E   R E N D E R
    // ------------------------------------------------------------------------------
    //
    render : function(){

    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //

    //
    // [ RENDER THE GRAPHIC BARS ]
    //
    generate_bars : function(e){
      e.preventDefault();
      // console.log(e.currentTarget.previousElementSibling);
      var category = e.currentTarget.getAttribute('data-trigger'),
          data     = this._get_data_for_bars(category);

      current_bars.forEach(function(view){
        view.remove();
      });

      data.each(function(m){
        current_bars.push(this.dom_manager.render_container(m));
      }, this);
    },

    //
    // D 3   D A T A
    // ------------------------------------------------------------------------------
    //

    //
    // [ PREPARE THE DATA FOR THE BAR CHART ]
    //
    _get_data_for_bars : function(category){
      // Genera una colección de secciones según la categoría
      var data   = new Backbone.Collection,
          search = {},
          labels = this.titles.findWhere({category : category}).get('items');

      labels.forEach(function(label){
        search[category] = label;
        
        var new_item = {
          category : category,
          title : label ? label : No_definido,
          trusts : this.collection.where(search)
        };
        new_item.total = new_item.trusts.length;
        
        data.add(new_item);
      }, this);

      // con la colección de secciones, genera una nueva colección
      // que está dividida por número de fideicomisos por sección
      var distinct  = _.uniq(data.pluck('total')),
          response  = new Backbone.Collection,
          d3_extent = d3.extent(distinct);
      distinct.sort(d3.descending);

      distinct.forEach(function(num){
        var group = {
          trusts_num : num,
          categories : data.where({total : num}),
          extent : d3_extent
        }
        group.categories_num = group.categories.length;
        response.add(group);
      });

      return response;
    },

    //
    // [ TREE GENERATOR ]
    //
    _get_childrens : function(parent, categories, pointer){
      var _category   = categories[pointer],
          _collection = parent.collection,
          _list       = _.uniq(_collection.pluck(_category)),
          _childrens  = [],
          _search     = {};

      _list.forEach(function(el){
        _search[_category] = el;
        var _child = {
          title : el,
          collection : new Backbone.Collection(_collection.where(_search))
        };
        _child.total = _child.collection.length;

        _childrens.push(_child);
      }, this);

      if(pointer < categories.length){
        _childrens.forEach(function(ch){
          ch.children = this._get_childrens(ch, categories, pointer+1);
        }, this);
      }

      return _childrens;
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
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //

    //
    // [ SET TITLES ]
    //
    _set_titles : function(){
      // usando las definiciones de cada campo y las categorías disponibles,
      // llena la colección de títulos para el menú:
      // ramo | tipo | ambito | unidad | responsable | ...
      var collections = []
      this.categories.forEach(function(cat){
        var el = {
          category : cat,
          items    : _.uniq(this.collection.pluck(cat))
        }
        collections.push(el);
      }, this);

      this.titles.set(collections);
    },

    //
    // [ MANAGE SORT ORDER ]
    //
    _set_sort_category : function(category){
      // agrega o elimina de la lista de filtros la categoría seleccionada
      var _index = this.sort_order.indexOf(category);

      if(_index === -1){
        this.sort_order.push(category);
        return 1;
      }
      else{
        this.sort_order.splice(_index, 1);
        return 0;
      }
    },

    //
    // [ SORT HELPER ]
    //
    _sort_basic_data : function(a,b){
      return b.trusts.length - a.trusts.length;
    }
   
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});