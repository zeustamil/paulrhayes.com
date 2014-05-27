title: 'Creating an accordion using CSS transitions'
tags:
  - css3
  - transitions
  - webkit
id: 89
categories:
  - Experiments
date: 2009-06-25 14:46:36
---

An accordion effect can be achieved using CSS3’s `:target` pseudo-class, without requiring JavaScript. Using the proprietary `-webkit-transition` property this accordion can also be animated.

## Result

[CSS3 Accordion](/experiments/accordion/#one)
Works in browsers that support the `:target` pseudo-class, see the [Quirks Mode compatibility tables](http://www.quirksmode.org/css/contents.html#t34). Animation works in recent WebKit based browsers.

<time datetime="2012-02-12">12 Feb 2012</time>: Experiment updated. Transitions are now widely supported, including Opera, Firefox and IE10.

## How To

Each part of the accordion has an ID, heading and content region. The header includes a link that matches the section’s ID, whilst the content is wrapped in a container which will control its display.

```html
<div class="accordion">
  <h2>Accordion Demo</h2>
  <div id="one" class="section">
    <h3>
      <a href="#one">Heading 1</a>
    </h3>
    <div>
      <p>Content</p>
    </div>
  </div>
  <div id="two" class="section">
    <h3>
      <a href="#two">Heading 2</a>
    </h3>
    <div>
      <p>Content</p>
    </div>
  </div>
</div>
```

The CSS then relies on the `:target` pseudo-class to apply different styles to the chosen section — increasing the height and, in large content cases, altering the overflow behaviour to allow scrolling. To animate the opening and closing of sections the `-webkit-transition` property is needed ([documentation](http://www.w3.org/TR/css3-transitions/)), in this case acting on the height attribute for a duration of 0.3 seconds using the ease-in timing function.

Stripping out the styling, the CSS boils down to:

```css
.accordion h3 + div {
  height: 0;
  overflow: hidden;
  -webkit-transition: height 0.3s ease-in;
  -moz-transition: height 0.3s ease-in;
  -o-transition: height 0.3s ease-in;
  -ms-transition: height 0.3s ease-in;
  transition: height 0.3s ease-in;
}

.accordion :target h3 + div {
  height: 100px;
}

.accordion .section.large:target h3 + div {
  overflow: auto;
}
```

## Critique

Obviously this approach has its limitations. Multiple open accordions on one page wouldn’t be possible — restricted by a URI’s one fragment identifier limit; as one accordion opens the other would lose the target and automatically close. Similarly, pages that use a fragment identifier for everyday use will notice oddities — take for instance when using _top_ links to return to the top of the page, any accordion would, in this case, reset. Other uses include accessibility links and simulated page histories when using Ajax.
