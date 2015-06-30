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
      'click #category-selector a' : 'generate_basic_data'
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
      // el orden para organizar los contenidos
      this.sort_order = [];
      // llena la colección de títulos para el menú
      this._set_titles();

      // [ DEV ]
      // access to the dom_manager
      this.dom_manager = Dom_manager;


    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //
    generate_basic_data : function(e){
      e.preventDefault();

      // console.log(e.currentTarget.previousElementSibling);
      var data     = [],
          search   = {},
          category = e.currentTarget.getAttribute('data-trigger'),
          labels   = this.titles.findWhere({category : category}).get('items');

      this._set_sort_category(category);
      
      labels.forEach(function(lb){
        search[category] = lb;
        data.push({
          category : category,
          title    : lb ? lb : No_definido,
          trusts   : this.collection.where(search)
        });
      }, this);

      data.sort(this._sort_basic_data);
      this.current_order.set(data);

      this.current_order.forEach(function(m){
        Dom_manager.render_container(m);
      });
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
    // D 3   D A T A
    // ------------------------------------------------------------------------------
    //
    render_category_bars : function(){
      var _d3_data  = [],
          _extent   = null,
          _distinct = null;
      this.current_order.each(function(m){
        _d3_data.push({
          label : m.get('title'),
          total : m.get('trusts').length
        });
      });
      _distinct = _d3_data.map(function(d){return d.total});

      console.log(_distinct.sort());
      //_distinct = _.uniq();
      //_extent = d3.extent(_distinct);
      // this.dom_manager.render_d3_bars(_d3_data, _extent, _distinct);
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