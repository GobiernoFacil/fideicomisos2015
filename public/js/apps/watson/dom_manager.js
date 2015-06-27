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
      d3        = require('d3'),
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

    render_trusts : function(table, trusts_collection, fields_models_to_render){
      var _headers = this._render_trust_header(fields_models_to_render);
      var _rows = "";

      trusts_collection.each(function(trust){
        _rows += this._render_trust_row(fields_models_to_render, trust);
      }, this);

      table.querySelector('thead').innerHTML = _headers;
      table.querySelector('tbody').innerHTML = _rows;
    },

    _render_trust_header : function(fields_models_to_render){
      var _header = "<tr>";
      fields_models_to_render.forEach(function(model){
          _header += "<th>" + model.get('full_name') + "</th>";
      });
      _header += "</tr>";

      return _header;
    },

    _render_trust_row : function(fields_models_to_render, trust){
      var _row = "<tr>";
      fields_models_to_render.forEach(function(model){
        _row += "<td>" + trust.get(model.get('name')) + "</td>";
      });
      _row += "</tr>";

      return _row;
    },

    render_page_num : function(pagination_obj, page_container){
      var _pagination_text = pagination_obj.page_num +
                             '/' + pagination_obj.pages +
                             '(' + pagination_obj.results + ')';
      page_container.innerHTML = _pagination_text;
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

    check_fields : function(checkbox_array){
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