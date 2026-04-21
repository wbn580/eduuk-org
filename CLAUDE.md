# Study in UK — Handoff Documentation

## Project Overview

**Study in UK** is a practical knowledge base for international students planning to study in the United Kingdom. All information is grounded in official UK government data (UKVI, UCAS, HESA) and real student experience.

- **Domain**: https://eduuk.org/
- **Tech**: Astro 5 + Tailwind CSS 4 + Cloudflare Pages
- **Content Format**: Q&A structure (one question = one article)
- **5 Categories**: Universities, Courses, Visa, Accommodation, Life
- **Language**: English (UK English preferred)

## Site Structure

### Pages & Routes

- `/` — Home (hero + 5 category cards + featured Q&A + recent updates)
- `/posts/` — All articles (blog feed, paginated)
- `/posts/[slug]/` — Single article (Q&A page with date, tags, structured data)
- `/tags/` — Tag directory
- `/tags/[tag]/` — Articles by category
- `/archives/` — All posts grouped by month
- `/about/` — About the site (mission, scope, sources, contact)
- `/resources/` — UK study resource links (GOV.UK, UCAS, UKCISA, etc.)
- `/privacy/` — Privacy policy (no tracking, no ads)
- `/disclaimer/` — Legal disclaimer (informational only)
- `/search/` — Pagefind search interface

### Content Structure

```
src/data/blog/
├── universities/
│   ├── g5-universities.md
│   ├── russell-group.md
│   └── ...
├── courses/
├── visa/
├── accommodation/
├── life/
└── ...
```

**Article Frontmatter**:
```yaml
---
title: "Question or topic title"
description: "One-line summary (for meta + search results)"
pubDatetime: 2026-04-21
modDatetime: 2026-04-22  # optional
tags: ["Universities", "IELTS", "Application"]
featured: false  # if true, shows in home hero section
draft: false  # if true, excluded from builds (unless dev mode)
---
```

### Tag Slugs (from `src/utils/tagSlug.ts`)

- **5 main categories**: Universities, Courses, Visa, Accommodation, Life → `universities`, `courses`, `visa`, `accommodation`, `life`
- **Sub-topics**: Application, Scholarship, Cost, IELTS, Pre-sessional, Russell Group, G5, Undergraduate, Master, PhD, London

## Writing Guidelines (GEO-Friendly Format)

All articles follow this structure:

1. **H2 as question**: "What are Russell Group universities?" (not "Russell Group Overview")
2. **First paragraph**: Direct answer (2–4 sentences, no fluff)
3. **H3 breakdowns**: Use tables where possible (e.g., university list, visa timeline)
4. **Official citations**: Every fact links to gov.uk, UCAS, HESA, or university official pages
5. **Date accuracy**: Last updated date at article footer; flag any time-sensitive info
6. **No anecdotes**: Facts only; use data, not personal stories
7. **Conversational but precise**: "You'll need an IELTS 6.5" (not "roughly IELTS 6-7")

**Example structure**:
```markdown
---
title: "What is the UK Student Visa financial requirement?"
description: "2026 Student Visa funds: £20,500 per year tuition + living costs."
---

As of 2026, the UK Student Visa requires:
- Tuition fee (shown on CAS letter)
- Living costs: £1,270/month (England), £1,000/month (Scotland/Wales/NI)
- Proof held ≥28 days before application

| Item | Amount | Source |
|---|---|---|
| Tuition | Your CAS | University letter |
| Living costs (London, per month) | £1,270 | UKVI official |

**Last updated**: April 2026. [Link to UKVI page]
```

## SEO & Structured Data

### Meta Tags

- **Title**: "[Title] | Study in UK" (50–60 chars)
- **Description**: Article `description` frontmatter (max 160 chars)
- **Keywords**: Auto-generated from `tags`

### Structured Data

- **BlogPosting**: For article pages (headline, date, author)
- **QAPage**: For article pages (question = title, answer = content)
- **WebSite**: For non-article pages (search action, site name)
- **Organization**: All pages (name, logo, knowsAbout array)

`src/layouts/Layout.astro` handles JSON-LD generation automatically.

### AI-Friendly Exports

- `/llms.txt` — Index of all articles (title + URL + summary)
- `/llms-full.txt` — Full text of all articles (for large context LLMs)

Update in `src/pages/llms.txt.ts` and `src/pages/llms-full.txt.ts` if needed.

## Configuration Files

### `src/config.ts`

```typescript
export const SITE = {
  website: "https://eduuk.org/",
  author: "Study in UK Editorial Team",
  title: "Study in UK",
  desc: "...",
  lang: "en",
  timezone: "Europe/London",
  // ... pagination, archive, edit settings
};
```

### `src/constants.ts`

**SOCIALS**: Contact methods (currently Mail only)  
**SHARE_LINKS**: Article share buttons (X, LinkedIn, Facebook, Mail, Copy)

### `src/utils/tagSlug.ts`

Mapping of tag names to URL slugs. Keep English tags + slugs aligned.

## Components

### Layout

- `Layout.astro` — Main HTML wrapper (head, body, structured data)
- `AboutLayout.astro` — For about/privacy/disclaimer/resources pages

### Global

- `Header.astro` — Nav bar, dark mode toggle, search, archives button
- `Footer.astro` — Links, copyright, social icons
- `FloatingActions.astro` — Floating "Uni Match" button (bottom-right)

### Content

- `Card.astro` — Article preview card (title, date, snippet)
- `Datetime.astro` — Published/updated date with icon
- `Tag.astro` — Tag link with # icon
- `Pagination.astro` — Prev/Next buttons and page counter
- `Breadcrumb.astro` — Breadcrumb navigation

### Utilities

- `BackButton.astro` — "Go back" link (uses sessionStorage)
- `BackToTopButton.astro` — Scroll-to-top with progress ring
- `Socials.astro` — Social link icon set
- `LinkButton.astro` — Base button/link component

## Styling

- **Global CSS**: `src/styles/global.css` (Tailwind + custom vars)
- **Typography**: `src/styles/typography.css` (prose classes)
- **Tailwind**: `tailwind.config.ts` (not tracked; uses defaults)
- **Color Scheme**: Light/dark via `data-theme` attribute on `<html>`

**Color Palette** (CSS vars in `global.css`):
- `--background`: Page bg
- `--foreground`: Text color
- `--accent`: Link/interactive color (currently blue)
- `--border`: Divider color
- `--muted`: Secondary text

## Deployment

### Cloudflare Pages

Automatic deploy on `main` branch push. Runs:

```bash
npm install
npm run build
```

Output: `dist/`

### Build Command

```bash
astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/
```

Generates OG images, applies Pagefind indexing, copies search assets.

### Environment Variables

Create `.env` for local:
```
PUBLIC_GOOGLE_SITE_VERIFICATION=xxx
PUBLIC_BING_VERIFICATION=xxx
PUBLIC_YANDEX_VERIFICATION=xxx
```

(See `.env.example` for template.)

## Key Files Checklist

### Configuration
- [x] `src/config.ts` — Site metadata
- [x] `src/constants.ts` — Socials, share links
- [x] `src/utils/tagSlug.ts` — Tag → slug mapping
- [x] `astro.config.ts` — Build & Markdown config
- [x] `tsconfig.json` — TypeScript config
- [x] `.prettierrc.mjs`, `eslint.config.js` — Code style

### Layouts & Components
- [x] `src/layouts/Layout.astro` — Main layout
- [x] `src/layouts/AboutLayout.astro` — About page layout
- [x] `src/components/Header.astro`, `Footer.astro`, `FloatingActions.astro` — Global UI
- [x] Content components (Card, Tag, Datetime, Breadcrumb, etc.)

### Pages
- [x] `src/pages/index.astro` — Home page
- [x] `src/pages/about.md` — About
- [x] `src/pages/privacy.md` — Privacy policy
- [x] `src/pages/disclaimer.md` — Disclaimer
- [x] `src/pages/resources.md` — UK resource links
- [x] `src/pages/posts/[...page].astro` — Blog feed
- [x] `src/pages/posts/[...slug]/index.astro` — Article page
- [x] `src/pages/tags/[tag]/[...page].astro` — Tag archive
- [x] `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` — AI indexes
- [x] `src/pages/rss.xml.ts`, `src/pages/sitemap.astro`, etc. — Feeds

### Public Assets
- [x] `public/favicon.svg`, `public/site.webmanifest` — Icons & metadata
- [ ] `public/favicon-32x32.png`, `public/favicon-16x16.png`, `public/favicon.ico`, `public/apple-touch-icon.png` — **Manual copy needed** (binary images from source)
- [ ] `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png` — **Manual copy needed** (PWA images)

## Missing Binary Files

The following image files must be copied manually from `studyuk-cn/public/`:

- `favicon-32x32.png`
- `favicon-16x16.png`
- `favicon.ico`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `og-image.png` (OG image fallback)

Copy to `eduuk-org/public/`.

## Next Steps for Content Team

1. **Add articles** to `src/data/blog/` (follow Q&A format above)
2. **Set env vars** in Cloudflare Pages dashboard for SEO verification (Google, Bing, Yandex)
3. **Copy binary assets** (PNGs, ICO) from studyuk-cn repo
4. **Update og-image.png** or generate with `npm run build`
5. **Deploy** — Push to main branch; Cloudflare auto-builds and deploys

## Contact & Support

- **Issues**: GitHub Issues
- **Email**: hello@eduuk.org
- **Docs**: See `/about/` on live site for editorial stance and sources

---

*Handoff completed April 2026.*
