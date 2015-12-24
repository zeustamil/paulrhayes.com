title: 'A problem with exports'
tags:
  - bug
  - js
categories:
  - code
date: 2015-12-24
---

A story about my favourite front-end bug of 2015. Or, why you shouldn’t assume `exports` will be falsy.

A combination of an established module pattern, headings with dynamic IDs, content on a specific topic and the quirky way that browsers handle IDs on elements created an obscure bug.

The bug manifested in a way that broke other things, [it started as a report](https://www.pivotaltracker.com/n/projects/1261204/stories/87097366) about a [contents link overlapping some content](https://www.pivotaltracker.com/file_attachments/41258320/download). The console showed the unhelpful error:

`Uncaught TypeError: undefined is not a function`

## Exports and modules

CommonJS uses a global `exports` variable to export properties from a module. A pattern in frontend libraries is to check for the presence of `exports` to see if the library, in its current context, should behave as a module.

Here's what you'll usually see:
```js
typeof exports !== 'undefined' ? exports : SomeLibrary
```

At [GOV.UK](https://www.gov.uk) we use [Hogan](http://twitter.github.io/hogan.js/) for javascript templating. At the bottom of the Hogan library you’ll [find a similar line](https://github.com/twitter/hogan.js/blob/master/web/builds/3.0.2/hogan-3.0.2.js#L754):

```js
(typeof exports !== 'undefined' ? exports : Hogan);
```

## Element IDs

Browsers have a quirky and little known behaviour when it comes to element IDs. The `window` object must have a property `key` with the value `element`, if there is exactly one DOM element with the ID `key`.

Essentially, elements on a page with a unique ID create a global variable.

With this markup:
```html
<h2 id="heading">Heading</h2>
```

You can access the element with the following JS:
```js
// Each returns the element
window['heading']
window.heading
heading
```

Internet Explorer started it and now it's a standard:

* [WHATWG](https://html.spec.whatwg.org/#named-access-on-the-window-object)
* [W3C](http://www.w3.org/html/wg/drafts/html/master/browsers.html#named-access-on-the-window-object)

There's a lot of bad things about this, [Bob Ince on Stack Overflow](http://stackoverflow.com/questions/3434278/do-dom-tree-elements-with-ids-become-global-variables) gives a good summary of the mess you could find yourself in.

## IDs on page headings

Well structured content gets broken down into parts, each with their own heading. Linking to part of a document is useful and the common approach is to link to an ID using a [fragment identifier](https://en.wikipedia.org/wiki/Fragment_identifier).

To make this easy publishing tools often generate IDs on headings, based on the heading text. [GOV.UK](https://www.gov.uk) does it, so too does this blog. The heading above, "IDs on page headings" has the generated ID: `IDs_on_page_headings`, [this is a link to it](#IDs_on_page_headings).

When you're government it's likely you'll create an article about imports and _exports_. Here's one: [A guide for international post users](https://www.gov.uk/government/publications/notice-143-a-guide-for-international-post-users/notice-143-a-guide-for-international-post-users#exports)

## Putting it all together

On pages with an exports section we see:

```html
<h2 id="exports">Exports</h2>
```

Browsers take the ID and create `window.exports`. Now when we call the Hogan library code, the check for `exports` gives a false positive. Hogan [gets passed an HTML element instead of an empty object](https://github.com/twitter/hogan.js/blob/master/web/builds/3.0.2/hogan-3.0.2.js#L18-L20), and fails to start properly. Subsequent calls to `new Hogan.Template` then fail.

```js
var Hogan = {};

(function(Hogan) {
  // The value of Hogan at this point is the HTML element
  // <h2 id="exports">Exports</h2>

  // Hogan code
  …
})(typeof exports !== 'undefined' ? exports : Hogan);
```

## The hot fix

We aren't using the CommonJS module pattern. Removing the `exports` logic fixed the bug. Here's the pull request: [Remove `typeof exports` check in Hogan libraries](https://github.com/alphagov/shared_mustache/pull/8).

```diff
-})(typeof exports !== 'undefined' ? exports : Hogan);
+})(Hogan);
```

This needs to be fixed upstream, and the use of this exports pattern re-considered. I've [opened an issue](https://github.com/twitter/hogan.js/issues/238) on the Hogan repository.
