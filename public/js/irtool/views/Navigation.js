/**
 *  @file       Navigation.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define([
  "underscore",
  "Backbone",
  "jquery",
  "irtool/irtool"
], function (_, Backbone, $, irtool) {
  "use strict";

  _ = window._;
  Backbone = window.Backbone;

  return Backbone.View.extend({
    initialize: function (params) {
      Backbone.View.prototype.initialize.call(this, params);

      this.setElement($("ul#navigation"));

      var appstate = irtool.state;

      irtool.state.on("change", function (newState) {

        var prevState, newState;



      });
    }
  });
});
