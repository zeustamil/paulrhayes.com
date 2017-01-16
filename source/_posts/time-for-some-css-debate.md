title: 'Time for some CSS debate'
tags:
  - css3
  - debate
  - standards
categories:
  - experiments
date: 2009-03-27 17:25:51
---

That’s the best pun I could think of, pretty lame to be honest. My first foray into shared experimental CSS (proprietary WebKit properties used to create a [clock animation](/2009-03/an-analogue-clock-using-only-css/)) has fired up an interesting debate; where should the realm of cascaded style sheets end?

This clock experiment does not advocate such use of style sheets, it is instead used to demonstrate the capabilities and possibilities of WebKit’s transform and transition properties. It has inadvertently highlighted the controversial and unexpected nature by which web developers may use them. Should this cross-pollination of _behaviour definition_ become standard? Is it risky? What might the side effects be?

Comments on the [Ajaxian post](http://ajaxian.com/archives/creating-a-clock-in-css#comments) began the discussion, _Malic_ opened the debate (this comment is particularly in reference to `transition` rather than the more widely accepted `transform`):

> While this [is] interesting and maybe a little bit cool, I think it is inappropriate for Webkit to take CSS (even if only for itself) in this direction. CSS was created to define style. This seems more like a behavior to me and that belongs to the Javascript problem space. Going down the the road that Webkit is going, the question is — where do you stop? Just how much do you extend CSS to be? I think you run the risk of creating solutions for problems that have already been solved.

This yielded some opposition but the majority supported the notion, [Travis Almand](http://www.travisalmand.net/) champions the new transform property but strongly questions its counter-part:

> CSS should be a style guide, not a programming language.

Before highlighting that the road to behaviour in CSS has already begun with the much used :hover, accompanied by :active, and :focus — [user action pseudo-classes](https://www.w3.org/TR/css3-selectors/#useraction-pseudos), <cite>agents sometimes change the rendering in response to user actions</cite>; response being the keyword.

[Will Peavy](http://willpeavy.net/) comments that these behaviours reek of IE’s abandoned CSS expressions, and [edthered](http://doggydoo.net/) asks:

> What happens when your CSS library and your javascript library start trying to do the same thing to the same element, or different things to the same element?

[John Dowdell](http://blogs.adobe.com/jd/2009/03/pervin_the_standards.html) of Adobe has also weighed in with an _honest rant_ that I heartily recommend reading, even if I’m slightly jealous that I cannot articulate my prose as well.

> The clock example shows that people will use technologies in unexpected ways. The creators of Usenet did not intend mass advertising. [...] Stuffing the genie back inside the bottle is harder than looking carefully at the bottle before opening it.>
> [...]>
> We may not be able to persuasively articulate why this will eventually be considered a bad architectural decision. It’s like when vendors of email clients started talking about how wonderful it would be to add hidden graphics and scripting to the emails strangers send to you. Vague warnings of an unsound future are at a disadvantage to self-interested "But I wanna do it!!" evangelists.>
> It’s hard to persuasively document future risks. But encumbering HTML and CSS like this is not the way to bless your own multimedia engine.
