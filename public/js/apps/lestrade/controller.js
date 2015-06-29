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
      this.collection    = collection;
      this.categories    = categories;
      this.definitions   = definitions;
      this.current_order = new Backbone.Collection;

      this._make_collections();

    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //
    generate_basic_data : function(e){
      e.preventDefault();

      var data     = [],
          search   = {},
          category = e.currentTarget.getAttribute('data-trigger'),
          labels   = this.titles.findWhere({category : category}).get('items');

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
   

    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    _make_collections : function(){
      var collections = []

      this.categories.forEach(function(cat){
        var el = {
          category : cat,
          items    : _.uniq(this.collection.pluck(cat))
        }
        collections.push(el);
      }, this);

      this.titles = new Backbone.Collection(collections);
    },

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