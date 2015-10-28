// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/data/views
// @file     : treemap.js
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
     Categories  = ["branch", "type", "scope", "theme", "unit", "settlor", "fiduciary"],
     Category    = Categories[3],
     Blues		 = ["#08306b", "#08519c","#2171b5","#4292c6","#6baed6","#9ecae1",],
     Colors      = d3.scale.linear()
     				.domain([300,200,100,50,10,0])
     				.range(Blues);

  //
  // D E F I N E   T H E   D 3   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  SVG = {
    width  : 500,
    height : 500,
    margin : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  TABLE_TITLE = document.querySelector("#branch-treemap caption"), 
  TABLE_BODY  = document.querySelector("#branch-treemap tbody");
 

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " V I E W "
  // --------------------------------------------------------------------------------
  //
  var content = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      "change #treemap-category" : "set_category"
    },

    //
    // [ DEFINE THE ELEMENT ]
    //
    el : "#branch-treemap",

    //
    // [ DEFINE THE TEMPLATES ]
    //


    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      this.controller = settings.controller;
      this.collection  = new Backbone.Collection();
      this.definitions = new Backbone.Collection(Definitions);
      this.treemap     = d3.layout.treemap()
                           .round(false)
                           .size([SVG.width, SVG.height])
      this.get_data();
      this.colors = Colors;
      this.root = null;
    },

    //
    // C O  N T R O L   F U N C T I O N S
    // ------------------------------------------------------------------------------
    //
    set_category : function(e){
      var category = e.currentTarget.value,
          title    = this.$("option[value='" + category + "']").html();
          Category = Categories[category];
          this.update_treemap();
          this.render_table(title);

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

    render_table : function(title, data){
      TABLE_TITLE.innerHTML = title;
      var content = "",
          list = _.sortBy(this.root.children, "name");
      list.forEach(function(cat){
        var row = "<tr>" + "<td>" + cat.name + "</td><td>" + cat.value + "</td></tr>";
        content += row;
      }, this);
      TABLE_BODY.innerHTML = content;
    },

    render_treemap : function(){
      var that  = this,
          data  = this.branch_nodes(),
          tree  = this.treemap(data),
          chart = d3.select("#branch-treemap .g-container").append("svg:svg")
                  .attr("width", SVG.width)
                  .attr("height", SVG.height),

          enter = chart.selectAll("#branch-treemap g").data(tree).enter()
        .append("svg:g");

        enter.append("svg:rect")
          .attr("x", function(d){ return d.x})
          .attr("y", function(d){ return d.y})
          .attr("width", function(d){ return d.dx})
          .attr("height", function(d){ return d.dy})
          .attr("stroke", "white")
          .attr("stroke-width","2")
          .attr("fill", function(d,i){ return Colors(d.value)});

        enter.append("svg:text")
          .text(function(d){ return d.name})
          .attr("x", function (d) {return d.x+5;})
          .attr("y", function (d) {return d.y+20;})
          .attr("dy", ".35em")
          .attr("text-anchor", "start");

        enter.append("svg:clipPath")
          .attr("id", function(d){ return d.id})
          .append("svg:rect")
            .attr("x", function(d){ return d.x})
            .attr("y", function(d){ return d.y})
            .attr("width", function(d){ return d.dx})
            .attr("height", function(d){ return d.dy});

      d3.selectAll("#branch-treemap text")
          .attr("clip-path", function(d){ return "url(#" + d.id + ")"});

        var rects = enter.selectAll("rect")
        .on("click", function(e){
            var settings = {x:50, y:50};
            that.controller.append_popup(settings);
          })
          .on("mouseover", function(e){
            console.log(e);
          });
      this.render_table("tema");
    },

    update_treemap : function(){
      d3.selectAll("#branch-treemap svg g").remove();

      var that  = this,
          data  = this.branch_nodes(Category),
          tree  = this.treemap(data),
          chart = d3.select("#branch-treemap svg"),
          items = chart.selectAll("#branch-treemap g").data(tree);

      var enter = items.enter().append("svg:g");
      enter.append("svg:rect")
          .attr("x", function(d){ return d.x})
          .attr("y", function(d){ return d.y})
          .attr("width", function(d){ return d.dx})
          .attr("height", function(d){ return d.dy})
          .attr("stroke", "white")
          .attr("stroke-width","2")
          .attr("fill", function(d,i){ return Colors(d.value)});
         
      enter.append("svg:text")
          .text(function(d){ return d.name})
          .attr("x", function (d) {return d.x+5;})
          .attr("y", function (d) {return d.y+20;})
          .attr("dy", ".35em")
          .attr("text-anchor", "start");

      enter.append("svg:clipPath")
          .attr("id", function(d){ return d.id})
          .append("svg:rect")
            .attr("x", function(d){ return d.x})
            .attr("y", function(d){ return d.y})
            .attr("width", function(d){ return d.dx})
            .attr("height", function(d){ return d.dy});

      d3.selectAll("#branch-treemap text")
          .attr("clip-path", function(d){ return "url(#" + d.id + ")"});
          
    },

    branch_nodes : function(){
      var branches = _.uniq(this.collection.pluck(Category)),
          root     = {name : "branches", children : []},
          where    = {};

      branches.forEach(function(branch, id){
        where[Category] = branch;
        var el = {name : branch, value : this.collection.where(where).length, id : id};
        root.children.push(el);
      }, this);

      this.root = root;

      return root;
    },
    //
    // H E L P E R S
    // ------------------------------------------------------------------------------
    //
    get_data : function(){
      var that = this;
      $.get(Url, {}, function(d){
        that.collection.reset(d);
         that.render_treemap();
        document.querySelector("#treemap-category").disabled = false;
      }, "json");
    },



  });
    

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return content;
});