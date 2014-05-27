title: 'Thoughts on Responsive Enhancement'
tags:
  - css3
  - media-queries
  - responsive-enhancement
id: 116
categories:
  - Code
  - Design
  - Discussion
date: 2010-10-29 16:36:49
---

At [AsyncJS](http://asyncjs.com/responsive-enhancement/) in Brighton last night, [Jeremy Keith](http://adactio.com/journal/1700/) gave an overview of “Responsive enhancement” — adapting a layout in response to browser or device capabilities. After considering why fixed width designs are so prevalent, via a brief history lesson, we delved into the tools and methods by which a truly responsive design can be implemented, focussing primarily on size constraints but also touching on troubles surrounding speed.

This article is a brain dump from last night’s event.

CSS3 media queries let us adapt CSS rules to different viewport properties; width, height, pixel ratio, even colour and monochrome screens ([full list](http://www.w3.org/TR/css3-mediaqueries/#contents)). Aside: the Amazon Kindle (which uses webkit) reports itself as colour, with 8 levels, rather than monochrome.

The common process is to design for the desktop and use media queries to adapt downwards. On thinner devices content is linearised, navigation moves to the top or bottom, less important elements are sometimes hidden; everything is simplified down to the page’s core use case.

A number of tutorials have offered up the exact pixel-based media queries needed to target specific devices, a sort of restricted browser sniffing. This isn’t truly progressive, you can never cover all devices, and devices change, revisiting code for device iterations isn’t going to be fun.

Media queries don’t need to be pixel based either, changing a page layout based on ems will adapt content for larger text sizes. If the user’s text size is huge, our viewport is the same but we’ve got less space to play with, a linear mobile-like design might be more desirable.

This act of adapting downwards works for devices like the iPhone and iPad, but what about those that don’t support media queries? They’re going to get the full desktop version and it’s not going to be pretty.

Luke Wroblewski has suggested designing for [mobile first](http://www.lukew.com/ff/entry.asp?933) (an excellent read). In terms of responsive enhancement that means creating your linear site as the baseline and building outwards around content, bringing in features as capabilities improve and constraints are relaxed. As the viewport widens, media queries can introduce columns, rather than remove them. It’s the same process but in the opposite direction.

All mobile devices and older browsers would get the simplified, linear design. This works on the assumption that desktop browsers support media queries, IE 8 and below do not, ergo they’ll be seeing the linear site design. This may be acceptable, but in the majority of cases IE will need some sort of hack to get the full featured version.

Using conditional IE comments an IE layout can be hacked in. The IE specific styles are likely to repeat existing code, undesirable, but unavoidable? This is still a one size fits all approach as IE will not adapt to screen or text size. For this we need a JS poly-fill, one that enables media queries in older browsers. There’s a library on Google Code that does just this, [CSS3 Media Queries JS](http://code.google.com/p/css3-mediaqueries-js/).

Building a page that can be linearised means putting the most important information first in the source code. This assumes that the context of “what is important” is similar on different devices. If the context is different, that makes a case for serving different content, usually via a standalone mobile site (which should always come with a link to the full version).

And on the topic of serving different content, there is also the speed problem. Hiding and showing parts of a page using CSS is great, but it doesn’t stop the slower mobile networks from downloading the unnecessary parts, including those huge background images. PPK has written an excellent article on [combining media queries and javascript](http://www.quirksmode.org/blog/archives/2010/08/combining_media.html) to avoid some of these caveats.

To round this brain dump off, I’ll recommend some other articles on the subject, which go into some of the technical aspects in a little more depth.

Ethan Marcotte’s "[Responsive Web Design](http://www.alistapart.com/articles/responsive-web-design/)"
Jeremy Keith’s "[Responsive Enhancement](http://adactio.com/journal/1700/)"
Yiibu’s "[Rethinking the mobile web](http://yiibu.com/articles/rethinking-the-mobile-web/)"
PPK’s "[State of Mobile Web Development](http://www.quirksmode.org/blog/archives/2010/09/state_of_mobile.html)"
