title: 'Consistency across GOV.UK admin tools'
tags:
  - gds
categories:
  - projects
date: 2014-09-01
---

During transition to GOV.UK, Government Digital Service built a suite of admin tools for publishing content. Tools for creating and managing content in all its different guises. These were built quickly and in isolation, to meet transition deadlines.

Tools all used Bootstrap, which provided patterns and styles for forms, dropdowns, menus, navigation and buttons. Admin user interfaces could be built quickly. But there are many different ways to use Bootstrap. Each tool was doing the same thing, but slightly differently.

## Documenting patterns

When I began working on another admin tool, [transition](/2014-07/transition-websites-to-govuk/), I created [the first admin style guide](https://github.com/alphagov/transition/pull/33), and began to document the patterns used in building the app:

> Document existing transition styles, how transition uses bootstrap, where it diverges and where there are custom styles. Includes grid, body copy, [visited links](https://github.com/alphagov/transition/pull/28/commits/c2345fab064ae5a40f358c07a8addf728a2fb3fc), buttons, pagination and breadcrumbs patterns

It didn’t recreate [Bootstrap’s own reference](http://getbootstrap.com/2.3.2/components.html), instead it gave rules on how to use Bootstrap. This led to consistency within the application. For example, all tables would be `table table-bordered` with a custom `table-header` class applied to the column headings.

{% figure admin-template-style-guide.png landscape %}
Guidance on using Bootstrap tables in admin tools
{% endfigure %}

It also provided ways to document enhancements to Bootstrap, such as form helper classes for restricting input fields to standard widths.

{% figure admin-template-style-guide-inputs.png landscape %}
Guidance on setting input widths
{% endfigure %}

## Sharing across tools

When I switched from the transition team to the publishing tools team, I reached for the same toolkit on different apps. Patterns created for transition that were tested and validated with user research would be useful.

I was working across:
* [publisher](https://github.com/alphagov/publisher)
* [whitehall](https://github.com/alphagov/whitehall)
* [panopticon](https://github.com/alphagov/panopticon)
* [imminence](https://github.com/alphagov/imminence)
* [sign on](https://github.com/alphagov/signonotron2)
* [maslow](https://github.com/alphagov/maslow)
* [travel advice publisher](https://github.com/alphagov/travel-advice-publisher)

Each application is an admin tool with its own purpose. Each looked roughly the same, each used Bootstrap, but none were sharing styles, patterns or behaviour. It wasn’t easy to add a filter to a table in both publisher and panopticon. Tables in imminence looked different to those in maslow.

All apps were built in Rails. A ruby gem would allow code to be shared across apps.

## govuk_admin_template

Cue the [govuk_admin_template](https://github.com/alphagov/govuk_admin_template/) gem. It began as a port of the patterns, styles, javascript and documentation from Transition.

The gem provides (via a Rails engine):
* jQuery and Bootstrap 3 with HTML5 and respond.js shims needed for IE8 and below
* An admin layout with header and footer
* A [module instantiation pattern](https://github.com/alphagov/govuk_admin_template/blob/master/JAVASCRIPT.md) for javascript ([loosely based on this blog post](/2013-09/a-light-progressive-framework/))
* A set of [useful javascript modules](https://github.com/alphagov/govuk_admin_template/blob/master/JAVASCRIPT.md#included-modules)
* Admin design patterns available from `/style-guide`
* [CSS helpers and Sass variables](https://github.com/alphagov/govuk_admin_template/blob/master/CSS.md) for the admin theme
* GOV.UK [user friendly date formats](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#Dates)
* Google Analytics tracking

Each application was upgraded to Bootstrap 3 and [switched to using the gem](https://github.com/alphagov/publisher/pull/210) ([that wasn’t always trivial](https://github.com/alphagov/whitehall/pull/2241)).

Now they all use the same base layout, have the same Sass toolkit, follow the same Bootstrap rules and have access to the same set of features, like [table filters](https://github.com/alphagov/govuk_admin_template/blob/master/JAVASCRIPT.md#included-modules) and simple toggles.

It is now easier for all applications to look and behave consistently.
