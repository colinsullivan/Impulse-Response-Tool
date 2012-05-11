audioOnCanvas = exports? and @ or @audioOnCanvas = {}

###
#   @class  Used for generating a waveform inside a canvas
#           element.
###
class audioOnCanvas.WaveformRenderer

  ###
  # @constructor
  #
  # @param  canvasElement   The canvas element to draw the waveform on.
  # @param  buffer          The `AudioBuffer` instance to render.
  ###
  constructor: (options={}) ->

    @canvasElement = options.canvasElement
    @buffer = options.buffer

    if not @canvasElement?
      throw new Error "this.canvasElement is undefined"

    if not @buffer?
      throw new Error "this.buffer is undefined"

    @canvasCtx = @canvasElement.getContext("2d")
    
    @render()

  render: () ->

    canvasHeight = @canvasCtx.canvas.clientHeight
    canvasWidth = @canvasCtx.canvas.clientWidth
    midHeight = canvasHeight/2.0
    
    prevSamplePosition =
      x: 0
      y: midHeight


    # for now just do mono
    samples = @buffer.getChannelData 0

    ##
    # Draw a line from the previous audio sample represented in the
    # image to the next one.
    #
    # @param  x  x-coordinate of next audio sample to represent.
    ##
    drawSample = (x) =>

      # value of audio at this point
      sampleValue = samples[Math.floor(
        (x / canvasWidth)*samples.length
      )]

      # new position
      newSamplePosition =
        x: x
        y: midHeight - midHeight*sampleValue

      @canvasCtx.beginPath()
      @canvasCtx.moveTo(prevSamplePosition.x, prevSamplePosition.y)
      @canvasCtx.lineTo(newSamplePosition.x, newSamplePosition.y)
      @canvasCtx.stroke()

      prevSamplePosition.x = newSamplePosition.x
      prevSamplePosition.y = newSamplePosition.y
      

    # For each fraction of a pixel, draw audio sample as necessary
    drawSample(x) for x in [0..canvasWidth] by 0.01
