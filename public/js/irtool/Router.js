/**
 *  @file       Router.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define([
  "underscore",
  "Backbone",
  "irtool/irtool",
  "irtool/home/HomeController",
  "irtool/generate/GenerateController",
  "irtool/views/Navigation"
], function (_, Backbone, irtool, HomeController, GenerateController, Navigation) {
  "use strict";
  Backbone = window.Backbone;
  _ = window._;

  return Backbone.Router.extend({
    initialize: function (params) {
      params = params || {};
      Backbone.Router.prototype.initialize.call(this, params);

      var navigationView;

      navigationView = new Navigation();

      this.navigationView = navigationView;
    },
    routes: {
      "home": "go_home",
      "generate": "go_generate",
      "*default": "go_default"
    },
    go_default: function () {
      this.navigate("#home", {trigger: true});
    },

    go_generate: function () {
      if (irtool.currentController) {
        console.log("todo");
      }

      irtool.currentController = new GenerateController();
      irtool.state.set(irtool.state.STATES.GENERATE);
    },

    go_home: function () {
      if (irtool.currentController) {
        console.log("todo");
      }

      irtool.currentController = new HomeController();
      irtool.state.set(irtool.state.STATES.HOME);
    }
  });
});
