// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/adler/views
// @file     : content_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone   = require('backbone'),
      Quill      = require('quill'),
      Title_form = require('text!templates/title_form.html'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token       = CONFIG_DATA.token,
  Article     = CONFIG_DATA.article,
  Upload_path = CONFIG_DATA.uploads,
  Save_url    = '/articles/content/save/' + Article.id,
  Update_url  = '/articles/content/update/' + Article.id,
  ClassName   = "editable",
  TagName     = "section",
  Empty_field = "Edit the stuff";

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
 

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var content = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'click h2' : 'title_form'
    },

    //
    // [ DEFINE THE ELEMENT ]
    //
    tagName   : TagName,
    className : ClassName,

    //
    // [ DEFINE THE TEMPLATES ]
    //
    templates : {
      h2 : _.template("<h2><%=content%></h2>"),
      h3 : _.template("<h3><%=content%></h3>"),
      p  : _.template("<div><%=content%></div>"),
      lq : _.template("<div class='columna_frase left'><p><%=content%></p></div>"),
      hxf : _.template(Title_form),
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){

      this.model = new Backbone.Model({
        article_id : Article.id,
        content    : Empty_field,
        controller : settings.controller,
        order      : 0,
        type       : settings.type
      });
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    // [ submit / ESC / call from controller ]
    render : function(){
      var m = this.model.attributes;

      this.el.innerHTML = this.templates[m.type](m);
      return this;
    },

    // [click h2, h3]
    title_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.hxf(this.model.attributes);
      if(this.model.get("content") === Empty_field){
        this.el.querySelector("input").value = "";
      }
      this.el.querySelector("input").focus();
    },

    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return content;
});