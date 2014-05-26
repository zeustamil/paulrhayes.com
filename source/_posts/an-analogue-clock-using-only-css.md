title: 'An analogue clock using only CSS'
tags:
  - css3
  - transformations
  - transitions
  - webkit
id: 23
categories:
  - Experiments
date: 2009-03-24 17:16:44
---

Having read the blurb around [Safari's CSS transitions](http://webkit.org/blog/138/css-animation/) I opted to familiarize myself with a quick project - the aim of which was to create a functional, CSS only, analogue clock.
<!--more-->

### Result

[Experiment: CSS Analogue Clock](/experiments/clock/#clock)
Experiment works in Safari 4 Beta and Google Chrome. A working clock that optionally resorts to JavaScript to grab the current time (can be achieved by other means).

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Exper­i­ment updated. Transforms are now widely sup­ported. Support includes Opera, Fire­fox and IE9\. Transitions are coming in IE10.
</div>

### How To

Before getting into the nitty gritty I created four images, a clock face and three transparent PNG hands (seconds, minutes and hours), ensuring that each of these were the same size so that when overlayed their centres would align. The HTML and CSS to get us going is as follows:

<pre class='prettyprint'>
&lt;div id=&quot;clock&quot;&gt;
	&lt;div id=&quot;hour&quot;&gt;&lt;img src=&quot;images/hourHand.png&quot; /&gt;&lt;/div&gt;
	&lt;div id=&quot;minute&quot;&gt;&lt;img src=&quot;images/minuteHand.png&quot; /&gt;&lt;/div&gt;
	&lt;div id=&quot;second&quot;&gt;&lt;img src=&quot;images/secondHand.png&quot; /&gt;&lt;/div&gt;
&lt;/div&gt;
```

<pre class='prettyprint'>
#clock {
position: relative;
width: 378px;
height: 378px;
background-image: url('../images/clockFace.png');
left: 50%;
margin: 5em 0 0 -189px;
}

#clock div {
position: absolute;
}
```

The magic that rotates the clock's hands comes via two WebKit specific CSS properties, `-webkit-transition` ([documentation](http://webkit.org/specs/CSSVisualEffects/CSSTransitions.html)) and `-webkit-transform` ([documentation](http://webkit.org/specs/CSSVisualEffects/CSSTransforms.html)). The transform property can alter the appearance of an element via a two dimensional transformation, for instance: scaling, rotating and skewing a DIV element. In this case it is used to rotate the clock hands to the correct angles; the CSS below puts the hour hand at 3 o'clock:

<pre class='prettyprint'>
#clock img[src*='hour'] {
-webkit-transform: rotate(90deg);
}
```

The transition property creates an animation of a specified property between two values when triggered, for instance fading the opacity on a DIV element from 1 to 0 - triggered using the :hover pseudo class. Transition duration and the transition timing function (e.g. linear) should also be set, amongst other optional properties. In this example the transition is from one transformation angle to another with durations that match the appropriate clock hand, so the second hand takes 60 seconds to complete a 360 degree rotation. The transition is triggered using the :target pseudo element - if the URI contains the 'clock' fragment then the time piece shall start ticking.

<pre class='prettyprint'>
#clock img[src*='second'] {
/* -webkit-transition: property duration timing-function */
-webkit-transition: -webkit-transform 60s linear;
}

#clock:target img[src*='second'] {
-webkit-transform: rotate(360deg);
}
```

The above transition lasts only one rotation but by altering the duration length and degree of rotation in accordance the second hand can keep on going (e.g. 600 seconds and 3600 degrees rotation gives a battery life of 10 minutes), a fairly safe assumption that users will not stay on the page for too long.

<pre class='prettyprint'>
#clock img[src*='second'] {
-webkit-transition: -webkit-transform 600000s linear;
}

#clock:target img[src*='second'] {
-webkit-transform: rotate(3600000deg);
}

#clock img[src*='minute'] {
-webkit-transition: -webkit-transform 360000s linear;
}

#clock:target img[src*='minute'] {
-webkit-transform: rotate(36000deg);
}
```

### Grab the current time

Although the animation works beautifully, CSS alone is not capable of obtaining the current time. To start the clock at the correct time a dynamic transformation needs to be applied to the clock hand containers, this is  easiest done with inline styles and can be set in any number of ways by the backend when the page loads, thereby eradicating any need for JavaScript.

Alternatively, if you've no objections to using JavaScript, I've created a small `startClock()` function to do the job (_albeit using Prototype 1.6.0.3 for my own convenience_):
<pre class='prettyprint'>
function startClock() {
	var angle = 360/60;
	var date = new Date();
	var hour = date.getHours();
	if(hour > 12) {
		hour = hour - 12;
	}
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var hourAngle = (360/12)*hour + (360/(12*60))*minute;
	$('minute').setStyle('-webkit-transform: rotate('+angle*minute+'deg)');
	$('second').setStyle('-webkit-transform: rotate('+angle*second+'deg)');
	$('hour').setStyle('-webkit-transform: rotate('+hourAngle+'deg)');
}
```

A word of warning - applying the inline style directly to the image will override the transition effects defined in the CSS file.
