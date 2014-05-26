title: 'Adding touch gestures and mouse controls to a 3D CSS cube'
tags:
  - 3d
  - css3
  - cube
  - perspective
  - transformations
  - transitions
  - webkit
id: 108
categories:
  - Code
  - Experiments
date: 2010-09-28 22:20:49
---

An update to the [original 3D cube](/2009-07/animated-css3-cube-interface-using-3d-transforms/) (from July 2009 no less), I've added touch gesture support (iOS) and click-and-drag behaviour. Animation is incredibly smooth on the iPhone, even the 3G model. Arrow key presses will still rotate the cube, and ESC will reset it.

[Experiment: 3D cube with touch gestures and click and drag](http://www.paulrhayes.com/experiments/cube-3d/touch.html)
One year on and the cube still only works in Safari. Chrome, which says it supports `webkit-perspective` and `webkit-transform`, still renders differently. Firefox doesn't support 3D transforms _[yet](https://developer.mozilla.org/En/CSS/Using_CSS_transforms)_.
<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Experiment updated for Firefox 10 which supports 3D transforms. Although the perspective appears off, probably due to a [perspective-origin bug](https://bugzilla.mozilla.org/show_bug.cgi?id=726397).
</div>

<div class="video-wrapper"><iframe class="vimeo" src="http://player.vimeo.com/video/19501428" width="612" height="408" frameborder="0"></iframe></div>

It works relatively simply: on click the start co-ordinates are saved and on drag the difference between current drag position and starting co-ordinates are applied to the cube as a transform, which is completed after the specified transition duration. Many thanks to [Remy Sharp](http://remysharp.com) and his rubik's experiment, which got me started with a lot of the basics.

### Touch tweaks

Pixel values for touch positions are found in `event.originalEvent.touches[0].pageX`, instead of `event.pageX`. Using 'start minus current' pixel values led the cube to rotate more than intended on the iPhone. To correct, and for intuitive behaviour, the difference is reduced by a factor of four.

JavaScript prevents single touch default events - e.g. scrolling and text selection, but if it detects more than one touch (`event.originalEvent.touches.length`) the cube won't rotate, so pinch and zoom will still work. This is a compromise.

A 200ms transition duration suits the browser, but on touch devices it felt sluggish, so I've upped it to 50ms so the cube is always at your finger-tips.

### Better CSS

The cube is created exactly as before, but I've simplified the markup a little - dropping the _face_ and _number_ class names in favour of CSS3 selectors:
<pre>
#cube > div:first-child  {
-webkit-transform: rotateX(90deg) translateZ(200px);
-moz-transform: rotateX(90deg) translateZ(200px);
}

#cube > div:nth-child(2) {
-webkit-transform: translateZ(200px);
-moz-transform: translateZ(200px);
}

#cube > div:nth-child(3) {
-webkit-transform: rotateY(90deg) translateZ(200px);
-moz-transform: rotateY(90deg) translateZ(200px);
text-align: center;
}

#cube > div:nth-child(4) {
-webkit-transform: rotateY(180deg) translateZ(200px);
-moz-transform: rotateY(180deg) translateZ(200px);
}

#cube > div:nth-child(5) {
-webkit-transform: rotateY(-90deg) translateZ(200px);
-moz-transform: rotateY(-90deg) translateZ(200px);
}

#cube > div:nth-child(6) {
-webkit-transform: rotateX(-90deg) rotate(180deg) translateZ(200px);
-moz-transform: rotateX(-90deg) rotate(180deg) translateZ(200px);
}
</pre>

### Any questions?

This is quite a speedy write-up, if anything needs explaining I'm happy to go into a bit more detail.
