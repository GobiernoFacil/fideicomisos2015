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
  var Backbone = require('backbone'),
      Quill    = require('quill'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token       = CONFIG_DATA.token,
  Article     = CONFIG_DATA.article,
  Upload_path = CONFIG_DATA.uploads,
  Save_url    = '/articles/content/save/' + Article.id,
  Update_url  = '/articles/content/update/' + Article.id,
  Small_field = "El Coloso, creación de Juan Carlos Canfield, compartió el espacio de una enorme explanada con un estacionamiento, propiedad de la SEP.";
  Big_field   = "El gobierno federal encabezado por el entonces presidente Felipe Calderón Hinojosa decidió “transparentar” el uso de los recursos del Fideicomiso Bicentenario y al desmenuzar cada una de las facturas otorgadas a EL UNIVERSAL, éste encontró no sólo irregularidades en la forma en cómo se gastaron los recursos. Se observaron sobrecostos, ejercicio del gasto por parte de empresas inexpertas e incluso fondos no reportados.";
  Title_field = "Título";  

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
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      var content;
      switch(settings.type){
        case "h2":
          content = Title_field;
          break;
        case "h3":
          content = Title_field;
          break;
        case "p":
          content = Big_field;
          break;
        case "l-quote":
          content = Small_field;
          break;
        default:
          content = Title_field;
          break;
      }

      this.model = new Backbone.Model({
        article_id : Article.id,
        type       : settings.type,
        content    : content,
        order      : 0
      });
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render : function(){
      if(this.model.get('type') == "l-quote"){
        this.el.innerHTML = '<p class="lafrase">' + this.model.get('content') + '</p>';
      }
      else{
        this.el.innerHTML = this.model.get('content');
      }
      return this;
    }


    //
    // D I R E C T   I N T E R A C T I O N
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
  return content;
});