/**
 *  @file       HomeController.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define([
  "jquery",
  "swig",
  "irtool/Controller"
], function ($, swig, Controller) {
  "use strict";

  return Controller.extend({
    initialize: function (params) {
      Controller.prototype.initialize.call(this, params);

      // activate "generate" link
      $("li#generate_link").removeClass("disabled");

      $("section#home").addClass("active");
    }
  });
});
