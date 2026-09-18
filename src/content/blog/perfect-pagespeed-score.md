---
title: "How to Get a Perfect PageSpeed Score"
description: "A practical, no-nonsense checklist for hitting 100/100 on Google PageSpeed Insights — the same process I use on every client website."
pubDate: 2026-08-28
tags: ["Performance", "SEO", "PageSpeed"]
author: "WebCraft"
---

A perfect PageSpeed score isn't magic — it's the result of a series of
deliberate decisions. Here's the exact checklist I work through to get client
sites to a green 100 on both mobile and desktop.

## 1. Ship less JavaScript

The single biggest cause of poor scores is too much JavaScript. Build with a
framework like [Astro](/blog/why-astro-for-small-business/) that ships zero JS by
default, and only add interactivity where it earns its place.

## 2. Optimise your images

Images are usually the heaviest thing on a page. Always:

- Serve modern formats (WebP or AVIF).
- Size images to their display dimensions — don't send a 4000px photo to a 400px slot.
- Add explicit `width` and `height` to prevent layout shift.
- Lazy-load anything below the fold.

## 3. Self-host and preload fonts

Web fonts can block rendering. Use `font-display: swap`, preconnect to the font
host, and only load the weights you actually use.

## 4. Inline critical CSS

Astro can automatically inline small stylesheets so the browser doesn't need a
second round trip before it can paint your page.

## 5. Cache aggressively at the edge

Hosting on Cloudflare means your pages are served from a data centre near your
visitor, with long cache lifetimes on static assets. This is where a good host
turns a fast build into a fast *experience*.

## 6. Measure, don't guess

Run [PageSpeed Insights](https://pagespeed.web.dev) and
[WebPageTest](https://webpagetest.org) on real pages. Fix the biggest offenders
first, then re-measure.

> Do all six and 100/100 stops being a lucky accident and becomes the baseline
> every one of your pages ships with.
