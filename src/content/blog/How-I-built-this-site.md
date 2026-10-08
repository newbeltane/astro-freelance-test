---
title: How I built this site
description: 'A brief description of how I built this site and some of the hurdles I had to overcome. Hopefully, this will be of help to others, who like me are vibe coding with Astro/VS Code/GitHub/Cloudflare and Tina CMS.'
author: Steven Dale
pubDate: 2026-10-08T00:00:00.000Z
---

For many years I built websites with WordPress and in the last few used DIVI from Elegant Themes. I even have a lifetime licence for DIVI. However, due a recent issue with my shared hosting plan and WordPress getting hacked, I decided it was time to move on. 

I explored the options, played around with various approaches but in the end I settled on building with Astro. Pretty soon it was clear that the best way was to use Astro, together with GitHub, Cloudflare and TinaCMS.

Now to be clear, it is a long time since I really did any coding, in fact its around 50 years since I played around with Algol and Basic! In the interim, I have learnt how to use various tools (remember Adobe PageMill anyone?) to build websites and later on run my own server with cPanel etc. I also used CMS like Joomla and Drupal before ending up using WordPress for many years.

So, what is one to do in this age of AI? Well, of course, I could learn how to code in something like PHP, Python, C++, React, Rust etc. Or, I could leverage AI to help me build my websites in Astro, using VS Code, GitHub for my repositories and Host on Cloudflare, with TinaCMS for editing pages and posts.

So that is what I did and this site is my latest effort. Here is how I did it.

**Step one:**

I used Abacus.ai to create my theme by prompting it with what i wanted it to create. I then downloaded the zip file with my project folder, extracted that to an external drive where I keep my projects and opened that in VS Code.

**Step two:**

I then used a mixture of Gemini (I have the Pro account), Copilot and local LLMs to help me build the site out how I wanted. With the site viewable locally with VS Code I was able to see how it would look when live.

**Step three:**

Once it was ready, I asked Gemini to help me push it to GitHub and Cloudflare, as well configure TinaCMS for editing. Now, it has to be said that things didn't go quite as smoothly as I had hoped. Gemini and Copilot got confused and kept asking me to use Cloudflare Pages instead of Cloudflare Workers. Eventually, we figured that one out and the site was now live. However, one hiccup remained - my blog posts were missing.

**Step four:**

After failing to resolve things with Gemini and Copilot, I turned back to Abacus.ai and we solved the issue. There was a missing file which I needed to create (specifically src/content.config.ts). It seems the latest versions of Astro transitioned to the Content Layer API, which strictly requires an explicit configuration at src/content.config.ts using modern loaders (like glob()). Without that file, the production build runner defaulted to treating the blog collection as empty—resulting in those warnings during the build step and blank blog routes.

So there you have it, my site is now up and running and with a free account at Web3Forms, I can receive emails sent from my contact form.

**Postscript**:

There is still much to learn and I am now starting a free course on building with Astro, so I can learn how to make my Astro sites even better. In the meantime, checkout the PageSpeed results for my new site below.

[https://pagespeed.web.dev/analysis/https-newbeltane-co-uk/74sz5nnzd4?form\_factor=mobile](https://pagespeed.web.dev/analysis/https-newbeltane-co-uk/74sz5nnzd4?form_factor=mobile)
