/**
 *  @file       init.js
 *              Entrypoint for impulse response tool app.
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

require.config({
  paths: {
    jquery: "/js/libs/jquery-1.7.1",
    Backbone: "/js/libs/backbone/backbone"
  }
});

require(["jquery"], function ($) {

  "use strict";

  $(document).ready(function () {
    var infoElement;

    infoElement = $("p#info");
    infoElement.html("loading...");
  });
});

/*(
  function () {
    
    //function hasGetUserMedia() {
      //// Note: Opera builds are unprefixed.
      //return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                //navigator.mozGetUserMedia || navigator.msGetUserMedia);
    //}
  


        //if (!hasGetUserMedia()) {
          //infoElement.html("getUserMedia() is not supported in your browser.  Sorry :(");
          //return;
        //}

        //navigator.webkitGetUserMedia({
          //video: false, 
          //audio: true
        //}, function (localMediaStream) {
          //console.log("success");
          //console.log("localMediaStream");
          //console.log(localMediaStream);
          //localMediaStream.record();
        //}, function (err) {
          //console.log("error");
        //});

        //var mic = new Microphone({
          //mode: 2,
          //swfPath: "/js/libs/microphone.js/src/microphone.swf", 
          //debugging: true
        //}, function () {
         
          //// bug in microphone.js...setup doesn't get fired
          //console.log("microphone callback");



          //infoElement.html("Starting mic...");
          //mic.start();

          //mic.setLoopBack(false);
          //setTimeout(function() {
            //infoElement.html("Stopping mic...");
            //mic.stop();
          //}, 5000);
        //});

        //setTimeout( function () {
          //var bufs = [];

          //// called when user allows access
          //mic.onSamplesAvailable = function (data,numChannels) {
            //bufs.push(data);
          //};


        //}, 1000);

      }
    );


  }
).call(this);*/
