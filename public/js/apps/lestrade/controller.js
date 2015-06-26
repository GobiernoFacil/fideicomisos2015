// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/watson
// @file     : controller.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

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
      controller_el = "body",
      categories    = TRUSTS_DATA.categories,
      trusts        = TRUSTS_DATA.trust_array,
      category      = TRUSTS_DATA.category,
      collection    = new Backbone.Collection(trusts);
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
      this.collection = collection;
      this.categories = categories;
      this.category   = category;
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( D A T A )
    // ------------------------------------------------------------------------------
    //

  

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
        console.log(cat);
        var search = {};
        search[this.category] = cat;
        collections.push(this.collection.where(search));
      }, this);

      this.collections = collections;
    }
   
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});