title: 'Creating a modern modal with CSS'
tags:
  - ':target'
  - animation
  - css3
  - modal
  - transitions
id: 139
categories:
  - Experiments
date: 2011-03-17 20:52:29
---

Using CSS3 techniques a modal box can be created without JavaScript or images. With a bit of animation, transition and transform, it can be made that little bit more special.

[CSS Modal Experiment](/experiments/modal/)

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Modal experiment updated for Firefox 10 which has better transform, transition and animation performance. Also supports 3D transforms.
</div>

<div class="video-wrapper"><iframe class="vimeo" src="http://player.vimeo.com/video/21170189" width="612" height="408" frameborder="0"></iframe></div>

In this experiment, clicking an ‘open’ link pops up a dialogue with a smooth hardware accelerated bounce (where supported). When open all other elements on the page are non-clickable. Closing the modal is also animated, with a minimise effect. I've marked up the modal using `<aside>`, but depending on the purpose of yours, `<nav>` or probably `<details>` might be more appropriate.

Of course, using images and JS will only make the modal better, and something like hitting ESC to close will never be reproduced in CSS. Pure CSS is rarely the best production-ready solution.

### How to

The `:target` pseudo-selector changes the style of a targeted element. Combining a link pointing to an element with `:target` and altering visibility/display/opacity gives a hide/show mechanism. To facilitate the animations, which were jerky when using display:none, I’ve used a combination of :target, opacity and [pointer events](https://developer.mozilla.org/en/css/pointer-events):

```css
.modal {
  opacity: 0;
  pointer-events: none;
}

.modal:target {
  opacity: 1;
  pointer-events: auto;
}
```

The modal is two parts, one part container, one part content. Ideally the container would be generated using a pseudo-element, but I haven’t got that working yet. The container spreads across the whole page and dims the background with rgba. A high z-index puts the modal on top.

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  …
}
```

The content is positioned roughly in the middle and is prettified with a sprinkling of text shadow, border radius, box shadow and gradient.

There are two animations, one named “bounce” (scale to slightly larger than normal, then fall back) and another, “minimise”, which act on the content part. These combine with a separate opacity transition on the container.

The simple opacity transition:

```css
.modal {
  …
  -webkit-transition: opacity 500ms ease-in;
  -moz-transition: opacity 500ms ease-in;
  transition: opacity 500ms ease-in;
}
```

The scaling animations, although only 2D, uses scale3d for hardware acceleration. To make the bounce more realistic box shadow is also animated, which comes with a performance hit. Showing only the webkit version for brevity:

```css
@-webkit-keyframes bounce {
  0% {
    -webkit-transform: scale3d(0.1,0.1,1);
    box-shadow: 0 3px 20px rgba(0,0,0,0.9);
  }
  55% {
    -webkit-transform: scale3d(1.08,1.08,1);
    box-shadow: 0 10px 20px rgba(0,0,0,0);
  }
  75% {
    -webkit-transform: scale3d(0.95,0.95,1);
    box-shadow: 0 0 20px rgba(0,0,0,0.9);
  }
  100% {
    -webkit-transform: scale3d(1,1,1);
    box-shadow: 0 3px 20px rgba(0,0,0,0.9);
  }
}

@-webkit-keyframes minimise {
  0% {
    -webkit-transform: scale3d(1,1,1);
  }
  100% {
    -webkit-transform: scale3d(0.1,0.1,1);
  }
}
```

To change the animation on open we can use the cascade and override the default animation with a more specific one, using :target again:

```css
.modal > div {
  …
  -webkit-animation: minimise 500ms linear;
}

.modal:target > div {
  -webkit-animation-name: bounce;
}
```

The close button is a hidden close link with a styled ::after pseudo-element that scales on hover/focus/active. As we’re hiding the original close link, there are some hoops to jump through to make the :focus state change on the pseudo-element. The traditional clip, text indent or visibility hidden methods all fail, and I’ve resorted to color:transparent and some specific focus styles to override the confused native ones.

```css
.modal a[href="#close"] {
  …
  color: transparent;
}

.modal a[href="#close"]:after {
  content: 'X';
  display: block;
  …
}

.modal a[href="#close"]:focus:after,
.modal a[href="#close"]:hover:after {
  -webkit-transform: scale(1.1,1.1);
  -moz-transform: scale(1.1,1.1);
}

.modal a[href="#close"]:focus:after {
  outline: 1px solid #000;
}
```

### Caveats

It won't work in IE8 and below, there's no pointer-event support and opacity is poorly implemented. IE9 supports :target but no pointer-events. Some IE specific styles could easily switch the opacity toggle to a display or visibility one.

Users will still be able to tab through the links in the background and activate them. This only becomes an issue if you ignore the focus state…

As I alluded to at the start, some JS hooks for keyboard interaction wouldn't go amiss, ESC to close and something to pull focus to the current modal and then back again on close.

The close button would probably look better with an image and the markup uses an extra containing element, which is always undesirable.

Animations can be great, in small quantities, but something that animates too much and gets in the way of functionality is a major drawback for users. It would be quite easy to go overboard with this.

<div class="edit">
<time datetime="2011-04-26">26 Apr 2011</time> I've added a follow up post that addresses some of the caveats and makes this a little more cross browser compatible: [CSS Modal Follow Up](/2011-04/css-modal-follow-up/).
</div>
