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
     Num_field   = Num_fields[3],
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
  Bar_width   = 4;

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
      "change #barcode-category" : "set_category",
      "change #barcode-numfield" : "set_numfield"
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
      this.get_data();
    },

    //
    // C O  N T R O L   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    set_category : function(e){
      var category = e.currentTarget.value;
          Category     = Categories[category];
          this.render_table_head();
          this.render_rows();
    },
    set_numfield : function(e){
      var num_field = e.currentTarget.value;
          Num_field = Num_fields[num_field];
          this.update_data();
          //this.render_table_head();
          //this.update_rows();
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
          money     = d3.extent(this.collection.pluck(Num_field)),
          format    =  d3.format("$,"),
          category  = this.definitions.findWhere({name : Category});
      this.$(".money").html(num_field.get("short_name") + ": " + 
        +money[0] + "/" + format(money[1]));
      this.$(".category").html(category.get("short_name"));
    },

    render_rows : function(){
      var categories = _.uniq(this.collection.pluck(Category)),
          search     = {},
          html_array = [],
          svg_array  = [],
          money      = d3.extent(this.collection.pluck(Num_field)),
          tbody      = document.querySelector("tbody"),
          x_scale    = d3.scale.linear()
                       .domain(money)
                       .range([SVG.margin.left, SVG.width - SVG.margin.left - SVG.margin.right]),
          color      = d3.scale.linear()
                       .domain(d3.extent(this.collection.pluck("year")))
                       .range(["grey", "green"]);

      tbody.innerHTML = "";

      for(var i = 0; i < categories.length; i++){
        search[Category] = categories[i];
        var data = this.collection.where(search),
            tr   = document.createElement("tr"),
            td1  = document.createElement("td"),
            td2  = document.createElement("td"),
            td3  = document.createElement("td"),
            txt1 = document.createTextNode(categories[i]),
            txt3 = document.createTextNode(data.length),
            svg  = this.render_barcode(x_scale, data, td2, color);

        td1.appendChild(txt1);
        td3.appendChild(txt3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
      }
    },

    update_rows : function(){
      var tbody      = document.querySelector("#barcode-chart tbody"),
          svgs       = d3.selectAll("tbody svg")[0],
          categories = _.uniq(this.collection.pluck(Category)),
          search     = {},
          html_array = [],
          svg_array  = [],
          money      = d3.extent(this.collection.pluck(Num_field)),
          x_scale    = d3.scale.linear()
                       .domain(money)
                       .range([SVG.margin.left, SVG.width - SVG.margin.left - SVG.margin.right]);

      for(var i = 0; i < categories.length; i++){
        search[Category] = categories[i];
        var data = this.collection.where(search);
        var bars = d3.select(svgs[i]).selectAll(".barcode")
                     .data(data)
                     .transition()
                     .attr("x", function(d){
                       return x_scale(+d.get(Num_field))
                     });
      }
    },

    render_barcode : function(x_scale, data, td, color_scale){
      var svg  = d3.select(td).append("svg:svg")
                 .attr("width", SVG.width)
                 .attr("height", SVG.height),
          g    = svg.append("svg:g")
                 .attr("transform", "translate(" + SVG.margin.left + " " + SVG.margin.right + ")"),
          rect = g.selectAll("rect").data(data).enter()
                 .append("svg:rect")
                 .attr("width", Bar_width)
                 .attr("class", "barcode")
                 .attr("height", SVG.height)
                 //.attr("fill", "black")
                 .attr("fill", function(d){
                   return color_scale(+d.get("year"))
                 })
                 .attr("x", function(d){
                   return x_scale(+d.get(Num_field))
                 })
                 .on("click", function(d, e){
                  console.log(d,e, d3.mouse(this), window.event.pageX, window.event.pageY);
                 });
      return svg;
    },
    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    get_data : function(){
      var that = this;
      $.get(Url + "/" + Num_field, {}, function(d){
        that.collection.reset(d);
        that.render_table_head();
        that.render_rows();
        document.querySelector("#barcode-category").disabled = false;
        document.querySelector("#barcode-numfield").disabled = false;
      }, "json");
    },

    update_data : function(){
      var that = this;
      $.get(Url + "/" + Num_field, {}, function(d){
        that.collection.reset(d);
        that.render_table_head();
        that.update_rows();
      }, "json");
    }

  });
    

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return content;
});