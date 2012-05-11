$(document).ready () ->

  audioCtx = new webkitAudioContext()

  xhr = new XMLHttpRequest()

  xhr.open(
    "GET",
    "/audio/41455__sandyrb__3auc-ir-combi-processed-001.wav",
    #"/audio/sine.wav",
    #"/audio/Air_EndingKeys.wav",
    true
  )
  xhr.responseType = "arraybuffer"
  xhr.onload = (e) ->

    buf = audioCtx.createBuffer xhr.response, false

    canvasElement = document.getElementById("waveform")

    waveformRenderer = new audioOnCanvas.WaveformRenderer
      canvasElement: canvasElement
      buffer: buf

  xhr.send()
