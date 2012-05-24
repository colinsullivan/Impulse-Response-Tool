(
  function () {
    
    //function hasGetUserMedia() {
      //// Note: Opera builds are unprefixed.
      //return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                //navigator.mozGetUserMedia || navigator.msGetUserMedia);
    //}
  
    $(document).ready(
      function  () {
        var infoElement;

        infoElement = $("p#info");
        infoElement.html("loading...");


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
          //swfPath: "/js/libs/microphone.js/microphone.swf", 
          //debugging: false
        //}, function () {
         
          //// bug in microphone.js...setup doesn't get fired

        //});

        //setTimeout( function () {
          //var bufs = [];

          //// called when user allows access
          //mic.onSamplesAvailable = function (data,numChannels) {
            //bufs.push(data);
          //};

          //infoElement.html("Starting mic...");
          //mic.start();

          //setTimeout(function() {
            //mic.stop();
          //}, 5000);
        //}, 1000);

      }
    );


  }
).call(this);
