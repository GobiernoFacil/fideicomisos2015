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
      Dropzone   = require('dropzone'),
      Title_form = require('text!templates/title_form.html'),
      YT_video   = require('text!templates/youtube_video.html'),
      YT_form    = require('text!templates/youtube_form.html'),
      Area_form  = require('text!templates/textarea_form.html'),
      Img_form   = require('text!templates/img_form.html'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token       = CONFIG_DATA.token,
  Article     = CONFIG_DATA.article,
  Upload_path = CONFIG_DATA.uploads,
  Save_url    = '/articles/content/' + Article.id,
  ClassName   = "editable",
  TagName     = "section",
  Empty_field = "Editar";

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
      'click h2'            : 'title_form',
      'click h3'            : 'title_form',
      'click .editar-video' : 'youtube_form',
      'click .content'      : 'content_form',
      'click .left'         : 'content_form',
      'click .right'        : 'content_form',
      'click img.ed'  : 'img_form',
      'submit .title' : 'save_title',
      'click .kill'   : 'remove_title'
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
      h2   : _.template("<h2><%=content%></h2>"),
      h3   : _.template("<h3><%=content%></h3>"),
      p    : _.template("<p class='content'><%=content%></p>"),
      lq   : _.template("<div class='columna_frase left'><p><%=content%></p></div>"),
      rq   : _.template("<div class='columna_frase right'><p><%=content%></p></div>"),
      af   : _.template(Area_form),
      hxf  : _.template(Title_form),
      yt   : _.template(YT_video),
      ytf  : _.template(YT_form),
      img  : _.template("<p><img class='ed' width='100' height='100'></p>"),
      imgf : _.template(Img_form)
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      this.model.urlRoot = Save_url;
      this.listenTo(this.model, 'destroy', this.remove);
      this.controller = settings.controller;
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

    // [ submit .title ]
    save_title : function(e){
      e.preventDefault();
      var content = this.el.querySelector('textarea').value;
      content = content ? content : this.model.get('content');
      this.model.set({content: content});
      this.model.save(null, {success : this.render.bind(this)});
    },

    remove_title : function(e){
      e.preventDefault();
      this.model.destroy({data : "_token=" + Token, wait : true});
    },

    // [ click .editar-video ]
    youtube_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.ytf(this.model.attributes);
      if(this.model.get("content") === Empty_field){
        this.el.querySelector("textarea").value = "";
      }
      this.el.querySelector("textarea").focus();
    },

    // [ click .content | .left | .right ]
    content_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.af(this.model.attributes);
      if(this.model.get("content") === Empty_field){
        this.el.querySelector("textarea").value = "";
      }
      this.el.querySelector("textarea").focus();
    },

    // []
    img_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.imgf(this.model.attributes);
      var el = this.el.querySelector('.dropzone');
      var myDropzone = new Dropzone(el, {
        url     : "/articles/image/" + this.model.get('article_id'),
        headers : {
          'X-CSRF-TOKEN' : Token
        }
      });
    }
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