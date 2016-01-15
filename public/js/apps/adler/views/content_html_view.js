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
  //  [ templates ]
      Quill_editor = require('text!templates/quill-editor.html'),

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
  Editor      = null,
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
      'click .content' : 'content_form',
      'click .kill'   : 'delete',
      'click .cancel' : 'render',
      'click .save'   : 'save',
      'submit form'   : 'save'
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
      html  : _.template("<div class='content'><%=content%></div>"),
      quill : _.template(Quill_editor)
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
      m.cid = this.model.cid;
      this.el.innerHTML = _.unescape(this.templates.html(m));
      return this;
    },

    // [ click .content ]
    // habilita Quill
    //
    content_form : function(e){
      e.preventDefault();

      var m = this.model.attributes;
      m.cid = this.model.cid;

      this.el.innerHTML = this.templates.quill(m);
      Editor = new Quill('#' + this.model.cid + 'editor', {
        modules: {
          'toolbar': { container: '#' + this.model.cid + 'toolbar' },
          'link-tooltip': true
        },
        theme: 'snow'
      });
      // Editor.addModule('toolbar', { container: '#' + this.model.cid + 'toolbar' });
    },

    // [ click .save | submit form ]
    // Guarda el contenido en el servidor
    //
    save : function(e){
      e.preventDefault();
      var m = Editor.getHTML();
      console.log(m);
      // [1] obtiene el valor del campo. Si este está vacío, deja el que 
      //     tenía el modelo.
      var input   = Editor.getHTML(),
          content = _.unescape(input);
          content = content ? content : this.model.get('content');
      // [2] actualiza el modelo y lo salva. Al salvarlo, genera el HTML del contenido
      this.model.set({content: content});
      this.model.save(null, {success : this.render.bind(this, void 0)});
    },

    // [ click .kill ]
    // Elimina el contenido
    //
    delete : function(e){
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