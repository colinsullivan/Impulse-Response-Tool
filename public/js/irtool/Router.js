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
  "irtool/views/Navigation",
  "irtool/State"
], function (_, Backbone, irtool, HomeController, GenerateController, Navigation, State) {
  "use strict";
  Backbone = window.Backbone;
  _ = window._;

  return Backbone.Router.extend({
    initialize: function (params) {
      params = params || {};
      Backbone.Router.prototype.initialize.call(this, params);

      var navigationView, appstate;

      appstate = new State();
      this.appstate = appstate;
      
      navigationView = new Navigation({
        appstate: appstate
      });
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
      this.appstate.set("state", this.appstate.STATES.GENERATE);
    },

    go_home: function () {
      if (irtool.currentController) {
        console.log("todo");
      }

      irtool.currentController = new HomeController();
      this.appstate.set("state", this.appstate.STATES.HOME);
    }
  });
});
