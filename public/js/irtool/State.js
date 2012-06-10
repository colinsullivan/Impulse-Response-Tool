/**
 *  @file       State.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["underscore", "Backbone"], function (_, Backbone) {
  "use strict";

  _ = window._;
  Backbone = window.Backbone;

  return Backbone.Model.extend({
    /**
     *  Potential states
     **/
    STATES: {
      UNKNOWN: 0,
      HOME: 1,
      GENERATE: 2
    },

    /**
     *  Potential generate choices
     **/
    GENERATE_CHOICES: {
      IMPULSE: 1,
      GOLAY: 2
    },
    initialize: function (params) {
      Backbone.Model.prototype.initialize.call(this, params);

      this.set("state", this.STATES.UNKNOWN);

      this.set("generate_choice", this.STATES.UNKNOWN);

      // power of two chosen for golay code generation
      this.set("golay_power", null);
    }
  });
});
