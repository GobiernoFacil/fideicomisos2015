// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/adler/views
// @file     : content_img_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  //  [ libraries ]
  var Backbone   = require('backbone'),
      Dropzone   = require('dropzone'),
  //  [ templates ]
      Img_form   = require('text!templates/img_form.html'),
      Img_list   = require('text!templates/img_content.html'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token       = CONFIG_DATA.token,
  Article     = CONFIG_DATA.article,
  Upload_path = CONFIG_DATA.uploads,
  Save_url    = '/articles/content/' + Article.id,
  Upload_url  = "/articles/image/" + Article.id,
  ClassName   = "editable",
  TagName     = "section";

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
      'click .cancel'    : 'render',
      'click .add-image' : 'img_form',
      'click .save'      : 'save',
      'click .kill'      : 'delete',
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
      img  : _.template(Img_list),
      form : _.template(Img_form)
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      this.model.urlRoot = Save_url;
      this.listenTo(this.model, 'sync', this.upload);
      this.listenTo(this.model, 'destroy', this.remove);
      this.controller = settings.controller;
      this.dropZone = null;
      this.content_array = this.unserialize();
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
      m.imgs = this.content_array;

      if(this.model.isNew() && !e){
        this.img_form();
      }
      else{
        this.el.innerHTML = this.templates.img(m);
      }

      return this;
    },

   

    // [ click .save | submit form ]
    // Guarda el contenido en el servidor
    //
    save : function(e){
      if(e !== void 0) e.preventDefault();
      this.model.save();
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
      if(e !== void 0) e.preventDefault();
      var that = this;
      this.el.innerHTML = this.templates.form(this.model.attributes);
      var el         = this.el.querySelector('.dropzone'),
          that       = this,
          myDropzone = new Dropzone(el, {
        url : function(){
          return Upload_url + '/' + that.model.id;
        },
        headers : {
          'X-CSRF-TOKEN' : Token
        },
        maxFiles : 20,
        parallelUploads: 20,
        autoProcessQueue : false
      });

      myDropzone.on('success', function(file, response){
        that.content_array.push(response);
      });

      myDropzone.on('queuecomplete', function(){
        that.serialize();
        console.log(that, that.model.attributes);
        that.model.save();
        that.render();
      });

      this.dropZone = myDropzone;
    },
    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    upload : function(model, response, options){
      this.dropZone.processQueue();
    },

    serialize : function(){
      if(this.model.get('content')){
        this.model.set({
          content : this.model.get('content') + ',' + this.content_array.toString()
        });
      }
      else{
        this.model.set({
          content : this.content_array.toString()
        });
      }
    },

    unserialize : function(){
      var content = this.model.get('content');
      if(content){
        return content.split(',');
      }
      else{
        return [];
      }
    },
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return content;
});