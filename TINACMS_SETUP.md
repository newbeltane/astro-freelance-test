# TinaCMS Setup Guide

This guide will walk you through setting up TinaCMS for visual content editing on Cloudflare Pages.

## 📋 Prerequisites

1. **TinaCMS Account** - Sign up at [tina.io](https://tina.io)
2. **GitHub Repository** - Your Astro site must be hosted on GitHub
3. **Environment Variables** - Set up in your GitHub repo settings

## 🚀 Step 1: Create TinaCMS Project

1. Go to [tina.io](https://tina.io)
2. Click "Get Started"
3. Choose "Astro" as your framework
4. Connect your GitHub repository
5. Select the branch you want to manage (usually `main`)
6. Confirm your schema (blog, pages, services collections)
7. Complete the setup

You'll receive:
- **Client ID** (for the frontend)
- **Token** (for the admin panel)

## 🔧 Step 2: Set Environment Variables

Add these to your **GitHub repository settings** → **Secrets and variables** → **Actions**:

```
NEXT_PUBLIC_TINA_CLIENT_ID=your-tina-client-id-here
TINA_TOKEN=your-tina-token-here
```

**Important:**
- `NEXT_PUBLIC_TINY_CLIENT_ID` is used on the **frontend** (your live site)
- `TINA_TOKEN` is used by **TinaCMS** during builds

## 📝 Step 3: Update Astro Config

Your `astro.config.mjs` should include:

```javascript
import { addAstroTinaIntegration } from '@tinacms/astro';

export default defineConfig({
  integrations: [
    react(),
    addAstroTinaIntegration({
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      token: process.env.TINA_TOKEN,
    }),
  ],
  // ... other config
});
```

## 🏗️ Step 4: Configure Tina Schema

Edit `tina/config.ts` to define your content collections:

```typescript
export default defineConfig({
  branch: "main", // or your default branch
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
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
            type: "list",
            name: "tags",
            label: "Tags",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
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
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "index") return "/";
            return `/${document._sys.filename}`;
          },
        },
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
      },
    ],
  },
});
```

## 🎨 Step 5: Start TinaCMS Admin

Run the TinaCMS development server:

```bash
npm run tinacms
```

This will start the admin panel at `http://localhost:3000`

## ✏️ Step 6: Edit Content

1. Open `http://localhost:3000` in your browser
2. Browse and edit your content:
   - **Blog Posts** - Edit in `src/content/blog/`
   - **Pages** - Edit in `src/content/pages/`
   - **Services** - Edit in `src/data/services.ts`
3. Click "Save" to commit changes

## 🚢 Step 7: Commit & Deploy

After editing content:

1. Commit changes to your GitHub repo
2. Push to your default branch (usually `main`)
3. Cloudflare Pages will automatically build and deploy

## 📖 Step 8: View Admin on Production

After deployment, your TinaCMS admin panel will be available at:

```
https://your-site.com/admin
```

You can access it to edit content visually without needing to run the dev server.

## 🔄 Development Workflow

### Adding a Blog Post

1. Create new file: `src/content/blog/new-post.md`
2. Add frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   description: "Short description for SEO"
   pubDate: 2026-12-01T00:00:00.000Z
   author: Your Name
   tags: ["tag1", "tag2"]
   body: |
     Your content here...
   ---
   ```
3. Commit and push
4. Cloudflare Pages will build and deploy

### Editing a Page

1. Edit the `.md` file in `src/content/pages/`
2. Commit and push
3. Cloudflare Pages will rebuild

### Updating Services

1. Edit `src/data/services.ts`
2. Commit and push
3. Cloudflare Pages will rebuild

## ⚠️ Important Notes

### Environment Variables

**Never commit** `tina-lock.json` or `admin/` folder to GitHub. They're in `.gitignore`.

### Draft Posts

To preview posts before publishing, add:

```markdown
---
draft: true
---
```

### Rich Text Editing

The `body` field in blog posts and pages uses **Tina's rich text editor**. You can:

- Type directly in the editor
- Use the toolbar to format text
- Insert images, links, and more

### Images

Upload images through the TinaCMS admin panel. They'll be stored in the `public/` folder.

## 🐛 Troubleshooting

### "Client ID not found"

- Check that `NEXT_PUBLIC_TINA_CLIENT_ID` is set in GitHub Secrets
- Restart your dev server
- Rebuild your site

### "Token not found"

- Check that `TINA_TOKEN` is set in GitHub Secrets
- Make sure you're using the correct token from your TinaCMS dashboard

### Content not syncing

- Check that your content files match the schema
- Verify the `path` in your collection config matches the actual file location
- Check for typos in field names

### Build fails

- Check GitHub Actions logs for specific errors
- Make sure all required dependencies are installed
- Verify environment variables are set

## 📚 Next Steps

- [TinaCMS Documentation](https://tinacms.org/docs)
- [Astro Content Collections](https://astro.build/content)
- [Cloudflare Pages Documentation](https://pages.cloudflare.com)

---

**Need help?** Check the TinaCMS docs or reach out to support@tinacms.org
