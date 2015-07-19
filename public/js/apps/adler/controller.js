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
      Content  = require('views/content_view'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token         = CONFIG_DATA.token,
  Article       = CONFIG_DATA.article,
  Upload_path   = CONFIG_DATA.uploads,
  Controller_el = "body",
  Update_url    = '/articles/update/' + Article.id,
  Empty_field   = "Editar",


  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  Publish_bar  = document.querySelector('.publicar-articulo'),
  Add_content  = document.getElementById('add-more-content'),
  Content_type = document.querySelector('#add-more-content select');
 

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'click .publicar-articulo' : 'publish',
      'click .input'             : 'make_input',
      'submit #add-more-content' : 'add_content'
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
      // this.Quill = Quill;
      // editor = new app.Quill("#editor", {theme: "snow", modules : {"toolbar" : { container : "#toolbar"}, 'link-tooltip': true}});
    },

    //
    // D I R E C T   I N T E R A C T I O N
    // ------------------------------------------------------------------------------
    //

    // [click .publicar-articulo]
    // Publica u oculta el artículo
    // 
    publish : function(e){
      e.preventDefault();
      if(+this.model.get('public')){
        this.updater('public', 0);
        Publish_bar.innerHTML = "Publicar";
      }
      else{
        Publish_bar.innerHTML = "Ocultar";
        this.updater('public', 1);
      }
    },

    // [click .input]
    // cambian un span por un input
    //
    make_input : function(e){
      // [ CLOSE OTHER FIELDS ]
      this.close_fields();

      // [ GENERATE THE INPUT ]
      var old    = e.currentTarget,
          parent = old.parentNode,
          field  = old.getAttribute('data-field'),
          input  = field == "lead" ? document.createElement('textarea') : document.createElement('input'),
          value  = this.model.get(field) ? this.model.get(field) : Empty_field;
      parent.replaceChild(input, old);
      input.name = field;
      input.value = value;
      input.classList.add("editable");

      // [ ADD A LISTENER TO THE ENTER ]
      window.onkeyup = null;
      window.onkeyup = this.keyboard_listener.bind(this, input);
    },

    // [submit #add-more-content]
    // agrega un nuevo campo de edición
    //
    add_content : function(e){
      e.preventDefault();

      var content = new Content({
        type       : Content_type.value,
        controller : this
      });

      $(Add_content).before(content.render().el);
    },

    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //

    //
    //
    //
    save_field : function(_input){
      var _field = _input.name,
          _value = _input.value,
          that   = this;

      this.updater(_field, _value, function(){
        that.close_fields([_input]);
      });

    },

    //
    //
    //
    updater : function(field, value, callback){
      var that   = this,
          msg    = {};
      msg[field] = value;
      msg._token = Token;
      $.post(Update_url, msg, function(data){
        that.model.set(data);
        if(callback !== void 0) callback();
      }, 'json');
    },

    close_fields : function(inputs){
      var _fields = inputs || document.querySelectorAll('input.editable');
      if(_fields.length){
        _.each(_fields, function(_field){
          var old    = _field,
              parent = old.parentNode,
              span   = document.createElement('span'),
              field  = old.name,
              value  = this.model.get(field) ? this.model.get(field) : Empty_field;
          parent.replaceChild(span, old);
          span.setAttribute("data-field", field);
          span.classList.add("input");
          span.innerHTML = value;
        }, this);
      }
    },

    keyboard_listener : function(_input, e){
      if(e.keyCode === 13 && e.target == _input){
        this.save_field(_input);
      }
      else if(e.keyCode === 27){
        this.close_fields([_input]);
      }
    }


   

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});