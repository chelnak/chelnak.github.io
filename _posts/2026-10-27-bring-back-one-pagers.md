---
title: Bring back one-pagers
date: 2026-10-27
author: Craig
layout: post
permalink: /2026/10/bring-back-one-pagers.html
categories:
  - Development
tags:
  - AI
  - Documentation
---

Driving home from the train station this morning, I managed to spill some coffee down myself. In my short burst of frustration, I started to think about [this post]({% post_url 2026-10-16-writing-code-has-changed %}), which then turned into thoughts about documentation.

<!--more-->

In the "old days", it was common to write a one-pager: about 500 words, maybe a nice diagram, to put your point across and start a discussion between humans. Some were good, some were noise, but the point is they were easily digestible by the average engineering brain.

## The docs are getting longer

A common practice now is to have an agent produce some documentation based on either:

- Some code it has written.
- A conversation you've had with it.

Without careful consideration, these docs can get huge. Given how many we produce, I wonder whether humans can fully read and understand them in the expected timeframe.

I think we're all guilty of handing over a doc and saying something like:

- "Here's what I found while debugging X."
- "Here's what I think we should do for Y."

"I" is overloaded here because, really, it's more of a "we"...

Steve Huynh makes a related point in [On the Death of Amazon's Writing Culture](https://alifeengineered.substack.com/p/on-the-death-of-amazons-writing-culture): producing a document no longer means the person sharing it has done the thinking. That feels like part of the same problem. What are we asking another human to spend time reading, and have we thought it through ourselves?

## Who's going to read it?

Maybe we should be clear about who or what the document is for. For example, we could add some form of classification to its front matter:

- Is it for agent-to-agent context transfer?
- Is it for human-to-human communication to aid discussion?

That could be as simple as a short callout at the start of a document:

> **Audience:** Agents

Or:

> **Audience:** Humans

Either way, if I'm sharing it, I should be able to stand behind what's in it.

Maybe that's what I miss about one-pagers. A small enough space that you have to decide what matters, and a clear expectation that another human will read it and have something to say.
