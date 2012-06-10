/**
 *  @file       irtool.js
 *
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 *
 *              Copyright (c) 2012 Colin Sullivan
 *              Licensed under the MIT license.
 **/

define(["./Base"], function (Base) {

  "use strict";

  var irtool = {
    Base: Base,
    /**
     *  Current active controller.
     **/
    currentController: null,
    /**
     *  Router instance
     **/
    router: null,
    /**
     *  State model instance
     **/
    state: null,
    /**
     *  Global reference to audio context
     **/
    audioCtx: null,
    /**
     *  Sample rate of generated sounds.
     **/
    sampleRate: 48000
  };

  return irtool;
});
