// WATSON - fideicomisos
// date     : 04/06/2015
// @package : fideicomisos
// @file    : main.js
// @version : 1.0.0
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

require.config({
  baseUrl : "/js/apps/watson",
  paths : {
    jquery     : "../../bower_components/jquery/dist/jquery.min",
    backbone   : "../../bower_components/backbone/backbone",
    underscore : "../../bower_components/underscore/underscore-min",
    text       : "../../bower_components/requirejs-text/text",
    velocity   : "../../bower_components/velocity/velocity.min",
    d3         : "../../bower_components/d3/d3.min",
  },
  shim : {
    backbone : {
      deps    : ["jquery", "underscore"],
      exports : "Backbone"
    }
  }
});

 var app;

require(['controller'], function(controller){ 
  app = new controller();
});