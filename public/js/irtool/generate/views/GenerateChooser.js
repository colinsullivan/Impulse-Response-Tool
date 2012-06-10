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
  "Backbone",
  "bootstrap/bootstrap-dropdown",
  "bootstrap/bootstrap-tab"
], function ($, _, Backbone, dropdown, tab) {
  "use strict";

  _ = window._;
  Backbone = window.Backbone;

  return Backbone.View.extend({
    initialize: function (params) {
      Backbone.View.prototype.initialize.call(this, params);

      var me = this;

      if (typeof params.controller === "undefined" || params.controller === null) {
        throw new Error("params.controller is undefined");
      }
      this.controller = params.controller;

      this.$impulseChoiceElement = $("li#impulse_choice");
      this.$impulseInfoElement = $("div#impulse_info");
      this.$golayChoiceElement = $("li#golay_choice");
      this.$golayInfoElement = $("div#golay_info");

      this.setElement($("div#generate_chooser"));

      this.controller.appstate.on("change:generate_choice", function (appstate) {
        var currentChoice = appstate.get("generate_choice");

        //$("div.generate_chooser_info.active").removeClass("active");
        //$("li.generate_chooser_choice.active").removeClass("active");

        //if (currentChoice === appstate.GENERATE_CHOICES.IMPULSE) {
          //me.$impulseChoiceElement.addClass("active");
          //me.$impulseInfoElement.addClass("active");
        //}
        //else if (currentChoice === appstate.GENERATE_CHOICES.GOLAY) {
          //me.$golayInfoElement.addClass("active");
          //me.$golayChoiceElement.addClass("active");
        //}
        
      });
    },
    disabled_choice_clicked: function (e) {
      // prevent href="#"
      e.preventDefault();
    },
    impulse_choice_clicked: function (e) {
      this.controller.appstate.set("generate_choice", this.controller.appstate.GENERATE_CHOICES.IMPULSE);
      // prevent href="#"
      e.preventDefault();
    },
    golay_choice_clicked: function (e) {
      this.controller.appstate.set("generate_choice", this.controller.appstate.GENERATE_CHOICES.GOLAY);
      // prevent href="#"
      e.preventDefault();
    },
    golay_length_chosen: function (e) {
      var $lengthChoice = $(e.currentTarget), chosenPower;

      chosenPower = $lengthChoice.data("power")*1;
      this.controller.appstate.set("golay_power", chosenPower);



      // prevent href="#"
      e.preventDefault();
    },
    events: {

      // when generation choice is selected
      //"click li.generate_chooser_choice.disabled": "disabled_choice_clicked",
      //"click li.generate_chooser_choice#impulse_choice": "impulse_choice_clicked",
      //"click li.generate_chooser_choice#golay_choice": "golay_choice_clicked",

      // when golay length is selected
      "click li.golay_length_choice": "golay_length_chosen",
    }
  });
});
