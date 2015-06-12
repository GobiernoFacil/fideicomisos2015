// Watson - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/watson
// @file     : dom_manager.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone  = require('backbone'),
      Velocity  = require('velocity'),
      Sort_item = require('text!templates/sort-field.html');

  var dom_manager = {
    //
    // T E M P L A T E S
    // ------------------------------------------------------------------------------
    //
    sort_item_template : _.template(Sort_item),

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    render_fields_list : function(ul, fields){
      fields.forEach(function(f){
        $(ul).append("<option value='" + f.name +"'>" + f.full_name + "</option>");
      });
    },

    //
    // D I R E C T   I N T E R A C T I O N   ( H T M L )
    // ------------------------------------------------------------------------------
    //

    //
    // [SELECT ALL YEARS ]
    //
    //
    check_years : function(checkbox_array){
      for(var i = 0; i < checkbox_array.length; i++){
        checkbox_array[i].checked = true;
      }
    },

    //
    // [ ADD ORDER ITEM ]
    //
    //
    add_sort_item : function(ul_node, model){
      var _data = model.attributes;
      _data.cid = model.cid;

      $(ul_node).append(this.sort_item_template(_data));
    },

    //
    // [ REMOVE ORDER ITEM ]
    //
    //
    remove_sort_item : function(li_item){
      $(li_item).remove();
    }
  };

  return dom_manager;
});