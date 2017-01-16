title: 'The Last.fm Webteam'
tags:
  - agile
  - lastfm
  - process
  - team
categories:
  - projects
date: 2013-06-16 17:49:40
---

I work at Last.fm as part of the Webteam. We’re a small team — five developers, a designer, a QA and a scrum master. We’re responsible for the website, the mobile site, the music manager, the API, the translation tools and the Spotify app — each bundled up with its fair share of legacy code. Day to day there’s new product work, technical debt, occasional fire fighting, support requests, legal requests, and requests from on-high.

There’s always a lot to do, and we deal with it, excellently. This is a little bit about how we do that, inspired by [Jeffrey Veen’s talk at Build 2012](https://vimeo.com/63525053). We’re not perfect, we know that, and we’re always looking to improve, but there’s a lot of things we do well, things worth sharing.

## The Basics

We’re Agile, we have two-weekly sprints, backlogs, a scrum board, user stories, retrospectives, estimation, planning and commitment meetings. We start with a daily stand-up and huddle for as short as necessary.

I’m not going to extol the virtues of Agile, I’m sure the internet has plenty to say already. And if many of the words I’ve used are unfamiliar, Agile is a good starting point.

All work is ticketed in JIRA (love it or hate it), prioritised in JIRA, assigned a sprint in JIRA; we couldn’t function without JIRA. But above all, work is accountable and linkable.

## Communication

_Who’s doing what, what’s coming up, what’s happening?_

All of Last.fm is on IRC — it is our town hall. There’s a main channel, team channels and assorted firehoses. We have a bot, it’s a cat, it connects us to the flow of information. IRC is so integral to Last.fm our co-founder RJ has gone on to create [IRCCloud](https://www.irccloud.com/).

Cool, so we’re all in a chat room together, so what? Well, everything, really — unobtrusive immediate real time communication with anyone, wherever I am. With a single keyword I can ask the entire company a question, with another I can ask any given team, and with a username I can target a question. Everyone treats these keywords (highlights) differently. I aim for a balance of responding as required and avoiding interruption. It’s a great unobtrusive way of saying, “got a second?”, or for getting quick answers without first knowing who to ask.

What’s happening? The cat tells us. Every commit, commit message, new JIRA ticket, ticket update and deploy is in the channel. Commits and branches are tagged with ticket numbers. A quick scan and I can immediately see who’s working on what, what state it’s in, and what changes are being made. There’s a lovely element of serendipity in catching a commit, knowing a bit about it, reviewing it and immediately sharing questions and concerns.

What about email? Email hides communication, audit trails are lost, and people are kept in the dark. We try to avoid straight-up email. If the work has a ticket, that’s where we communicate, for all to see. If there’s no ticket, we write one. Still, we receive emails, from external parties, CBS, other folk — often they’re addressed to a single team member. We discourage that, and to keep everyone in the loop emails are forwarded to the team. It is never one person’s problem, always CC the team.

Through Agile we communicate effectively — the daily stand-up let’s us talk in person about yesterday’s work, today’s work, and any concerns. Before every sprint we shout about our commitment and priorities. At the end we talk about what’s been done, what didn’t get done and anything that crept in. And every two weeks we present out work at a company wide demo; people even clap. We keep a consistent pace, celebrate our successes and openly discuss our failures.

## Defining Work

Before beginning anything we ask, “Why are we doing this?”, “What does success look like?”, and “How can we measure that?”. We define metrics and build dashboards for overhead monitors, and then we share them, we want everyone to see and know how this work we are doing is changing things.

When it comes to writing tickets, or user stories, we follow a pattern; always opening with “As a [user|X] I want [feature|Y] so that [result|Z]”. This focusses us on who the work is for, what the work is and why it’s needed. These stories usually require a user perspective, but developer and business perspectives help give a fuller picture. Acceptance criteria and considerations follow, along with relevant tickets, links, etc. Tickets in an unacceptable state typically get rejected at estimation, that’s a good motivation for all authors to get them right. Anyone can write a ticket.

## Writing Code

Write code for other people — make it readable, understandable and usable, that’s a common mantra — and one we share. But also, don’t be solitary when doing so. In the Last.fm Webteam we readily support each other; whether there’s some code I don’t understand, questions about something that looks unused, a class or function that is hitherto unnameable, or something that is batshit insane, I can unashamedly, unreservedly ask for help, and the code is better for it.

It isn’t ever one person’s project, we never work alone. Between work, we’ll regularly ask “who needs help?”, “what needs doing?”. We encourage knowledge sharing, and to that end, and for particularly difficult problems, we endorse spontaneous code-pairing. Two heads are better than one.

And at the end, when the code is written, when the work is done, it is reviewed. All code changes go through a code review process. Even the little changes, the one liners, the quick fixes; the commits you don’t think need a review, especially them. We point out the major problems, minor issues, style points, but importantly, we give praise where praise is due; when work is great, we heartily celebrate it. And when all is right, the review ends with an emphatic STAMP.

## Play

Let’s not forget the fun stuff too, Last.fm has always known how to play. Big releases usually lead to a round of beer, we have internal pool and foosball leagues, with an ELO rating system. There’s the occasional Halo game and a MAME cabinet with everything from Street Fighter to Mrs Pac-Man. There’s a Waffle Iron, we (read: Laura plus willing assistant/trainee) make waffles in the office, and [people bring in cake](http://foodpeoplebroughtintolastfm.tumblr.com/), lots and lots of cake.

## Respect.

This team, this group of people I work with everyday, I think they’re fantastic. We’re not perfect, far from it, but we are always striving to make things better. To make more wonderful things, more effectively, more maintainably and with beauty throughout.
