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
      params = params || {};
      Backbone.View.prototype.initialize.call(this, params);

      var APPSTATES, $el, me = this;

      if (typeof params.appstate === "undefined" || params.appstate === null) {
        throw new Error("params.appstate is undefined");
      }


      this.setElement($("ul#navigation"));
      $el = this.$el;

      APPSTATES = params.appstate.STATES;

      // navigation links indexed by state enum
      this.$navLinksByState = {};
      this.$navLinksByState[APPSTATES.HOME] = $el.children("#home_link");
      this.$navLinksByState[APPSTATES.GENERATE] = $el.children("#generate_link");

      // when app changes appstate
      params.appstate.on("change:state", function (appstate) {
        var prevStateValue = appstate.previous("state"),
          currentStateValue = appstate.get("state");

        me.handle_state_change(prevStateValue, currentStateValue);
      });
    },
    handle_state_change: function (prevStateValue, currentStateValue) {
      var $prevNavLink = this.$navLinksByState[prevStateValue],
        $currentNavLink = this.$navLinksByState[currentStateValue],
        $currentlyActiveNavLink = this.$el.children(".active");


      $currentlyActiveNavLink.removeClass("active");
      $currentNavLink.removeClass("disabled").addClass("active");
    }
  });
});
