title: 'Creating a tetrahedron with 3D CSS'
tags:
  - 3d
  - animation
  - css3
  - pyramid
  - transformations
categories:
  - experiments
date: 2010-10-06 19:59:59
---

A triangle can be created in CSS by manipulating the borders of an element. Combining four triangles in a 3D space using `-webkit-transform`, these can be positioned to form a tetrahedron (or pyramid if you prefer).

[CSS pyramid - proof of concept](/experiments/pyramid/)
For now this only works in Safari 5.0.2+ and iOS, although 3D transforms will surface in Firefox 4 and the next build of Chrome. The demo doesn’t use JavaScript.

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Experiment updated for Firefox 10 which supports 3D transforms.
</div>

<div class="edit">
<time datetime="2012-11-24">24 Nov 2012</time> Code updated with a [pull request](https://github.com/fofr/paulrhayes.com-experiments/pull/2) from [jbecousse](https://github.com/jbecousse) to improve the angle of rotation and the shades of the different faces.
</div>

<div class="video-wrapper"><iframe class="vimeo" src="https://player.vimeo.com/video/19500636" width="612" height="408" frameborder="0"></iframe></div>

Combining squares and triangles, [cubes](http://www.paulrhayes.com/2010-09/3d-css-cube-ii-touch-gestures-click-and-drag/) and pyramids, all sorts of 3D structures are now possible, if you are so inclined. Not necessarily useful, but possible.

[![CSS pyramid](http://host.trivialbeing.org/up/small/css-pyramid.png)](/experiments/pyramid/)

The rotation is performed using a `-webkit-animation`, I’ve given the animation the name `spin`, which rotates the pyramid around Y from 0 to 360 degrees:

```css
#pyramid {
  -webkit-animation: spin 5s linear infinite;
  -moz-animation: spin 5s linear infinite;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotateY(0deg) rotateX(-20deg);
  }
  to {
    -webkit-transform: rotateY(360deg) rotateX(-20deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotateY(0deg) rotateX(-20deg);
  }
  to {
    -moz-transform: rotateY(360deg) rotateX(-20deg);
  }
}
```

If you haven’t seen it before, the code to create an approximate equilateral triangle is as follows:

```css
#pyramid > div {
  position: absolute;
  border-color: transparent transparent transparent rgba(50, 50, 50, 0.5);
  border-style: solid;
  border-radius: 3px;
  border-width: 200px 0 200px 346px;
}
```

Tantek Çelik coined this technique in his [study of regular polygons](http://tantek.com/CSS/Examples/polygons.html) which includes pentagons, hexagons and octagons. The methods are explained over at the [Filament Group](http://www.filamentgroup.com/lab/image_free_css_tooltip_pointers_a_use_for_polygonal_css/).

The 3D techniques I’ve used in this experiment are explained in my [3D cube post](http://www.paulrhayes.com/2009-07/animated-css3-cube-interface-using-3d-transforms/) (July 2009). This is a proof of concept and I haven’t delved into the mathematics or geometry too much, instead opting for the slightly faster but significantly less clever and less reproducible trial-and-error approach.

```css
#pyramid > div:first-child  {
  -webkit-transform: rotateY(-19.5deg);
  -moz-transform: rotateY(-19.5deg);
}

#pyramid > div:nth-child(2) {
  -webkit-transform: rotateY(90deg) rotateZ(60deg);
  -moz-transform: rotateY(90deg) rotateZ(60deg);
}

#pyramid > div:nth-child(3) {
  -webkit-transform: rotateX(60deg) rotateY(19.5deg);
  -moz-transform: rotateX(60deg) rotateY(19.5deg);
}

#pyramid > div:nth-child(4) {
  -webkit-transform: rotateX(-60deg) rotateY(19.5deg) translateX(-116px) translateY(-200px);
  -webkit-transform-origin: 0 0 -326px;
  -moz-transform: rotateX(-60deg) rotateY(19.5deg) translateX(-116px) translateY(-200px);
  -moz-transform-origin: 0 0 -326px;
}
```
