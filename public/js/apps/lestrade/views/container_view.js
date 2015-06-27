// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade/views
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
      Template  = require('text!templates/container_template.html'),
      TagName   = "div",

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      No_definido   = "DESCONOCIDO";

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  // --------------------------------------------------------------------------------
  //
  var container = Backbone.View.extend({

    // 
    // [ SET THE CONTAINER ]
    //
    //
    tagName : TagName,

    //
    // T E M P L A T E S
    // ------------------------------------------------------------------------------
    //
    template : _.template(Template),

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      this.listenTo(this.model, 'remove', this.remove);
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render : function(){
      var title  = this.model.get('title'),
          trusts = this.model.get('trusts'),
          total  = trusts.length,
          data   = {title : title, total : total};

          this.$el.append(this.template(data));

          trusts.forEach(function(m){
            var designation = m.get('designation') || No_definido;
            this.$('ul').append('<li>' + designation + '</li>');
          }, this);

          return this;
    },

    render_trust : function(trust_model){
    },
   

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
  });

  return container;
});