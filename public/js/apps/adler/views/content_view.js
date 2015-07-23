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
  //  [ libraries ]
  var Backbone   = require('backbone'),
      Quill      = require('quill'),
      Dropzone   = require('dropzone'),
  //  [ templates ]
      Title_form = require('text!templates/title_form.html'),
      YT_video   = require('text!templates/youtube_video.html'),
      YT_form    = require('text!templates/youtube_form.html'),
      Input_form = require('text!templates/input_form.html'),
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
      'click h2'            : 'input_form',
      'click h3'            : 'input_form',
      'click .editar-video' : 'input_form',

      'click .content' : 'content_form',
      'click .left'    : 'content_form',
      'click .right'   : 'content_form',

      'click .kill'   : 'delete',
      'click .cancel' : 'render',
      'click .save'   : 'save',
      'submit form'   : 'save',

      'click img.ed'  : 'img_form'
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
      inf  : _.template(Input_form),
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
    // Genera el HTML del elemento seleccionado
    //
    render : function(e){
      if(e !== void 0) e.preventDefault();
      var m = this.model.attributes;

      this.el.innerHTML = _.unescape(this.templates[m.type](m));
      return this;
    },

    // [ click h2, h3 ]
    // Genera un input para editar el contenido
    //
    input_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.inf(this.model.attributes);
      this.el.querySelector("input").focus();
    },

    // [ click .content | .left | .right ]
    // Genera un textarea para editar el contenido
    //
    content_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.af(this.model.attributes);
      if(this.model.get("content") === Empty_field){
        this.el.querySelector("textarea").value = "";
      }
      this.el.querySelector("textarea").focus();
    },

    // [ click .save | submit form ]
    // Guarda el contenido en el servidor
    //
    save : function(e){
      e.preventDefault();
      // [1] obtiene el valor del campo. Si este está vacío, deja el que 
      //     tenía el modelo.
      var input   = this.el.querySelector('input[type="text"]') || this.el.querySelector('textarea'),
          content = _.unescape(input.value);
      content = content ? content : this.model.get('content');
      // [2] actualiza el modelo y lo salva. Al salvarlo, genera el HTML del contenido
      this.model.set({content: content});
      this.model.save(null, {success : this.render.bind(this, void 0)});
    },

    // [ click .kill ]
    // Elimina el contenido
    //
    delete : function(e){
      console.log(e);
      e.preventDefault();
      // [1] elimina el modelo. Al ser eliminado, el view también desaparece
      this.model.destroy({data : "_token=" + Token, wait : true});
    },

    // []
    img_form : function(e){
      e.preventDefault();
      this.el.innerHTML = this.templates.imgf(this.model.attributes);
      var el         = this.el.querySelector('.dropzone'),
          that       = this,
          myDropzone = new Dropzone(el, {
        url     : function(){
          return "/articles/image/" + that.model.get('article_id');
        },
        headers : {
          'X-CSRF-TOKEN' : Token
        },
        autoProcessQueue : false
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