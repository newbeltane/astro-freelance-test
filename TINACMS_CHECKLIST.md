# ✅ TinaCMS Integration - Action Checklist

## 🚨 CRITICAL: Manual Actions Required

### 1. Delete Astro Content Config
⚠️ **DELETE THIS FILE** - It conflicts with TinaCMS!
```bash
rm src/content.config.ts
```

### 2. Set GitHub Environment Variables
Go to your GitHub repository:
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

| Name | Value | Description |
|------|-------|-------------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | (from TinaCMS dashboard) | Used on your live site |
| `TINA_TOKEN` | (from TinaCMS dashboard) | Used by build process |

**How to get these:**
1. Go to https://tina.io
2. Create account / Log in
3. Click "New Project"
4. Select "Astro"
5. Connect your GitHub repo
6. Select branch (usually `main`)
7. Review schema (blog, page, services)
8. Complete setup
9. Copy **Client ID** and **Token**

---

## 📝 Updated Files

### ✅ Already Updated (No Action Needed):

1. **`astro.config.mjs`** - Added TinaCMS integration
2. **`tina/config.ts`** - Updated with all collections (blog, page, services)
3. **`src/content/pages/index.md`** - Converted to Tina schema
4. **`src/content/pages/about.md`** - Converted to Tina schema
5. **`src/content/pages/pricing.md`** - Converted to Tina schema
6. **`src/content/pages/services.md`** - Converted to Tina schema
7. **`src/content/blog/perfect-pagespeed-score.md`** - Converted to Tina schema
8. **`src/content/blog/why-astro-for-small-business.md`** - Converted to Tina schema
9. **`src/content/blog/why-host-on-cloudflare.md`** - Converted to Tina schema
10. **`src/data/services.ts`** - Converted to Tina collection

### ❌ Files to Delete (Optional):

You can remove these unnecessary files:
- `src/content/blog/*.docx` - Not needed (use .md files)
- `src/content/blog/*.pdf` - Not needed (use .md files)
- `src/content/posts/` - Empty directory, can be removed
- `tina/tina-lock.json` - Generated file, in .gitignore
- `admin/` - Generated folder, in .gitignore

---

## 🎯 Next Steps After Setup

### Step 1: Test Locally
```bash
npm install
npm run tinacms
```
Open http://localhost:3000 in your browser

### Step 2: Edit Content
1. Browse content in TinaCMS admin
2. Edit blog posts, pages, services
3. Click "Save" to commit

### Step 3: Commit Changes
```bash
git add .
git commit -m "Updated content via TinaCMS"
git push
```

### Step 4: Deploy to Cloudflare Pages
1. In Cloudflare Pages, create project from your GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy

### Step 5: Access Admin Panel
After deployment, your TinaCMS admin will be at:
```
https://your-site.com/admin
```

---

## 📊 Content Collections Overview

| Collection | Label | Path | Format | Editable Fields |
|-----------|-------|------|--------|----------------|
| **blog** | Blog Posts | `src/content/blog/` | Markdown | title, description, pubDate, author, tags, body (rich-text) |
| **page** | Pages | `src/content/pages/` | Markdown | title, description, body (rich-text) |
| **services** | Services | `src/data/services` | TypeScript | id, title, short, description, icon, points |

---

## 🎨 Content Editing Tips

### Blog Posts
- Edit in: `src/content/blog/your-post.md`
- Required fields: `title`
- Optional fields: `description`, `pubDate`, `author`, `tags`
- Body field uses **rich-text editor**
- Add `draft: true` to hide from public site

### Pages
- Edit in: `src/content/pages/your-page.md`
- Required fields: `title`
- Optional fields: `description`
- Body field uses **rich-text editor**

### Services
- Edit in: `src/data/services.ts`
- Required fields: `id`, `title`
- Fields: `short`, `description`, `icon` (SVG path), `points` (array)

---

## 🐛 Common Issues & Solutions

### "Client ID not found"
**Solution:** Check that `NEXT_PUBLIC_TINA_CLIENT_ID` is set in GitHub Secrets

### "Token not found"
**Solution:** Check that `TINA_TOKEN` is set in GitHub Secrets

### Content not syncing
**Solution:**
1. Check content file paths match schema
2. Verify field names match schema exactly
3. Check for typos

### Build fails
**Solution:**
1. Check GitHub Actions logs for specific errors
2. Verify all dependencies are installed
3. Check environment variables

### Rich text not saving
**Solution:**
1. Make sure you're logged into TinaCMS
2. Click "Save" after editing
3. Check for errors in console

---

## 📖 Useful Commands

```bash
# Start dev server with TinaCMS
npm run dev

# Start TinaCMS admin (separate from dev server)
npm run tinacms

# Build for production
npm run build

# Preview production build
npm run preview

# Generate TypeScript types
npm run generate-types
```

---

## 🌐 URLs

| Purpose | URL |
|---------|-----|
| TinaCMS Dashboard | https://tina.io |
| TinaCMS Docs | https://tinacms.org/docs |
| Astro Content Docs | https://astro.build/content |
| Cloudflare Pages | https://pages.cloudflare.com |

---

## ✅ Final Checklist

Before deploying to production:

- [ ] Deleted `src/content.config.ts`
- [ ] Set `NEXT_PUBLIC_TINA_CLIENT_ID` in GitHub Secrets
- [ ] Set `TINA_TOKEN` in GitHub Secrets
- [ ] Tested locally with `npm run tinacms`
- [ ] Can access admin panel at http://localhost:3000
- [ ] Can edit content in TinaCMS
- [ ] Changes commit and push to GitHub
- [ ] Cloudflare Pages builds successfully
- [ ] Site deploys to Cloudflare Pages
- [ ] Can access admin panel at `https://your-site.com/admin`
- [ ] Content syncs correctly on production

---

## 🎉 You're Ready!

Once all steps are complete, you'll have:
- ✅ Visual content editing in TinaCMS
- ✅ Automatic deployment to Cloudflare Pages
- ✅ No need to touch code when updating content
- ✅ Professional admin panel for content management

**Happy editing! 🚀**
