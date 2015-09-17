// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/data/views
// @file     : barcode_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  //  [ libraries ]
  var Backbone = require('backbone'),
      d3       = require('d3'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
     Url         = "/api/fideicomisos", 
     Definitions = TRUSTS_DATA.definitions,
     Num_fields  = ['income', 'yield', 'expenses', 'availability', 'initial_amount'],
     Num_field   = Num_fields[2],
     Categories  = ["branch", "type", "scope", "theme", "unit", "settlor", "fiduciary"],
     Category    = Categories[3];

  //
  // D E F I N E   T H E   D 3   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  SVG = {
    width  : 400,
    height : 30,
    margin : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
  },
  Money_scale = 1000000,
  Bar_width   = 2;

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
 

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " V I E W "
  // --------------------------------------------------------------------------------
  //
  var content = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{

    },

    //
    // [ DEFINE THE ELEMENT ]
    //
    el : "#barcode-chart",

    //
    // [ DEFINE THE TEMPLATES ]
    //


    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      this.collection  = new Backbone.Collection();
      this.definitions = new Backbone.Collection(Definitions);
    },

    //
    // R E N D E R   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    
    // [ submit / ESC / call from controller ]
    // Genera el HTML del elemento seleccionado
    //
    render : function(e){
      return this;
    },

    render_table_head : function(){
      var num_field = this.definitions.findWhere({name : Num_field}),
          category  = this.definitions.findWhere({name : Category});
      this.$(".money").html(num_field.get("short_name"));
      this.$(".category").html(category.get("short_name"));
    },

    render_rows : function(){
      var categories = _.uniq(this.collection.pluck(Category)),
          search     = {},
          html_array = [],
          svg_array  = [],
          money      = d3.extent(this.collection.pluck(Num_field)),
          x_scale    = d3.scale.linear()
                       .domain(money)
                       .range([SVG.margin.left, SVG.width - SVG.margin.left - SVG.margin.right]);

      for(var i = 0; i < categories.length; i++){
        search[Category] = categories[i];
        var data  = this.collection.where(search),
            tbody = document.querySelector("tbody"),
            tr    = document.createElement("tr"),
            td1   = document.createElement("td"),
            td2   = document.createElement("td"),
            td3   = document.createElement("td"),
            txt1  = document.createTextNode(categories[i]),
            txt3  = document.createTextNode(data.length),
            svg   = this.render_barcode(x_scale, data, td2);

        td1.appendChild(txt1);
        // td2.appendChild(svg);
        td3.appendChild(txt3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
      }
    },

    render_barcode : function(x_scale, data, td){
      var svg  = d3.select(td).append("svg:svg")
                 .attr("width", SVG.width)
                 .attr("height", SVG.height),
          g    = svg.append("svg:g")
                 .attr("transform", "translate(" + SVG.margin.left + " " + SVG.margin.right + ")"),
          rect = g.selectAll("rect").data(data).enter()
                 .append("svg:rect")
                 .attr("width", Bar_width)
                 .attr("height", SVG.height)
                 .attr("fill", "black")
                 .attr("x", function(d){
                   return x_scale(+d.get(Num_field))
                 });
      return svg;
    },
    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    get_data : function(){
      var that = this;
      $.get(Url, {}, function(d){
        that.collection.reset(d);
        console.log("done");
      }, "json");
    }

  });
    

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return content;
});