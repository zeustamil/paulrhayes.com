title: 'Useful CSS snippets'
tags:
  - css
  - css3
id: 104
categories:
  - Code
date: 2010-08-12 08:56:14
---

A quick round-up of some CSS tricks I use on my sites.

### Reset input type search

Safari renders search inputs with curved corners and a spy glass. If this doesn't fit into your design, but you want to retain correct semantics, this reset is helpful. The first line removes the curved corners, but leaves a white space where the spy glass was, this is removed using the second line.

<pre class="thin">
input[type=search] {
-webkit-appearance: none;
}
input[type=search]::-webkit-search-decoration {
display: none;
}
```

### Border radius

Both Safari 5 and the latest Chrome support `border-radius`, given the fast update curves for these browsers, I have stopped using `-webkit-border-radius`, and almost always default to the useful shorthand (older versions of iOS are a known caveat).

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> border-radius can now be used without a vendor prefix.
</div>

```
border-radius: 10px 0 0 10px;
```

### Tweaked clearfix

I still see a lot of sites using the old clearfix, including IE for Mac hacks. I've cleaned this up a bit and moved the IE specific parts into conditional IE stylesheets. For lists, I found I often need to clear each `li`, to save littering the HTML with class names, I added `clearfixItems li`, now I only need one class on the `ul` or `ol`.

```
.clearfix:after,
.clearfixItems li:after {
content: ".";
display: block;
height: 0;
clear: both;
visibility: hidden;
}
```

Then in IE6 and IE7:
```
.clearfix, .clearfixItems li {
zoom: 1;
}
```

### Equal height columns

For when you want your containers to have the same height. If you are unfamiliar with this technique, I recommend reading [Ed Eliot's article](http://www.ejeliot.com/blog/61).

```.col {
margin-bottom: -1000px;
padding-bottom: 1000px;
}```

### Ligatures and kerning pairs

Where fonts support it, text rendering can be improved by enabling kerning pairs and ligature support. Add the following to your `body` to enable it on all text:

```text-rendering: optimizeLegibility;```

Firefox's default state (text-rendering: auto) partially enables this, optimizing legibility on font sizes above 20px (surely legibility is most important on the smallest text?). Using the above code will optimize all font sizes, more details are available at [MDC](https://developer.mozilla.org/en/CSS/text-rendering), as pointed out in the comments by _rdela_.

### Gradients

An invaluable tool for avoiding images and extra HTTP requests. For the most part I avoid providing fallback images, instead seeing gradients as a progressive enhancement. This usually means Opera and FF3.5 or less will see a solid colour, I'm fine with that.

<div class="edit">
<time datetime="2012-02-12">12 Feb 2012</time> Webkit's gradient syntax has been updated to match the emerging standard.
</div>

```
background: #990000;
/* old: background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#cc0000), to(#990000)); */
background: -webkit-linear-gradient(#cc0000, #990000);
background: -moz-linear-gradient(#cc0000,#990000);
```

And in IE conditional stylesheets:
```
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#cc0000, endColorstr=#990000);
```
