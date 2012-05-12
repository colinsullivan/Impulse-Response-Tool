$(document).ready () ->

  audioCtx = new webkitAudioContext()

  xhr = new XMLHttpRequest()

  xhr.open(
    "GET",
    #"/audio/41455__sandyrb__3auc-ir-combi-processed-001.wav",
    #"/audio/Air_EndingKeys.wav",
    #"/audio/sine.wav",
    "/audio/480-sine.wav",
    true
  )
  xhr.responseType = "arraybuffer"
  xhr.onload = (e) ->

    # Buffer for IR data
    irBuf = audioCtx.createBuffer xhr.response, false

    canvasElement = document.getElementById("waveform")

    waveformRenderer = new audioOnCanvas.SpectrumRenderer
      canvasElement: canvasElement
      buffer: irBuf

      #    irPlayer = audioCtx.createConvolver()
      #    irGain = audioCtx.createGainNode()
      #    irGain.gain.value = 2.0
      #    #irPlayer.connect(irGain)
      #    irPlayer.connect(audioCtx.destination)
      #
      #    irPlayer.buffer = irBuf
    
    
    #    sampleRequest = new XMLHttpRequest()
    #    sampleRequest.open(
    #      "GET",
    #      "/audio/Air_EndingKeys.wav",
    #      true
    #    )
    #    sampleRequest.responseType = "arraybuffer"
    #    sampleRequest.onload = (e) ->
    #      sampleBuf = audioCtx.createBuffer sampleRequest.response, false
    #
    #      samplePlayer = audioCtx.createBufferSource()
    #      samplePlayer.buffer = sampleBuf
    #      samplePlayerGain = audioCtx.createGainNode()
    #      samplePlayerGain.gain.value = 1.0
    #      samplePlayerGain.connect(audioCtx.destination)
    #
    #      #samplePlayer.connect(samplePlayerGain)
    #      #samplePlayerGain.connect(audioCtx.destination)
    #      samplePlayer.connect(irPlayer)

      #samplePlayer.noteOn(0)

      #sampleRequest.send()



  xhr.send()
