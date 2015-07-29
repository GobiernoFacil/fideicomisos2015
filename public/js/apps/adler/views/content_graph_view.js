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
    height : 300,
    margin : {
      top    : 20,
      right  : 20,
      bottom : 50,
      left   : 100
    } 
  };

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
        console.log("no data bitches");
        return;
      }
      // this.el.innerHTML = "";
      var container  = this.el.querySelector('.graph'),
          graph      = d3.select(container).append('svg:svg'),
          chart      = graph.append('svg:g'),
          registries = _.uniq(this.collection.pluck('registry')),
          years_list = this.collection.map(function(m){ return +m.get('year')}),
          incomes    = this.collection.map(function(m){ return +m.get('income')}),
          yields     = this.collection.map(function(m){ return +m.get('yield')}),
          x_scale    = d3.scale.linear().domain(d3.extent(years_list)).range([0, SVG.width - SVG.margin.right]),
          y_scale    = d3.scale.linear().domain(d3.extent(yields)).range([0, SVG.height - SVG.margin.bottom]),
          years      = d3.range(2006, 2014),
          data       = registries.map(function(reg){return this.collection.where({registry : reg});}, this);

      graph.attr('width', SVG.width).attr('height', SVG.height);

      var line = d3.svg.line()
                   .x(function(d, i){return x_scale(d.get('year'))})
                  .y(function(d){return y_scale(d.get('yield'))});

      data.forEach(function(registry){
        console.log(registry);
        chart.append('svg:path')
          .data([registry])
          .attr('d', line);
      }, this);
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