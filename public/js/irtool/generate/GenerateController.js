/**
 *  @file       GenerateController.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["jquery", "irtool/Controller", "irtool/irtool"], function ($, Controller, irtool) {
  "use strict";

  return Controller.extend({
    initialize: function (params) {
      Controller.prototype.initialize.call(this, params);

      $("ul#navigation").children("li.active").removeClass("active");
      $("li#generate_link").addClass("active");
      $("p#info").text("Generate");

    },

    generate_impulse: function () {

      return null;
      
    },
    generate_golay: function (golayLength) {
      var bufa, bufb,
        ctx = irtool.audioCtx,
        golay_code,
        golayResult;

      /**
       *  Generates a golay code of length 2^n.
       *
       *  @param  n  integer determines golay code length (2^n)
       **/
      golay_code = function (n) {
        var a, b, adata, bdata, prev, prevadata, prevbdata, i, newSize;
        if (n === 0) {
          a = ctx.createBuffer(1, 1, irtool.sampleRate);
          adata = a.getChannelData(0);
          adata[0] = 1.0;
          b = ctx.createBuffer(1, 1, irtool.sampleRate);
          bdata = b.getChannelData(0);
          bdata[0] = -1.0;
        } else {
          prev = golay_code(n - 1);
          prevadata = prev[0].getChannelData(0);
          prevbdata = prev[1].getChannelData(0);

          newSize = prev[0].length + prev[1].length;

          // a is preva concatenated with prevb
          a = ctx.createBuffer(1, newSize, irtool.sampleRate);
          adata = a.getChannelData(0);
          for (i = 0; i < prev[0].length; i++) {
            adata[i] = prevadata[i];
          }
          for (i = 0; i < prev[1].length; i++) {
            adata[prev[0].length + i] = prevbdata[i];
          }

          // b is preva concatenated with negative prevb
          b = ctx.createBuffer(1, newSize, irtool.sampleRate);
          bdata = b.getChannelData(0);
          for (i = 0; i < prev[0].length; i++) {
            bdata[i] = prevadata[i];
          }
          for (i = 0; i < prev[1].length; i++) {
            bdata[prev[0].length + i] = -1.0 * prevbdata[i];
          }
        }

        return [a, b];
      };

      golayResult = golay_code(golayLength);
    }
  });
});
