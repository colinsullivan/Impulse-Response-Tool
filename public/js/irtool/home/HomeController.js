/**
 *  @file       HomeController.js
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

      $("p#info").text("Home");

      // activate "generate" link
      $("li#generate_link").removeClass("disabled");
    }
  });
});
