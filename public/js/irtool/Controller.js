/**
 *  @file       Controller.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["./Base"], function (Base) {

  "use strict";

  return Base.extend({
    initialize: function (params) {
      Base.prototype.initialize.call(this, params);
    }
  });
});
