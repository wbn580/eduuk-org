# Deployment Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Test locally**:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output: `dist/`

4. **Deploy to Cloudflare Pages**:
   ```bash
   npx wrangler pages deploy dist
   ```

## GitHub + Cloudflare Pages (Recommended)

1. Push code to GitHub `main` branch
2. Cloudflare Pages watches the repo and auto-builds
3. Build output → https://eduuk.org/

### Cloudflare Pages Settings

- **Project name**: `eduuk-org`
- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: 18+ (set in `wrangler.toml` or Cloudflare dash)

### Environment Variables

Set in Cloudflare Pages dashboard → Settings → Environment variables:

```
PUBLIC_GOOGLE_SITE_VERIFICATION = (Google Search Console meta tag)
PUBLIC_BING_VERIFICATION = (Bing Webmaster meta tag)
PUBLIC_YANDEX_VERIFICATION = (Yandex Webmaster meta tag)
```

(Leave blank if not configured; site works without them.)

## Build Process

```bash
npm run build
```

Runs:
1. `astro check` — Type-check TypeScript
2. `astro build` — Compile Astro to static HTML/CSS/JS
3. `pagefind --site dist` — Index site for search
4. `cp -r dist/pagefind public/` — Copy search assets

Output files:
- `dist/index.html` — Home page
- `dist/posts/[slug]/` — Article pages
- `dist/[page].html` — Static pages (about, privacy, etc.)
- `dist/rss.xml` — RSS feed
- `dist/sitemap-index.xml` — Sitemap index
- `dist/llms.txt`, `dist/llms-full.txt` — LLM-friendly indexes

## Development Workflow

### Adding an Article

1. Create `src/data/blog/universities/my-new-article.md`:
   ```yaml
   ---
   title: "Question?"
   description: "One-line answer."
   pubDatetime: 2026-04-21
   tags: ["Universities", "Russell Group"]
   featured: false
   ---

   Content here...
   ```

2. Save and refresh `npm run dev` — Page auto-builds at `/posts/my-new-article/`

3. Commit and push to main → Cloudflare deploys

### Updating Configuration

Edit `src/config.ts`, `src/constants.ts`, or `src/utils/tagSlug.ts`, then rebuild:

```bash
npm run dev
```

Changes auto-reload.

### Style Changes

Edit `src/styles/global.css` or component `.astro` files, then rebuild. Tailwind classes auto-apply.

## Troubleshooting

### Build Fails

```bash
npm run build -- --verbose
```

Check console for errors. Common issues:
- Missing import in component
- Invalid frontmatter YAML
- TypeScript type errors

### Page Not Rendering

1. Ensure article is in `src/data/blog/` with `.md` extension
2. Check frontmatter `pubDatetime` is valid ISO date
3. Set `draft: false` (default)
4. Rebuild and check `dist/` folder

### Search Not Working

```bash
npm run build
```

Pagefind indexes `dist/` after astro build. If missing:
- Check `package.json` build script includes `pagefind`
- Verify `dist/pagefind/` exists
- Copy to public: `cp -r dist/pagefind public/`

## Performance Tips

- **Images**: Use WebP format in `public/` (Astro will optimize in future)
- **CSS**: Tailwind auto-purges unused classes
- **JavaScript**: Minimal; mostly CSS and structural JS for theme toggle

## Domain & SSL

Cloudflare Pages auto-provisions HTTPS for `eduuk.org`. No manual SSL needed.

## Analytics (Optional)

To enable Cloudflare Web Analytics:
1. Cloudflare Pages dashboard → Analytics
2. Click "Enable Web Analytics"
3. Copy token to `.env` as `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` (if needed in future)

(Currently site does not use analytics; adding it requires code changes.)

## RSS & Sitemaps

Auto-generated on every build:
- `dist/rss.xml` — RSS feed
- `dist/sitemap-index.xml` — Sitemap index
- `dist/sitemap-0.xml` — Sitemap entries (paginated)

Submit sitemaps to Google Search Console, Bing Webmaster, Yandex Webmaster.

---

*For details, see CLAUDE.md or README.md.*
