title: 'Improving the CSS only modal'
tags:
  - animation
  - css3
  - html5
  - modal
  - transformations
id: 141
categories:
  - Code
date: 2011-04-26 21:43:51
---

In [my original post](/2011-03/css-modal/) I explained how to create a CSS only modal pop-up using :target, pseudo-elements and pointer events. This had a number of caveats, any browser that didn’t support pointer events would see a non-clickable page and the forward/back controls would navigate through dialogues, which is usually undesirable. Of course it was only an experiment.

<div class="edit">
<time datetime="2013-02-10">10 Feb 2013</time> The site’s design has been updated and the comment form reverted to a simpler, non-modal one. The original can still be seen in the video below.
</div>

<div class="video-wrapper"><iframe class="vimeo" src="http://player.vimeo.com/video/22774103" width="612" height="408" frameborder="0"></iframe></div>

All references to the :target pseudo-selector have been removed, instead an “active” class is toggled using JavaScript. The CSS modal still uses an opacity transition but pointer events are gone. The default is now display:none with an intermediate state that renders the modal as display:block (remember it still begins at opacity: 0).

The flow is:

*   Add an intermediate class to trigger the modal elements above everything, with opacity 0.
*   Add an active class to trigger animation and transition to full opacity.
*   On close, remove active class, add minimise class to trigger  minimise animation and transition to opacity 0.
*   Remove intermediate class.

Onclick handlers are added to the “post comment” links to add classes and to the close link to remove them. When opened a handler is added to the body to listen for the ESC key, which closes the modal. The first input in the modal is focused on open.

I took the opportunity to play with some HTML5 features. The comment form now uses placeholder attributes, and if supported, labels are hidden. The feature detection is delightfully simple:

```js
supportPlaceholder: function() {
  var i = document.createElement('input');
  return 'placeholder' in i;
}()
```

See [Dive into HTML5](http://diveintohtml5.org/detect.html#input-placeholder) for more.

The close link text which has an :after pseudo-element (i.e. the X) is no longer hidden, instead it becomes the cancel link and is essential for browsers that can’t comprehend generated content.

In webkit you’ll see the modal bounce in and minimise out (smoothly in Safari and iOS). In Firefox you’ll get an opacity transition and in IE the modal will just appear or disappear. In IE8 and below the page is not greyed out due to lack of rgba support. I’m fine with this. This is still a bit of a trial to see how people actually use the modal and what problems it might throw up.

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Firefox 10 has much improved animation performance. Experiment updated to be full featured.
</div>

In conclusion, with JavaScript much of the mechanical new CSS can be dropped and with a slightly more complicated class toggle system we achieve cross browser support, without sacrificing that lovely hardware accelerated CSS animation.

Still want that animation cross browser? I recommend looking into [Faruk Ateş’s Runloop jQuery plugin](http://farukat.es/journal/2011/02/514-new-creation-jquery-runloop-plugin) which gives you keyframed animations in any browser.
