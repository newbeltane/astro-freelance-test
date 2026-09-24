# 🚀 Self-Hosted TinaCMS Setup Guide

## 📋 Overview

This guide shows you how to set up **self-hosted TinaCMS** for your Astro freelance theme on Cloudflare Pages.

---

## 🎯 What is Self-Hosted TinaCMS?

- **Cloud version**: TinaCMS runs on Tina's servers (requires account and subscription)
- **Self-hosted version**: You build and host the TinaCMS admin panel yourself (free, open-source)

**For your setup:**
- Main site: Deployed to Cloudflare Pages
- TinaCMS admin: Also deployed to Cloudflare Pages (separate project or subdirectory)

---

## 📋 Step 1: Create TinaCMS Account

1. Go to **https://tina.io**
2. Click **"Sign Up"** or **"Log In"**
3. Create a free account

---

## 📋 Step 2: Get Your Token

1. Log in to your TinaCMS dashboard
2. Click **"New Project"**
3. Select **"Astro"** as your framework
4. Connect your GitHub repository
5. Select your branch (usually `main`)
6. Review your schema (blog, page, services)
7. Click **"Create Project"**
8. **Copy your Token** (looks like: `tina_abcdef123456789...`)

**Note:** For self-hosted, you only need the **Token** (no Client ID required).

---

## 📋 Step 3: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **"Settings"**
3. Click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**
5. Add these secrets:

| Name | Value |
|------|-------|
| `TINA_TOKEN` | (your token from TinaCMS dashboard) |

**Important:**
- Only add `TINA_TOKEN` (no `NEXT_PUBLIC_TINA_CLIENT_ID` needed for self-hosted)
- Keep your token secret!

---

## 📋 Step 4: Update Your Package.json

Your `package.json` should have these scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "tinacms": "tinacms build"
  }
}
```

**Note:** The `tinacms` script builds the admin panel.

---

## 📋 Step 5: Update Your Astro Config

Your `astro.config.mjs` should be:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { addAstroTinaIntegration } from '@tinacms/astro';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [
    react(),
    addAstroTinaIntegration({
      // For self-hosted TinaCMS, clientId is optional
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Optional for self-hosted
      token: process.env.TINA_TOKEN, // Required
    }),
  ],
  adapter: cloudflare({
    prerenderEnvironment: 'node'
  })
});
```

---

## 📋 Step 6: Update Your Tina Config

Your `tina/config.ts` should include:

```typescript
import { defineConfig } from '@tinacms/schema/config';

export default defineConfig({
  branch: "main",
  token: process.env.TINA_TOKEN, // Required for self-hosted
  // clientId: "your-client-id", // Optional for self-hosted

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
      {
        name: "services",
        label: "Services",
        path: "src/data/services",
        format: "ts",
        fields: [
          {
            type: "string",
            name: "id",
            label: "ID",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "short",
            label: "Short Description",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (SVG path)",
          },
          {
            type: "list",
            name: "points",
            label: "Key Points",
          },
        ],
      }
    ],
  },
});
```

---

## 📋 Step 7: Update Your Content Files

Your content files should use the **self-hosted admin URL**:

### For Pages:

```markdown
---
title: "About Me"
description: "..."
body: |
  <!-- This will be replaced by TinaCMS with the visual editor -->
  Hi, I'm Steven Dale. I build blazing-fast websites that help businesses grow.
---
```

### For Blog Posts:

```markdown
---
title: "Perfect Pagespeed Score"
description: "..."
pubDate: "2024-01-15T10:00:00.000Z"
author: "Steven Dale"
tags:
  - "performance"
body: |
  <!-- This will be replaced by TinaCMS with the visual editor -->
  Achieving a perfect Pagespeed score is crucial for...
---
```

---

## 📋 Step 8: Create Cloudflare Pages Projects

You need **two separate Cloudflare Pages projects**:

### Project 1: Main Site

1. Go to **https://pages.cloudflare.com**
2. Click **"Create a project"**
3. Select **"Git Provider"** (GitHub)
4. Select your repository
5. Configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `.`
6. Click **"Deploy site"**

### Project 2: TinaCMS Admin

1. Go to **https://pages.cloudflare.com**
2. Click **"Create a project"**
3. Select **"Git Provider"** (GitHub)
4. Select your repository
5. Configure:
   - **Build command:** `npm run tinacms`
   - **Build output directory:** `admin`
   - **Root directory:** `.`
6. Click **"Deploy site"**

**Important:** Both projects should use the **same GitHub repository**.

---

## 📋 Step 9: Add Cloudflare API Token

For the GitHub Action to deploy to Cloudflare Pages, you need an API token:

1. Go to **https://dash.cloudflare.com/profile/api-tokens**
2. Click **"Create token"**
3. Give it a name (e.g., "Cloudflare Pages Deploy")
4. Select **"Edit"** under **Configuration**
5. Select **Your Pages project** from the dropdown
6. Click **"Create token"**
7. **Copy the token** (you won't see it again!)
8. Add it to GitHub Secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add secret: `CLOUDFLARE_API_TOKEN` = (your token)

---

## 📋 Step 10: Test Locally

```bash
cd astro-freelance-theme
npm install
npm run tinacms
```

Open http://localhost:3000 in your browser to test the admin panel.

---

## 📋 Step 11: Commit and Push

After testing locally:

```bash
git add .
git commit -m "Setup self-hosted TinaCMS"
git push origin main
```

---

## 📋 Step 12: Access the Admin Panel

After deployment, your self-hosted TinaCMS admin will be available at:

```
https://your-site.com/admin
```

---

## 📋 Step 13: Edit Content

1. Open `https://your-site.com/admin`
2. Log in with your TinaCMS account
3. Edit your content (pages, blog posts, services)
4. Click **"Save"** to commit changes
5. Changes will be reflected on your site automatically

---

## 📋 Step 14: Build and Deploy Main Site

After editing content:

```bash
npm run build
```

Upload the `dist/` folder to Cloudflare Pages (or let Cloudflare auto-deploy).

---

## 📋 Step 15: Set Up Auto-Deployment (Optional)

Create a GitHub Action to automatically deploy the TinaCMS admin when you push changes:

```yaml
# .github/workflows/tinacms.yml
name: Deploy TinaCMS Admin

on:
  push:
    branches: [main]

jobs:
  deploy-tinacms-admin:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build TinaCMS Admin
        run: npm run tinacms
        env:
          TINA_TOKEN: ${{ secrets.TINA_TOKEN }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          directory: admin
          env: |
            TINA_TOKEN=${{ secrets.TINA_TOKEN }}
```

---

## 📋 Step 16: Environment Variables Summary

Add these to **GitHub Secrets**:

| Name | Value | Used By |
|------|-------|---------|
| `TINA_TOKEN` | (your token) | Build process, admin panel |
| `CLOUDFLARE_API_TOKEN` | (your Cloudflare token) | GitHub Action deployment |

**Optional:**
| Name | Value | Used By |
|------|-------|---------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | (optional, for self-hosted) | Main site (optional) |

---

## 📋 Step 17: Update Cloudflare Pages Environment Variables

For each Cloudflare Pages project, add environment variables:

### Main Site Project:
- `TINA_TOKEN` = your token

### TinaCMS Admin Project:
- `TINA_TOKEN` = your token

---

## 📋 Step 18: Build and Deploy

```bash
# For main site
npm run build

# For admin
npm run tinacms
```

---

## 📋 Step 19: Access Your Admin

After deployment, access your TinaCMS admin at:

```
https://your-site.com/admin
```

---

## 📋 Step 20: Edit and Publish Content

1. Open `https://your-site.com/admin`
2. Log in with your TinaCMS account
3. Edit your content
4. Click **"Save"** to commit
5. Changes will be reflected on your site

---

## 📋 Troubleshooting

### "Token not found"
**Solution:** Check that `TINA_TOKEN` is set in GitHub Secrets

### "Build failed"
**Solution:** Check that all dependencies are installed (`npm ci`)

### "Admin not loading"
**Solution:** Check that the admin project is deployed correctly

### "Content not syncing"
**Solution:** Check that content files match the schema

---

## 📋 Summary

| Component | Configuration |
|-----------|---------------|
| **Main Site** | Cloudflare Pages, build: `npm run build`, output: `dist` |
| **TinaCMS Admin** | Cloudflare Pages, build: `npm run tinacms`, output: `admin` |
| **Environment Variables** | `TINA_TOKEN` (required), `CLOUDFLARE_API_TOKEN` (for auto-deploy) |
| **Admin URL** | `https://your-site.com/admin` |
| **Auto-Deploy** | GitHub Action deploys admin on push to main |

---

## 🎉 You're Ready!

Once all steps are complete, you'll have:
- ✅ Self-hosted TinaCMS admin panel
- ✅ Visual content editing
- ✅ Automatic deployment to Cloudflare Pages
- ✅ No need for TinaCMS cloud subscription

**Happy editing! 🚀**
