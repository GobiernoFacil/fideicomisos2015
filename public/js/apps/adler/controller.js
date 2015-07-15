// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/adler
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
  Token         = CONFIG_DATA.token,
  Article       = CONFIG_DATA.article,
  Upload_path   = CONFIG_DATA.uploads,
  Controller_el = "body",


  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  Publish_bar = document.querySelector('.publicar-articulo');
 

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
    el : Controller_el,

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      this.model = new Backbone.Model(Article);
    },

    //
    // D I R E C T   I N T E R A C T I O N
    // ------------------------------------------------------------------------------
    //
    publish : function(e){
      e.preventDefault();
      if(!this.model.get('public')){
        this.model.set({'public' : 0});
        Publish_bar.innerHTML = "Ocultar";
      }
      else{
        Publish_bar.innerHTML = "Publicar";
      }
    }

   

    //
    // L I S T E N E R S
    // ------------------------------------------------------------------------------
    //

   

    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
   

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});