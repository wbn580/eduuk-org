# Study in UK — Knowledge Base

A practical knowledge base for international students planning to study in the United Kingdom. Built with Astro, Tailwind CSS, deployed on Cloudflare Pages.

## Live Site

https://eduuk.org/

## Features

- **Q&A Format**: Every article answers one specific question
- **Official Data**: All information sourced from UKVI, UCAS, HESA, and university sites
- **5 Categories**: Universities, Courses, Visa, Accommodation, Life
- **AI-Friendly**: Exports `/llms.txt` and `/llms-full.txt` for LLM systems
- **Dark Mode**: Light/dark theme toggle with no tracking
- **Fast**: Purely static, global CDN, ~200–400ms from China

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS 4
- **Hosting**: Cloudflare Pages
- **Search**: Pagefind (static site search)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone <repo>
cd eduuk-org
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build

```bash
npm run build
```

Output is in `dist/`.

## Folder Structure

```
src/
├── components/      # Astro components (Header, Footer, Card, etc.)
├── layouts/         # Page layouts (Layout.astro, AboutLayout.astro)
├── pages/           # Static pages and API routes
├── data/blog/       # Markdown articles (blog posts)
├── styles/          # CSS (global, typography)
├── utils/           # Helper functions (slugify, getSortedPosts, etc.)
├── scripts/         # Client-side scripts (theme.ts)
└── assets/
    ├── icons/       # SVG icons
    └── images/      # (images excluded; user adds manually)
public/
├── favicon.svg      # Site icon
├── site.webmanifest # PWA manifest
└── ...
```

## Adding Articles

1. Create a `.md` file in `src/data/blog/`
2. Include frontmatter:
   ```yaml
   ---
   title: "Question or topic?"
   description: "Brief one-line summary"
   pubDatetime: 2026-04-21
   tags: ["Universities", "IELTS"]
   featured: false
   ---
   ```
3. Write markdown content
4. Run `npm run build` to generate

## Configuration

Edit `src/config.ts`:

```typescript
export const SITE = {
  website: "https://eduuk.org/",
  author: "Study in UK Editorial Team",
  title: "Study in UK",
  // ... other settings
};
```

Edit `src/constants.ts` for social links and share buttons.

## Deployment

Automated via GitHub Actions on `main` branch push. Cloudflare Pages watches the repo and deploys to https://eduuk.org/.

### Manual Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

## License

Content: Creative Commons BY-SA (please attribute to Study in UK)  
Code: MIT

## Support

Email: hello@eduuk.org
