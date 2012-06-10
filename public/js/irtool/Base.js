/**
 *  @file       Base.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["underscore", "Backbone"], function () {

  "use strict";

  /**
   *  @class  Base class with `extend` functionality and events stolen
   *  from backbone.
   **/
  var Base = function (params) {
    params = params || {};
    this.initialize.call(this, params);
  };

  _.extend(Base.prototype, Backbone.Events, {
    initialize: function (params) {
    }
  });
  Base.extend = Backbone.Model.extend;

  return Base;
});
