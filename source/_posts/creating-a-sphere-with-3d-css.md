title: 'Creating a sphere with 3D CSS'
tags:
  - 3d
  - css3
  - sphere
  - transformations
  - transitions
  - webkit
categories:
  - experiments
date: 2011-02-10 23:33:33
---

With CSS3’s 3D transforms I’ve illustrated how to build a [cube](/2009-07/animated-css3-cube-interface-using-3d-transforms/) and a [tetrahedron](/2010-10/css-tetrahedron/). It is also possible to create a sphere-like object, albeit with many elements.

[3D CSS Sphere](/experiments/sphere/)
Works in the latest Safari and iOS (just about runs on an iPhone 4).

<time datetime="2012-02-12">__12 Feb 2012__</time>: Experiment updated to support `-moz` now that Firefox 10 supports 3D transforms.

<div class="video-wrapper"><iframe class="vimeo" src="https://player.vimeo.com/video/19806423" width="612" height="408" frameborder="0"></iframe></div>

Recently I’ve been looking at creating applicable 3D carousels. These rely on positioning panels in a circle around a central point (ie. rotation about the Y-axis), I put these panels in an unordered list. A natural extension is to duplicate each `<ul>` and rotate about the X-axis. With ‘A’ rounds (or lists), and ‘B’ panels per round (`<li>`s), I built a script that would distribute these in a circular manner, panels about Y-axis, lists about the X-axis, creating a sphere.

The more elements per round and the more rounds, the smoother the sphere. But this soon stacks up and kills Safari. The optimum numbers have been about 9 rounds and 30 panels per round for a decent looking sphere, but that’s 279 3D elements and Safari starts to choke. Allowing the panels to overlap eases this somewhat and leads to a tighter sphere but it still appears blocky.

The biggest gains come with border radius. Using a huge radius that made each panel circular the sphere suddenly gained a lovely curvature, and the number of rounds and panels could be reduced. In the experiment I use 8 rounds and 24 panels (200 elements). This doesn’t start choking until I start aggressively animating.

[![3D sphere using CSS transform](/images/creating-a-sphere-with-3d-css/sphere-normal.png)](/experiments/sphere/)

Playing with this I’ve built a few different styles of sphere. In the experiment I’ve included the blocky ‘square’ version, along with the smoothed out border radius one (default). Marking panels white, and a few black can create a nice eye-ball effect.

[![Sphere without border radius](/images/creating-a-sphere-with-3d-css/sphere-square-150x150.png)](/experiments/sphere/) [![Eye](/images/creating-a-sphere-with-3d-css/sphere-eye-150x150.png)](/experiments/sphere/)

Also included in the experiment are versions showing a single round and another style named ‘contact’. This takes two lists and animates them like the space transportation device in the Jodie Foster movie of the same name.

[![Rotating rounds](/images/creating-a-sphere-with-3d-css/sphere-contact-150x150.png)](/experiments/sphere/) [![Half a sphere](/images/creating-a-sphere-with-3d-css/sphere-half-150x150.png)](/experiments/sphere/) [![Kaleidoscope effect](/images/creating-a-sphere-with-3d-css/sphere-kaleid-150x150.png)](/experiments/sphere/)

Animating the border radius on all 192 panels (if your machine can cope), gives a neat kaleidoscope effect, also included in the experiment.

## Code

The generated HTML is simply a couple of `<div>`s containing lists:

```html
<div id="sphere">
  <div class="container">
    <ul>
      <li></li>
      <li></li>
      …
    </ul>
    …
  </div>
</div>
```

To transform each set of panels into a circle the total number is divided by 360 to get the angle of rotation. Merely rotating will put all panels on top of each other, translating in the Z axis will move them out from the centre point. The correct translation distance so the panels slightly overlap (ie the circle radius) is worked out with some [simple trigonometry](https://en.wikipedia.org/wiki/Trigonometry#Mnemonics). Lists are rotated in the X axis, simply the number of lists divided by 360.

Looping through each panel for each list, the angles of rotation are gradually increased by the calculated increments and applied to the elements:

```js
var panels = p || this.panels,
  rounds = r || this.rounds,
  rotationPerPanel = 360/panels,
  rotationPerRound = 360/2/rounds,
  yRotation, xRotation,
  width = this.panelWidth,
  zTranslate = (width/2) / Math.tan(rotationPerPanel * Math.PI/180),
  $container = this.el,
  $ul, $li, i, j;

this.el.html('');
for(i = 0; i &lt; rounds; i++) {
  $ul = $('<ul>');
  xRotation = rotationPerRound * i;
  $ul[0].style[transformProperty] = "rotateX("+ xRotation + "deg)";
  for(j = 0; j &lt; panels; j++) {
    $li = $('<li>');
    yRotation = rotationPerPanel * j;
    $li[0].style[transformProperty] = "rotateY("+ yRotation +"deg)
                         translateZ("+ zTranslate +"px)";
    $ul.append($li);
  }
  $container.append($ul);
}
```

To achieve the 3D effect we give `#sphere` some perspective, which forms the containing block. A second container transitions between different transforms, letting us rotate the sphere. The complicated transform parts are applied inline via the JavaScript above, but each list element needs `preserve-3d` so its direct descendants are transformed in the same 3D space (rather than in 2D).

```css
#sphere {
  width: 100px;
  height: 100px;
  margin: 200px auto;
  -webkit-perspective: 800px;
  -moz-persective: 800px;
}

.container {
  width: 100px;
  height: 100px;
  -webkit-transition: -webkit-transform 200ms linear;
  -webkit-transform-style: preserve-3d;
  -moz-transition: -webkit-transform 200ms linear;
  -moz-transform-style: preserve-3d;
}

.container > ul {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  position: absolute;
}

.container li {
  width: 98px;
  height: 98px;
  position: absolute;
  display: block;
  background: #000;
  border: 1px solid #fff;
  opacity: 0.1;
  border-radius: 50px;
}
```
