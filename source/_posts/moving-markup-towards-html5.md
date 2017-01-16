title: 'Moving markup towards HTML5'
tags:
  - html5
  - javascript
categories:
  - writing
date: 2009-06-10 15:03:31
---

Having read John Resig’s [HTML5 Shiv](http://ejohn.org/blog/html5-shiv/) article and Remy Sharp’s [HTML5 enabling script](https://remysharp.com/2009/01/07/html5-enabling-script/), it felt like the right time to begin the full fledged migration from XHTML to a cross browser compatible HTML5 blog. All in all the process of updating the templates was painless, taking about an hour or so to modify the Wordpress Sandbox theme.

To enable IE6 and IE7 support for new HTML5 tags, which are not naturally styled, some JavaScript is necessary. As per the shiv article, Remy Sharp has a small script that creates DOM elements, one for each type of new HTML5 tag, the simple act of doing so leads Internet Explorer to apply styles to said tags. I slightly modified the existing script to add the recently proposed `hgroup`.

Even though these tags accept style they don’t come with their default renderings. For that we need a bit of CSS to make block elements behave as they should.

```js
(function(){
  if(!/*@cc_on!@*/0) return;
  var e = &quot;abbr,article,aside,audio,bb,canvas,datagrid,datalist,details,dialog,
    eventsource,figure,footer,hgroup,header,mark,menu,meter,nav,output,
    progress,section,time,video&quot;.split(','),i=0,length=e.length;
  while(i&lt;length){
    document.createElement(e[i++])
  }
})();
```

```css
article, aside, dialog, footer, header, section, footer, nav, figure {
  display: block;
}
```

I’ve also updated the Eric Meyer reset script, removing now deprecated HTML 4 tags and applying reset to the new elements, so they do not unexpectedly inherit padding, margin, etc. in the future. These changes are not yet exhaustive.

Moving onto the page’s actual markup, the new DOCTYPE and character encoding settings are remarkably simple. Standards based web development is getting easier. For browsers that do not support HTML5, the new DOCTYPE still triggers standards mode. The `xmlns` HTML attribute is no longer necessary and the `profile` attribute has been dropped.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <title>FofR Online</title>
```

The header section has been placed in the appropriate `<header>` tags, and similarly with the footer. I’d hoped to include the ‘About Me’ section within this, but as part of the specification you cannot include headings within a `<footer>` element.

Each of the posts comes wrapped in an `<article>` tag, ie an independent element with content that could standalone. Within are the respective `<header>` (containing title and date) and `<footer>` (containing meta links)  elements. Technically the meta links could be marked as `<nav>`, but the former is more fitting and still acceptable use.

The date makes use of HTML5’s `<time>` element, with a `datetime` attribute that gives the precise posting time, including timezone offset.

The previous and next links that follow the article can comfortably sit within a `<nav>` tag. Similarly, my sidebar region is predominantly navigation based with lists of archives and categories, it’s been marked as such.

```html
<article id="post-67" class="">
  <header>
    <h2 class="entry-title">
      <a href="" title="" rel="bookmark">POST TITLE</a>
    </h2>
    <div class="entry-date">
      <time datetime="2009-04-30T15:54:28-07:00" class="published" title="2009-04-30T15:54:28-07:00">
        April 30, 2009 &#8211; 3:54 pm
      </time>
    </div>
  </header>
  <div class="entry-content">
    POST
  </div>
  <footer class="entry-meta">
    META LINKS
  </footer>
</article>

<nav id="nav-below" class="navigation clearfix">
  <div class="nav-previous"></div>
  <div class="nav-next"></div>
</nav>
```

One avenue I should explore is the inclusion of the `<section>` tag, which I’d like to break up individual posts, probably by splitting the content at level three headings downwards; thereby becoming the header of each new section.

It’ll be a while before the real benefits of HTML5 can be fully appreciated by everyone, but it feels good to make a start, however small that step may be.
