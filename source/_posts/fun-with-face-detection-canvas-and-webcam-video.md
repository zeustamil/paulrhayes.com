title: 'Face detection using webcams and canvas'
tags:
  - canvas
  - 'face detection'
  - getUserMedia
  - webcam
id: 154
categories:
  - experiments
date: 2012-11-18 23:43:27
---

With the getUserMedia API, a video element, a canvas element and [LiuLiu’s excellent face detection algorithm](https://github.com/liuliu/ccv), we can easily play around with webcam video data in the browser, plug-in free.

To this end, here are two experiments which do just that, one which places a mask over your face as you move and another that attempts to scale content based on your distance from the screen. Have a play below.

## Mask overlay experiment

[View experiment](/experiments/webcam/mask.html) | [GitHub](https://github.com/fofr/paulrhayes.com-experiments/tree/master/webcam)

<div class="video-wrapper"><iframe class="vimeo" src="http://player.vimeo.com/video/53803605" width="612" height="408" frameborder="0"></iframe></div>

## Scaling content experiment

[View experiment](/experiments/webcam/) | [GitHub](https://github.com/fofr/paulrhayes.com-experiments/tree/master/webcam)

<div class="video-wrapper"><iframe class="vimeo" src="http://player.vimeo.com/video/53803604" width="612" height="408" frameborder="0"></iframe></div>

## Background

Back in 2009, when 3D transforms first appeared on the scene, and when I first toyed with a [rotating 3D cube](/2009-07/animated-css3-cube-interface-using-3d-transforms/), I had the desire to make that object rotate based on the position of a viewer. As you look left, the cube might rotate left. At the time I’d seen some work with canvas processing video frames and [detecting eye blinks](http://ajaxian.com/archives/finally-a-useful-blink-tag-detecting-your-user-blinking). But I needed seamless access to the webcam, and that was only available through Flash.

In 2010, at Full Frontal, Paul Rouget reminded us of the possibilities of the webcam in the browser, but back then I didn’t make much of it. I needed a custom build of Firefox and that device API was eventually deprecated.

Fast forward to today and we have the [getUserMedia (gUM) API](http://dev.w3.org/2011/webrtc/editor/getusermedia.html), for accessing a user’s microphone(s) and webcam(s). This comes as part of the real time communications spec, and it’s supported, somewhat, in Chrome 21+ and Opera 12+, albeit in slightly different guises.

Face detection in canvas has also improved, and we have [LiuLiu’s “not-so-slow” face detection scripts](https://github.com/liuliu/ccv) (for those interested, [the technique in JavaScript is explained on LiuLiu’s blog](http://liuliu.me/eyes/javascript-face-detection-explained/)). What’s more, the venerable Wes Bos [used this in video](http://wesbos.com/html5-video-face-detection-canvas-javascript/), last year, to great effect. Much of my experimentation has been based on this, and I’d urge you to have a read yourself.

Put it all together and what have you got? A webcam stream dumped into a video element, processed into a canvas element, and processed again to search for faces, in real time, in the browser, without plugins. Huzzah.

Detecting the presence and relative distance of a face is much simpler than the angle a user is looking. So for now, rather than rotating, I have settled on a simple scale: as you move forwards or backwards, the content adapts, transitioning and transforming as appropriate.

It’s never simple though. The face detection only works some of the time. With busy backgrounds or low light conditions the detection fails more often. Sometimes the wrong area is detected, which can lead to radical and jarring shifts in the scale. Perhaps a rolling average would be a better indication, alas I haven’t built that.

## How to

Below I have dissected the key parts of the experiments. And as always the experiment code is available on [GitHub](https://github.com/fofr/paulrhayes.com-experiments/webcam/).

## getUserMedia

Presently (Nov 2012) Chrome 21+ and Opera 12+ are the only browsers that [support getUserMedia](http://caniuse.com/stream). Some early versions accepted a comma separated string of media types, eg ‘video, audio’, later versions use an object instead, `{video: true}`. In Chrome getUserMedia is name-spaced, as is window.URL, which we need for interpreting the webcam stream.

Before we begin it’s best to normalise this stuff. [This gist](https://gist.github.com/f2ac64ed7fc467ccdfe3) and its comments were helpful, as was [HTML5 Doctor’s guidance](http://html5doctor.com/getusermedia/).

```js
//normalise window.URL
window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);

//normalise navigator.getUserMedia
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
```

Now let’s call it:

```js
// toString for the older implementation (found by https://github.com/agektmr)
var options = {video: true, toString: function(){ return "video"; }};
navigator.getUserMedia(options, successCallback, errorCallback);
```

## Converting a stream to a video element

To show a webcam stream in a video element we need only set the video source to the stream returned by getUserMedia in the success callback. This is done either directly or using a [URL object](https://developer.mozilla.org/en-US/docs/DOM/window.URL.createObjectURL) of that stream:

```js
// using the normalised window.URL
function successCallback(stream) {
  video.src = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(stream) : stream;
}
```

## Transplanting to canvas

For the video to render within canvas we need to take the current video frame and apply it to the canvas with drawImage. We need to do this as often as possible. A timer that calls the same function again after 50ms works well enough.

```js
function drawFrame() {
  var canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  setTimeout(drawFrame, 50);
}
```

## Face detection

First we include the wonderful [CCV library](https://github.com/liuliu/ccv/tree/stable/js) (ccv.js) and another file which defines a face object (face.js). To detect the faces in our canvas we simply call the detect_objects method and pass in our canvas:

```js
ccv.detect_objects({canvas : (ccv.pre(canvas)), cascade: cascade, interval: 2, min_neighbors: 1});
```

This gives an array of detected objects, each with x and y co-ordinates, a width and a height. It looks a bit like:

```js
{
  confidence: 0.16752329000000035,
  height: 48.500000000000014,
  neighbors: 1,
  width: 48.500000000000014,
  x: 80.50000000000001,
  y: 104.50000000000003
}
```

This operation is relatively slow. To speed up the face detection I recommend using a small canvas (200x160) and hence a scaled down video frame. This gives the algorithm much less data to assess and reduces processing time per frame from ~500ms to a more manageable ~100ms. The algorithm can also detect multiple faces, by default the scaling experiment uses the first found face, and only begins when there is only one face on screen. (The masks work for everyone).

To highlight the face or draw a mask over it:

```js
// highlight
context.fillRect(face.x, face.y, face.width, face.height);

// mask
context.drawImage(mask, face.x, face.y, face.width, face.height);
```

## Face size

When starting the webcam an initial face size is stored and used as a reference point for all future scaling. Comparing the current face’s height and the original face’s height we get a simple scale factor that we can apply directly as a transform on an element. This can be transitioned, if your computer can take that, at the same time as doing the video processing and face detection.
