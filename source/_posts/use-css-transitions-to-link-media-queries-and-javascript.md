title: 'Use CSS transitions to link Media Queries and JavaScript'
tags:
  - css3
  - media-queries
  - transitions
categories:
  - experiments
date: 2011-11-05 14:06:51
---

A common problem in responsive design is the linking of CSS3’s media queries and JavaScript. For instance on a larger screen we can restyle, but it might be useful to use JavaScript and pull in different content at the same time, eg higher quality images. With CSS transitions, specifically their transitionEnd events, we can marry up our media queries and JavaScript perfectly, without resorting to window resize events.

We need a way of testing media query rules in JavaScript, and a way of generating events when a new rule matches. There’s a specification for exactly this: there’s [matchMedia](http://www.w3.org/TR/cssom-view/#extensions-to-the-window-interface) to see if a query matches, and [MediaQueryList](http://www.w3.org/TR/cssom-view/#the-mediaquerylist-interface) with MediaQueryListeners to detect and respond to changes.

matchMedia has support in Chrome, Firefox 6+ and Safari 5.1+ and there’s even a [polyfill](https://github.com/paulirish/matchMedia.js/blob/master/matchMedia.js) (by Scott Jehl, Paul Irish, Nicholas Zakas) for other browsers. So we can happily perform our one off tests in JavaScript (probably on page load):

```js
if (matchMedia('only screen and (max-width: 480px)').matches) {
  // iphone specific JS
}
```

However media query list listeners (that’s a mouthful) are only supported in Firefox 6+. This is the magic of firing events when something changes, it completes the circle.

All is not lost, there is another way of using CSS to generate events and that’s through CSS transitions. When a CSS transition ends it fires a transitionEnd event (webkitTransitionEnd, oTransitionEnd, transitionend) on the appropriate element. Now consider **a transition that occurs only when a media query is applied**. Hey presto, we have a **JavaScript event triggered by media query rules**, however complicated or convoluted that rule may be. **This rocks** and can form the basis of a MediaQueryList polyfill.

## Simple transition CSS and event listener

```css
.mq {
  -webkit-transition: width 0.001ms;
  -moz-transition: width 0.001ms;
  -o-transition: width 0.001ms;
  transition: width 0.001ms;
  width: 0;
}

@media all and (max-width: 480px) {
  .mq {
    width: 1px;
  }
}
```

```js
var mq = document.querySelectorAll('.mq')[0];
mq.addEventListener('webkitTransitionEnd', function() {
  /* Transition ends, media query matched */
}, false);
```

## Proof of concept

I’ve taken the excellent [matchMedia polyfill](https://github.com/paulirish/matchMedia.js) and _quickly_ hacked together a version that includes transition events and a callback.

[Proof of concept demo](/experiments/media-query-transitions/)
(and on [Github](https://github.com/fofr/matchMedia.js))

```css
mql('all and (max-width: 700px)', callback);
```

Pass in a media query string and callback. It immediately returns the test result and the callback will fire whenever the test result changes, the only argument being the MediaQueryList object. This isn’t a polyfill because it doesn’t yet match the specification, if it did the originally returned MQL object would have addListener and removeListener functions (that’s a work in progress).

The CSS transitions are instantaneous via a duration of a little larger than 0, I’ve chosen 0.001ms.

Element transitions are bidirectional, so the event fires when the rule matches and when it no longer matches. Every time the event fires a test is performed to determine state, this is easy using matchMedia.

The CSS transition event tells us which element triggered the transition but no details about the media query rules that governed it. So we use unique elements for each rule to connect the dots.

```css
.mq {
  -webkit-transition: width 0.001ms;
  -moz-transition: width 0.001ms;
  -o-transition: width 0.001ms;
  transition: width 0.001ms;
  width: 0;
}
```

```js
mql = (function(doc, undefined){

  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      idCounter = 0;

  return function(q, cb) {

    var id = 'mql-' + idCounter++,
      callback = function() {
        cb({ matches: (div.offsetWidth == 42), media: q });
      },
      div = doc.createElement('div');

    div.className = 'mq';
    div.style.cssText = "position:absolute;top:-100em";
    div.id = id;
    div.innerHTML = '<style media="'+q+'"> #'+id+' { width: 42px; }</style>';

    div.addEventListener('webkitTransitionEnd', callback, false);
    div.addEventListener('transitionend', callback, false); //Firefox
    div.addEventListener('oTransitionEnd', callback, false); //Opera

    docElem.insertBefore(div, refNode);
    //don’t delete the div, we need to listen to events
    return {
      matches: div.offsetWidth == 42,
      media: q
    };
  };

})(document);
```

## Demo code

```js
$(function() {
  var $dynamic = $('.dynamic');
  mql('all and (max-width: 700px)', change);
  mql('all and (max-width: 500px)', change);
  mql('all and (min-width: 1200px)', change);

  function change(mql) {
    console.log(mql);
    $dynamic.prepend('<p>' + mql.media + ' &mdash; ' + mql.matches + '</p>');
  }
});
```

## Support

Obviously for this to work we need both CSS transitions and media query support in the browser. Looking at [caniuse.com](http://caniuse.com) and [QuirksMode](http://www.quirksmode.org/webkit.html#t03) this technique should be supported by: Chrome, Android (2.1+), Opera (10.6+), Opera Mobile (10.0+), Firefox (4+), Safari (3.2+) and iOS (3.2+). Samsung’s Dolfin and Blackberry 6 support CSS animations, I presume that means transitions too, but I can’t easily test.

Of course, IE is lagging behind, as always. IE9 supports media queries but it has no transition support, that’s coming in IE10.
