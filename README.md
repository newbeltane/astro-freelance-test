# WebCraft — Astro Freelance Theme

A fast, secure, SEO-ready Astro theme for a freelance web studio. Built for
static deployment on **Cloudflare Pages** with zero client-side JavaScript by
default (a tiny vanilla-JS island powers the mobile menu only).

## ✨ Features

- ⚡ **Astro 5** static output — near-zero JS, perfect Core Web Vitals
- 🎨 Dark, tech-forward design system (CSS custom properties, fluid type)
- 📱 Fully responsive, mobile-first, accessible (skip link, ARIA, semantic HTML)
- 📝 Blog powered by **content collections** (Markdown) + RSS feed
- 🔍 SEO baked in: per-page meta/OG tags, canonical URLs, sitemap, robots.txt
- 🛡️ Cloudflare security headers via `public/_headers` (CSP, HSTS, etc.)
- 🧩 Reusable components: Hero, Service/Pricing/Testimonial/Blog cards, StatBar

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, services, USPs, testimonials, latest posts, CTA |
| `/services/` | Detailed service breakdown |
| `/about/` | Personal intro, tech stack, values |
| `/pricing/` | 3-tier pricing + FAQ |
| `/blog/` | Blog listing |
| `/blog/[slug]/` | Individual post (reading time, prev/next) |
| `/rss.xml` | RSS feed |

## 🚀 Getting started

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

## ⚙️ Configuration

- **Site URL:** set `site` in `astro.config.mjs` (and the sitemap in `public/robots.txt`) to your real domain.
- **Branding & nav:** edit `src/consts.ts` (name, tagline, email, nav links, socials).
- **Services:** edit `src/data/services.ts`.
- **Colours & type:** edit the CSS custom properties in `src/styles/global.css`.

## ☁️ Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In Cloudflare Pages, create a project from the repo.
3. Build command: `npm run build` — Output directory: `dist`.
4. Deploy. The `_headers` file is applied automatically.

## 📝 Adding a blog post

Create a new Markdown file in `src/content/blog/` with frontmatter:

```md
---
title: "Your post title"
description: "A short summary for SEO and cards."
pubDate: 2026-09-18
tags: ["Astro", "SEO"]
---

Your content…
```
