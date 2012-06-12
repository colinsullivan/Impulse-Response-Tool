/**
 *  @file       GenerateController.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define([
  "jquery",
  "irtool/Controller",
  "irtool/irtool",
  "irtool/generate/views/GenerateChooser",
  "audiolib/processors/fft"
], function ($, Controller, irtool, GenerateChooser, FFT) {
  "use strict";

  FFT = window.FFT;

  return Controller.extend({
    initialize: function (params) {
      Controller.prototype.initialize.call(this, params);

      if (typeof params.appstate === "undefined" || params.appstate === null) {
        throw new Error("params.appstate is undefined");
      }
      this.appstate = params.appstate;

      $("ul#navigation").children("li.active").removeClass("active");
      $("li#generate_link").addClass("active");

      $("section#generate").addClass("active");

      this.chooser = new GenerateChooser({
        controller: this
      });
    },

    generate_impulse: function () {

      return null;
      
    },
    generate_golay: function (golayPower) {
      var golayLength, 
        bufa, bufb, data, bufaData, bufbData,
        ctx = irtool.audioCtx,
        complexPointwiseMultiply,
        golay_code,
        golayResult,
        zpf, i;

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

      golayResult = golay_code(golayPower);
      golayLength = golayResult[0].length;
      zpf = 2;


      // zero pad golay a
      //bufa = ctx.createBuffer(1, golayResult[0].length + zpf, irtool.sampleRate);
      //bufaData = bufa.getChannelData(0);
      //data = golayResult[0].getChannelData(0);
      //for (i = 0; i < bufa.length; i++) {
        //if (i < golayResult[0].length) {
          //bufaData[i] = data[i];
        //} else {
          //bufaData[i] = 0.0;
        //}
      //}

      //zero pad golay b
      //bufb = ctx.createBuffer(1, golayResult[1].length + zpf, irtool.sampleRate);
      //bufbData = bufb.getChannelData(0);
      //data = golayResult[1].getChannelData(0);
      //for (i = 0; i < bufb.length; i++) {
        //if (i < golayResult[1].length) {
          //bufbData[i] = data[i];
        //} else {
          //bufbData[i] = 0.0;
        //}
      //}

      var bufaFFT, bufaFFTReverse, bufaData, bufbFFT, bufbFFTReverse, bufbData;

      bufaFFT = new FFT(irtool.sampleRate, zpf * golayLength);
      bufaFFTReverse = new FFT(irtool.sampleRate, zpf * golayLength);
      bufbFFT = new FFT(irtool.sampleRate, zpf * golayLength);
      bufbFFTReverse = new FFT(irtool.sampleRate, zpf * golayLength);


      //bufa = ctx.createBuffer(1, golayResult[0].length + zpf, irtool.sampleRate);
      //bufb = ctx.createBuffer(1, golayResult[1].length + zpf, irtool.sampleRate);
      //bufaData = bufa.getChannelData(0);
      //bufbData = bufb.getChannelData(0);

      complexPointwiseMultiply = function (x, y) {
        var result = [], re, im, i;

        for (i = 0; i < x.length / 2; i++) {
          re = x[2 * i] * y[2 * i] - x[2 * i + 1] * y[2 * i + 1];
          im = x[2 * i] * y[2 * i + 1] + x[2 * i + 1] * y[2 * i];
          result[2 * i] = re;
          result[2 * i + 1] = im;
        }

        return result;
      };

    
      bufaData = golayResult[0].getChannelData(0);
      bufbData = golayResult[1].getChannelData(0);
      for (i = 0; i < golayLength; i++) {
        bufaFFT.pushSample(bufaData[i]);
        bufaFFTReverse.pushSample(bufaData[golayLength - 1 - i]);
        bufbFFT.pushSample(bufbData[i]);
        bufbFFTReverse.pushSample(bufbData[golayLength - 1 - i]);
      }
      // TODO: next power of two from longest signal for zpf
      for (i = 0; i < golayLength * (zpf - 1); i++) {
        bufaFFT.pushSample(0.0);
        bufaFFTReverse.pushSample(0.0);
        bufbFFT.pushSample(0.0);
        bufbFFTReverse.pushSample(0.0);
      }


      var resulta = complexPointwiseMultiply(bufaFFT.outputBuffer, bufaFFTReverse.outputBuffer);
      var resultb = complexPointwiseMultiply(bufbFFT.outputBuffer, bufbFFTReverse.outputBuffer);

      //result = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
      var resultaInverseFFT = new FFT(irtool.sampleRate, zpf * golayLength, true);
      resultaInverseFFT.process(
        resultaInverseFFT.outputBuffer,
        resulta,
        "complex"
      );
      console.log("resultaInverseFFT.outputBuffer");
      console.log(resultaInverseFFT.outputBuffer);
      
      var resultbInverseFFT = new FFT(irtool.sampleRate, zpf * golayLength, true);
      resultbInverseFFT.process(
        resultbInverseFFT.outputBuffer,
        resultb,
        "complex"
      );
      console.log("resultbInverseFFT.outputBuffer");
      console.log(resultbInverseFFT.outputBuffer);

      var sum = [];
      for (var i = 0; i < resultaInverseFFT.outputBuffer.length; i+=2) {
        sum.push(
          (resultaInverseFFT.outputBuffer[i] + resultbInverseFFT.outputBuffer[i]) / (2.0 * zpf * Math.pow(golayLength, 2))
        );
      }

      console.log("sum");
      console.log(sum);

    }
  });
});
