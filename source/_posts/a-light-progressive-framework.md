title: 'A light, progressive framework'
tags:
  - framework
  - js
  - lastfm
id: 164
categories:
  - Code
date: 2013-09-10 14:02:22
---

At Last.fm we've been gradually upgrading our front-end. In this blog post I'll outline the fundamentals of our new JavaScript framework, although the full code isn't open sourced _yet_.

[Progressive enhancement is important](http://thatemil.com/blog/2013/07/02/progressive-enhancement-still-not-dead/), and Last.fm remains a traditional HTML website with full page reloads. Using layers of unobtrusive JavaScript we build up functionality, not because JavaScript is sometimes disabled (that's a rarity, [even amongst screen reader users](http://webaim.org/projects/screenreadersurvey4/#javascript)), but [because broken JavaScript happens](http://jakearchibald.com/2013/progressive-enhancement-still-important/).

We use [RequireJS](http://requirejs.org/) for dependency management, [Jasmine](http://pivotal.github.io/jasmine/) for testing, and [jQuery](http://jquery.com/). Our framework is light, and is founded on a simple instantiation pattern: modules are marked up using data attributes, anything with a `data-require` attribute is deemed to be a module. On page load, our app finds these modules in the DOM, 'requires' them and their dependencies, instantiates them and starts them. (A concatenated minified build file means we don't make an HTTP request for each file.)

On creation each module is passed an instance of the app, from which the module can communicate upwards and outwards, as well as an element, the bounding box of the module, as defined by the position of the data attribute.

This markup:
```
&lt;div data-require=&quot;path/to/module&quot;&gt;
…
&lt;/div&gt;
```

Instantiates:
```
define(['some-dependency'], function(someDependency) {

    var MODULE = function(app, $el) {

	this.start = function() {
            …
        }

        …
    };

    return MODULE;
});
```

Looking at our legacy code this deals with three of the serious problems we'd faced: Knowing what JavaScript files are affected or used by others; providing a simple means to get a module up and running without resorting to inline JavaScript; and naturally limiting the module to operate within its bounds.

Configuration is commonly provided via further data attributes. Examples might be an ajax end point with data-url, or perhaps a Mustache template with data-template, etc.

```
&lt;div data-require=&quot;module&quot; data-url=&quot;path/to/endpoint&quot; data-template=&quot;path/to/template&quot;&gt;
…
&lt;/div&gt;
```

### Separation of concerns

JavaScript modules define behaviour, behaviour that should be abstracted and distinct from presentation and semantics, eg. a disclosure, a toggle, or a drop down menu. Whether it's an image, arbitrary text or a heading that toggles something, it shouldn't matter — the module is given a set of interaction hooks and applies its behavioural rules.

We use classes to provide these hooks. The problem with using classes is the risk that those same classes will be used to define styles; this tightly couples presentation and behaviour. To avoid this all JavaScript hooks are prefixed with `js-`.

Here's an example of a simple disclose module:

```
&lt;div data-require=&quot;disclose&quot;&gt;
    &lt;p class=&quot;js-hide-on-disclose&quot;&gt;
        Some preview that gets hidden.
    &lt;/p&gt;
    &lt;a href=&quot;/details&quot; class=&quot;js-disclose&quot;&gt;
        Show details
    &lt;/a&gt;
    &lt;div class=&quot;hide js-disclosed&quot;&gt;
        Details to be revealed.
    &lt;/div&gt;
&lt;/div&gt;
```

```
define(function() {

    var Disclose = function(app, $el) {

        var that = this;

        that.start = function() {
            $el.on('click', '.js-disclose', disclose);
        };

        that.stop = function() {
            $el.off('click');
        };

        function disclose(event) {
            event.preventDefault();

            $el.find('.js-disclosed').removeClass('hide');
            $el.find('.js-disclose, .js-hide-on-disclose').hide();

            // Analytics tracking
            app.track('DisclosureOpened');

            that.stop();
        };
    }

    return Disclose;
});
```

### App interface

The app acts as a tool belt for many of the common abstractions. All AJAX requests go through either app.get() or app.post(). There's also a common event mediator, accessed through app.publish(), app.subscribe() and app.unsubscribe().

### Keeping it simple

We've purposefully kept the code small. We do this by only building the features we need. For instance, until very recently we didn't need a general purpose unsubscribe method, so we didn't build one.
