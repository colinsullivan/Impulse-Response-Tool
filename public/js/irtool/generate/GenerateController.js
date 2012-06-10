/**
 *  @file       GenerateController.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["irtool/Controller", "jquery"], function (Controller, $) {
  "use strict";

  return Controller.extend({
    initialize: function (params) {
      Controller.prototype.initialize.call(this, params);

      $("ul#navigation").children("li.active").removeClass("active");
      $("li#generate_link").addClass("active");
      $("p#info").text("Generate");

    },

    generate_impulse: function () {
      
    },
  });
});
