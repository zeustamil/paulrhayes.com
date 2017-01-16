title: 'Prototyping GOV.UK tools with Git and Github'
tags:
  - gds
categories:
  - projects
date: 2014-07-25 22:20:49
---

I’ve taken to using Github in a particular way when it comes to creating designs and prototypes for websites. It keeps people informed, documents the design process and starts discussions that would otherwise not happen. First, some context.

## Government Digital Service

I’ve been contracting with the UK’s Government Digital Service (GDS) since September 2013, in that time all of the code I’ve written has been publicly visible on Github. GDS teams watch repositories that interest or affect them, and they’re notified by email when there are pull requests, comments, issues etc (there’s a [lot of repositories](https://github.com/alphagov)).

## Defining ‘prototype’

Prototype is an overloaded term, it could mean sketches on paper, an investigation into a technical solution, a way of translating and trying out designs. In this post I’m referring to designing and iterating directly within code, without any secondary design process (eg no high fidelity design developed in an image editor), save perhaps some early sketches.

Prototype code is throwaway, they are built quickly to give a realistic impression of the final product. No code from any prototype should make it onto a live website, at least not without considerable review and revision.

## Building a design

My prototypes begin life as a branch, forked from master — all prototype branches are prefixed with `prototype-` to avoid confusion. This is a label: _don’t critique this code_. The branch will never be merged. From here I have a fully functional and recently released version of the application which I can begin modifying. That’s a good start.

As I begin to make design changes (using CSS, HTML, back-end code when necessary), at appropriate points I commit my work — as you would when developing a feature. The commit message describes the design changes up to that point, and these commits are regularly pushed to Github.

Importantly, I follow up a commit with a comment and screenshots which [show the thing](https://gds.blog.gov.uk/2014/06/03/principles-for-prototyping/). Github has made adding screenshots really easy, just drag-and-drop them to the comment field. The comment will often include details of what the change is meant to address, what might be wrong with this approach, questions, perhaps some prompts for discussion. For example, [a commit detailing changes to filters](https://github.com/alphagov/transition/commit/58fdbf5a87196cf0230b7206e765e116540791a2), and [another with some debate surrounding an import process](https://github.com/alphagov/transition/commit/5c186832ffafa9ac600b2b6140816cec967bc21d).

These comments and their images are then emailed to everyone watching the repository. The emails indicate that things will be changing, and they illustrate the design progress so far. They trigger important and welcomed discussions that influence the direction of a design at a stage when it’s most constructive, long before building has begun.

## Life after prototype

At the end, the stages of the design prototype have been documented. Commit logs (which make it easy to step through design iterations), reasons for design changes, screenshots and discussions — they’re all easily accessible and linkable. So they’re linked to from user stories, pull requests and commits, and none of that vital design context gets lost in translation.

## Clean repositories

There is a minor problem with this approach. Many developers, myself included, like to cleanup old branches. When should you delete a prototype branch? What happens to links to those Github pages? That’s a problem I haven’t dealt with yet.
