// Generated by CoffeeScript 1.3.1
(function() {

  $(document).ready(function() {
    var audioCtx, xhr;
    audioCtx = new webkitAudioContext();
    xhr = new XMLHttpRequest();
    xhr.open("GET", "/audio/41455__sandyrb__3auc-ir-combi-processed-001.wav", true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {
      var canvasElement, irBuf, irGain, irPlayer, sampleRequest, waveformRenderer;
      irBuf = audioCtx.createBuffer(xhr.response, false);
      canvasElement = document.getElementById("waveform");
      waveformRenderer = new audioOnCanvas.WaveformRenderer({
        canvasElement: canvasElement,
        buffer: irBuf
      });
      irPlayer = audioCtx.createConvolver();
      irGain = audioCtx.createGainNode();
      irGain.gain.value = 2.0;
      irPlayer.connect(audioCtx.destination);
      irPlayer.buffer = irBuf;
      sampleRequest = new XMLHttpRequest();
      sampleRequest.open("GET", "/audio/Air_EndingKeys.wav", true);
      sampleRequest.responseType = "arraybuffer";
      sampleRequest.onload = function(e) {
        var sampleBuf, samplePlayer, samplePlayerGain;
        sampleBuf = audioCtx.createBuffer(sampleRequest.response, false);
        samplePlayer = audioCtx.createBufferSource();
        samplePlayer.buffer = sampleBuf;
        samplePlayerGain = audioCtx.createGainNode();
        samplePlayerGain.gain.value = 1.0;
        samplePlayerGain.connect(audioCtx.destination);
        samplePlayer.connect(irPlayer);
        return samplePlayer.noteOn(0);
      };
      return sampleRequest.send();
    };
    return xhr.send();
  });

}).call(this);
