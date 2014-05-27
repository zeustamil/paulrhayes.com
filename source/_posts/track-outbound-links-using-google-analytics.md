title: 'Track outbound links using Google Analytics'
tags:
  - analytics
  - css3
  - javascript
  - prototype
id: 14
categories:
  - Code
date: 2009-03-18 16:06:20
---

"Track everything", lest vital visitor trends fall through the cracks - that's my newly endorsed web analytics doctrine. As a precursor to the quantitative 'what' and the qualitative 'why' we need that cold hard data before analysis can begin; Google Analytics is the popular harvester of choice and out of the box it grabs a lot. Visits, Pageviews, Screen resolution, et al - <abbr title="Google Analytics">GA</abbr> seemingly has all your conventional data needs covered. But one significant trend is lacking - how visitors leave your site, specifically through outbound links on a page, data that inevitably leads to a what and an avenue for investigating the why. For instance, "_Which partner sites are attracting the highest click throughs?_" or more generally "_Why do visitors leave my site?_".

GA gives the ability to [create your own events](http://code.google.com/apis/analytics/docs/eventTrackerGuide.html) with a category, action, label and numerical value using the syntax:
<pre class="thin">_trackEvent(category, action, optional_label, optional_value)```

Hence, on an outbound link click, by calling this JavaScript method you can trigger a tracked event in GA. An obtrusive onclick attribute on every outbound link is both cumbersome to implement and difficult to manage, it also goes against the best practices of progressive enhancement and unobtrusiveness.

The solution is to attach a click event listener to each of the outbound links on the page, and the question becomes how to do that. CSS3 comes with a couple of handy [new selectors](http://www.w3.org/TR/css3-selectors/) that we can use in combination with Prototype or jQuery to root out the correct links. The appropriate selectors:

> E[foo^="bar"] an E element whose "foo" attribute value begins exactly with the string "bar">
> E[foo*="bar"] an E element whose "foo" attribute value contains the substring "bar">
> E:not(s) an E element that does not match simple selector s

The magic outbound link selector then becomes one of the following, depending on your needs:

```css
/* Any link that does not contain yourdomain.com */
a:not(a[href*="yourdomain.com"])

/* Any link that does not start with yourdomain.com */
a:not(a[href^="yourdomain.com"])

/* Any link that does not start with yourdomain.com or www.yourdomain.com */
a:not(a[href^="yourdomain.com"]):not(a[href^="www.yourdomain.com"])

/* Any link that starts with http - e.g. any non relative links */
a[href^="http"]

/* Catch all - any link that starts with http but doesn't link to your domain */
a[href^="http"]:not(a[href*="yourdomain.com"])
```

With an array of all the outbound links at hand, adding a click listener is simple. But we do need to set up the category, action and label. I have opted to create an arbitrary "Outbound Link" category that uses the link's text (with HTML tags stripped out) as the action and the url as the label:

```js
Event.observe(outboundLink, 'click', function() {
  // category, action, label
  pageTracker._trackEvent(
    'Outbound Link',
    outboundLink.innerHTML.replace(/(<([^>]+)>)/ig,''), outboundLink.href
  );
}
```

## The complete code

Using Prototype version 1.6 the final code might look like this:

**Update**: As pointed out in the comments, hard coding a domain into your code isn't the best idea, `window.location.hostname` is a good alternative. This may not always work if you do not want to exclude subdomains.

```js
var domainName = "domainname.com";
// Select all outbound links
$$('a[href^="http"]:not(a[href*="'+domainName+'"])').each(function(outboundLink) {
  // Add listener to each of the links
  Event.observe(outboundLink, 'click', function() {
    // category, action, label
    pageTracker._trackEvent(
      'Outbound Link',
      outboundLink.innerHTML.replace(/(<([^>]+)>)/ig,""), outboundLink.href
    );
  }
});
```
