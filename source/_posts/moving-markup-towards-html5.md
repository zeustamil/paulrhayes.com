title: 'Moving markup towards HTML5'
tags:
  - html5
  - javascript
id: 78
categories:
  - Code
date: 2009-06-10 15:03:31
---

Having read John Resig's "[HTML5 Shiv](http://ejohn.org/blog/html5-shiv/)" article and Remy Sharp's "[HTML5 enabling script](http://remysharp.com/2009/01/07/html5-enabling-script/)", it felt like the right time to begin the full fledged migration from XHTML to a cross browser compatible HTML5 blog. All in all the process of updating the templates was painless, taking about an hour or so to modify the Wordpress Sandbox theme.
<!--more-->

To enable IE6 and IE7 support for new HTML5 tags, which are not naturally styled, some JavaScript is necessary. As per the 'shiv' article, Remy Sharp has a small script that creates DOM elements, one for each type of new HTML5 tag, the simple act of doing so leads Internet Explorer to apply styles to said tags. I slightly modified the existing script to add the recently proposed `hgroup`.

Even though these tags accept style they don't come with their default renderings. For that we need a bit of CSS to make block elements behave as they should.

<pre class='prettyprint'>
(function(){
	if(!/*@cc_on!@*/0) return;
	var e = &quot;abbr,article,aside,audio,bb,canvas,datagrid,datalist,details,dialog,
		eventsource,figure,footer,hgroup,header,mark,menu,meter,nav,output,
		progress,section,time,video&quot;.split(','),i=0,length=e.length;
	while(i&lt;length){
		document.createElement(e[i++])
	}
})();
</pre>

<pre class='prettyprint'>
article, aside, dialog, footer, header, section, footer, nav, figure {
	display: block;
}
</pre>

I've also updated the Eric Meyer reset script, removing now deprecated HTML 4 tags and applying reset to the new elements, so they do not unexpectedly inherit padding, margin, etc. in the future. These changes are not yet exhaustive.

Moving onto the page's actual markup, the new DOCTYPE and character encoding settings are remarkably simple. Standards based web development is getting easier. For browsers that do not support HTML5, the new DOCTYPE still triggers standards mode. The `xmlns` HTML attribute is no longer necessary and the `profile` attribute has been dropped.

<pre class='prettyprint'>
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot; dir=&quot;ltr&quot;&gt;
&lt;head&gt;
	&lt;meta charset=&quot;UTF-8&quot; /&gt;
	&lt;title&gt;FofR Online&lt;/title&gt;
</pre>

The header section has been placed in the appropriate `&lt;header&gt;` tags, and similarly with the footer. I'd hoped to include the 'About Me' section within this, but as part of the specification you cannot include headings within a `&lt;footer&gt;` element.

Each of the posts comes wrapped in an `&lt;article&gt;` tag, i.e. an independent element with content that could standalone. Within are the respective `&lt;header&gt;` (containing title and date) and `&lt;footer&gt;` (containing meta links)  elements. Technically the meta links could be marked as `&lt;nav&gt;`, but the former is more fitting and still acceptable use.

The date makes use of HTML5's `&lt;time&gt;` element, with a `datetime` attribute that gives the precise posting time, including timezone offset.

The previous and next links that follow the article can comfortably sit within a `&lt;nav&gt;` tag. Similarly, my sidebar region is predominantly navigation based with lists of archives and categories, it's been marked as such.

<pre class='prettyprint'>
&lt;article id=&quot;post-67&quot; class=&quot;&quot;&gt;
	&lt;header&gt;
		&lt;h2 class=&quot;entry-title&quot;&gt;&lt;a href=&quot;&quot; title=&quot;&quot; rel=&quot;bookmark&quot;&gt;POST TITLE&lt;/a&gt;&lt;/h2&gt;
		&lt;div class=&quot;entry-date&quot;&gt;
			&lt;time datetime=&quot;2009-04-30T15:54:28-07:00&quot; class=&quot;published&quot; title=&quot;2009-04-30T15:54:28-07:00&quot;&gt;April 30, 2009 &amp;#8211; 3:54 pm&lt;/time&gt;
		&lt;/div&gt;
	&lt;/header&gt;
	&lt;div class=&quot;entry-content&quot;&gt;
		POST
	&lt;/div&gt;
	&lt;footer class=&quot;entry-meta&quot;&gt;
		META LINKS
	&lt;/footer&gt;
&lt;/article&gt;

&lt;nav id=&quot;nav-below&quot; class=&quot;navigation clearfix&quot;&gt;
	&lt;div class=&quot;nav-previous&quot;&gt;&lt;/div&gt;
	&lt;div class=&quot;nav-next&quot;&gt;&lt;/div&gt;
&lt;/nav&gt;
</pre>

One avenue I should explore is the inclusion of the `&lt;section&gt;` tag, which I'd like to break up individual posts, probably by splitting the content at level three headings downwards; thereby becoming the header of each new section.

It'll be a while before the real benefits of HTML5 can be fully appreciated by everyone, but it feels good to make a start, however small that step may be.
