// Adler - fideicomisos
// @package  : fideicomisos
// @location : /js/apps/adler/views
// @file     : content_graph_view.js
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
  //  [ templates ]
      Area_form = require('text!templates/textarea_form.html'),
      Graph     = require('text!templates/graph.html'),

  //
  // D E F I N E   T H E   S E T U P   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  Token       = CONFIG_DATA.token,
  Article     = CONFIG_DATA.article,
  Save_url    = '/articles/content/' + Article.id,
  Data_url    = '/data/registry/',
  ClassName   = "editable",
  TagName     = "section",

  //
  // D E F I N E   T H E   D 3   V A R I A B L E S
  // --------------------------------------------------------------------------------
  //
  SVG = {
    width  : 600,
    height : 400,
    margin : {
      top    : 20,
      right  : 20,
      bottom : 50,
      left   : 50
    } 
  },
  Money_scale    = 1000000;

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
      'click .cancel' : 'render',
      'click .update' : 'render_form',
      'click .save'   : 'save',
      'click .kill'   : 'delete',
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
      graph : _.template(Graph),
      form  : _.template(Area_form)
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      this.model.urlRoot = Save_url;
      this.listenTo(this.model, 'sync', this.render_graph);
      this.listenTo(this.model, 'destroy', this.remove);
      this.controller = settings.controller;
      this.collection = new Backbone.Collection();

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

      if(this.model.isNew() && !e){
        console.log("its a form!");
        this.render_form();
      }
      else{
        this.render_graph();
      }

      return this;
    },

    // []
    render_form : function(e){
      if(e !== void 0) e.preventDefault();
      var that = this;
      this.el.innerHTML = this.templates.form(this.model.attributes);
    },

    // []
    render_graph : function(){
      var data = this.model.get('content'),
          url  = Data_url + data,
          that = this;
      this.el.innerHTML = this.templates.graph(this.model.attributes);
      $.get(url, null,function(d){
        that.collection.reset(d);
        that.make_graph();
      }, 'json');
    },

    //
    //
    //
    make_graph : function(){
      if(!this.collection.length){
        console.log("no data");
        return;
      }

      // Cache/create the containers
      var container  = this.el.querySelector('.graph'),
      	  graph_title = this.el.querySelector('.graph_title'),
          graph      = d3.select(container).append('svg:svg'),
          chart      = graph.append('svg:g'),
      // get/format the data
          registries = _.uniq(this.collection.pluck('registry')),
          data       = registries.map(function(reg){return this.collection.where({registry : reg});}, this);
          years_list = this.collection.map(function(m){return +m.get('year')}),
          incomes    = this.collection.map(function(m){ return +m.get('income')/Money_scale}),
          yields     = this.collection.map(function(m){ return +m.get('yield')/Money_scale}),
          expenses   = this.collection.map(function(m){ return +m.get('expenses')/Money_scale}),
          availability = this.collection.map(function(m){ return +m.get('availability')/Money_scale}),
          m_scale = incomes.concat(yields,expenses, availability),
          field      = "expenses",
      // create the d3 helpers
          x_scale    = d3.scale.linear().domain(d3.extent(years_list)).range([
            SVG.margin.left, SVG.width - SVG.margin.right
          ]),
          y_scale    = d3.scale.linear().domain(d3.extent(m_scale)).range([
            SVG.height - SVG.margin.bottom - SVG.margin.top, SVG.margin.top
          ]),
          years      = d3.range(d3.extent(years_list)),
          format     = d3.format(","),
          line       = d3.svg.line()
                         .x(function(d, i){return x_scale(+d.get('year'))})
                         .y(function(d){return y_scale(+d.get(field)/Money_scale)});
					
	  
      graph.attr('width', SVG.width).attr('height', SVG.height);	 
      /// h4 title
	  graph_title.innerHTML =  graph_title.innerHTML + this.collection.at(0).attributes.designation;
      
      
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('class', 'expenses')
          .attr('d', line);
      }, this);

      field = "initial_amount";
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('d', line);
      }, this);

      field = "initial_amount";
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('class', 'initial-amount')
          .attr('d', line);
      }, this);

      field = "yield";
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('class', 'yield')
          .attr('d', line);
      }, this);

      field = "availability";
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('d', line);
      }, this);

      field = "income";
      data.forEach(function(registry){
        chart.append('svg:path')
          .data([registry])
          .attr('class', 'income')
          .attr('d', line);
      }, this);


      // the axis
      chart.append("svg:line")
        .attr('x1', SVG.margin.left)
        .attr('y1', SVG.height - SVG.margin.bottom - SVG.margin.top)
        .attr('x2', SVG.width)
        .attr('y2', SVG.height - SVG.margin.bottom - SVG.margin.top)
        .attr('class', 'axis');

      chart.append("svg:line")
        .attr('x1', SVG.margin.left)
        .attr('y1', SVG.margin.top)
        .attr('x2', SVG.margin.left)
        .attr('y2', SVG.height - SVG.margin.bottom - SVG.margin.top )
        .attr('class', 'axis');

      chart.selectAll(".xLabel")
        .data(x_scale.ticks(years_list.length))
        .enter().append("svg:text")
        .attr("class", "xLabel")
        .text(String)
        .attr("x", function(d) { return x_scale(d) })
        .attr("y", SVG.height - SVG.margin.top - SVG.margin.bottom + 20)
        .attr("text-anchor", "middle");

      chart.selectAll(".yLabel")
        .data(y_scale.ticks(10))
        .enter().append("svg:text")
        .attr("class", "yLabel")
        .text(format)
        .attr("x", SVG.margin.left - 10)
        .attr("y", function(d) { return y_scale(d) })
        .attr("text-anchor", "end")
        .attr("dy", 3);

      chart.selectAll(".xTicks")
    .data(x_scale.ticks(years_list.length))
    .enter().append("svg:line")
    .attr("class", "xTicks")
    .attr("x1", function(d) { return x_scale(d); })
    .attr("y1", SVG.height - SVG.margin.top - SVG.margin.bottom)
    .attr("x2", function(d) { return x_scale(d); })
    .attr("y2", SVG.height - SVG.margin.top - SVG.margin.bottom + 5)

    chart.selectAll(".yTicks")
    .data(y_scale.ticks(10))
    .enter().append("svg:line")
    .attr("class", "yTicks")
    .attr("y1", function(d) { return y_scale(d); })
    .attr("x1", SVG.margin.left - 5)
    .attr("y2", function(d) { return y_scale(d); })
    .attr("x2", SVG.margin.left)
    },

    // [ click .save | submit form ]
    // Guarda el contenido en el servidor
    //
    save : function(e){
      if(e !== void 0) e.preventDefault();
      this.model.set({
        content : this.el.querySelector('textarea').value
      });
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