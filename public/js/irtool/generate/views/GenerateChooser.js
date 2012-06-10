/**
 *  @file       GenerateChooser.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define([
  "jquery",
  "underscore",
  "Backbone"
], function ($, _, Backbone) {
  "use strict";

  _ = window._;
  Backbone = window.Backbone;

  return Backbone.View.extend({
    initialize: function (params) {
      Backbone.View.prototype.initialize.call(this, params);

      if (typeof params.controller === "undefined" || params.controller === null) {
        throw new Error("params.controller is undefined");
      }
      this.controller = params.controller;

      this.$impulseChoiceElement = $("li#impulse_choice");
      this.$impulseInfoElement = $("div#impulse_info");
      this.$golayChoiceElement = $("li#golay_choice");
      this.$golayInfoElement = $("div#golay_info");

      this.setElement($("div#generate_chooser"));
    },
    deactivate_active_choice: function () {
      $("div.generate_chooser_info.active").removeClass("active");
      $("li.generate_chooser_choice.active").removeClass("active");
    },
    disabled_choice_clicked: function () {
      return false;
    },
    impulse_choice_clicked: function () {
   
      this.deactivate_active_choice();
      this.$impulseChoiceElement.addClass("active");
      this.$impulseInfoElement.addClass("active");

      // prevent propogation
      return false;
    },
    golay_choice_clicked: function () {
      this.deactivate_active_choice();
      this.$golayInfoElement.addClass("active");
      this.$golayChoiceElement.addClass("active");
      
      // prevent propogation
      return false;
    },
    events: {
      "click li.generate_chooser_choice.disabled": "disabled_choice_clicked",
      "click li.generate_chooser_choice#impulse_choice": "impulse_choice_clicked",
      "click li.generate_chooser_choice#golay_choice": "golay_choice_clicked"
    }
  });
});
