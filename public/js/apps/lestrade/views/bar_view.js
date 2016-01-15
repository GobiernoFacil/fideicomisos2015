// Lestrade - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/lestrade/views
// @file     : bar_view.js
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
      Template  = require('text!templates/simple_bars.html'),
      Trust     = require('text!templates/category-trust.html'),
      TagName   = "div",
      ClassName = "trust-container",
      Base_url  = "/fideicomiso/",
      d3_scale  = null,

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
      Base_path   = "/fideicomiso/", 
      Hide_trusts_btn = "<li><a href='#' class='hide-trusts'>ocultar fideicomisos</a></li>", 
      No_definido = "DESCONOCIDO";

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  // --------------------------------------------------------------------------------
  //
  var container = Backbone.View.extend({

    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'click a.show-trusts' : 'show_trusts',
      'click a.hide-trusts' : 'hide_trusts'
    },

    // 
    // [ SET THE CONTAINER ]
    //
    //
    tagName   : TagName,
    className : ClassName, 

    //
    // T E M P L A T E S
    // ------------------------------------------------------------------------------
    //
    template : _.template(Template),
    trust    : _.template(Trust),

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(data){
      this._data = {
        title  : this.model.get('title'),
        width  : data.scale(this.model.get('total')) + data.settings.bar_width_unit,
        height : data.settings.bar_height,
        total  : this.model.get('total')
      }
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render : function(){
      this.$el.append(this.template(this._data));
      return this;
    },

    render_trusts : function(){
      this.model.get('trusts').forEach(function(trust){
        var t    = trust.attributes,
            data = {
              designation : t.designation,
              base_path   : Base_path,
              registry    : t.registry ? t.registry : t.id
            },
            html = "<li>" + this.trust(data)+ "</li>";
        this.$(".category-trusts").append(html);
      }, this);
      this.$(".category-trusts").append(Hide_trusts_btn);
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //
    show_trusts : function(e){
      e.preventDefault();
      var link = e.currentTarget;
      link.className = "hide-trusts";

      this.render_trusts();
    },

    hide_trusts : function(e){
      e.preventDefault();
      var link = e.currentTarget;
      link.className = "show-trusts";
      this.$(".category-trusts").html("");
    }
  });

  return container;
});