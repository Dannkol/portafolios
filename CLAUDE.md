# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio + CV + blog. Astro 7 static site, **Bun** as package manager/runtime (`bun.lock`). Deployed to GitHub Pages at **dannkol.com** (custom domain via `CNAME`) by `.github/workflows/astro.yml` (uses `oven-sh/setup-bun`) on every push to `main`.

## Commands

- `bun install` — install deps
- `bun run dev` — dev server at `localhost:4321`
- `bun run build` — runs `astro check` (type check) **then** `astro build`. Build fails on type errors. CI builds with `bunx astro build --site --base` and skips `astro check`.
- `bun run preview` — serve the built `./dist/` locally
- No test runner and no lint config. `astro check` is the only gate.

## Architecture notes (non-obvious)

- **Tailwind v4 and Iconify are built at compile time** (not CDN). Tailwind runs through the `@tailwindcss/vite` plugin (`astro.config.mjs` → `vite.plugins`); theme tokens live in `src/styles/global.css` (the sage palette remaps `--color-indigo-*`, plus `@custom-variant dark` for class-based dark mode). Icons use the `astro-icon` integration (`<Icon name="set:icon" .../>` from `astro-icon/components`), resolved offline from the installed `@iconify-json/*` collections — no runtime script. There is no `tailwind.config`; content is auto-detected. `@apply` now works reliably since CSS is compiled.

- **Blog posts live in `src/posts/**/*.mdx`** and are pulled in with `import.meta.glob(..., { eager: true })`. Posts are duplicated per language: English in `src/posts/`, Spanish in `src/posts/es/`, each with a `lang` frontmatter field and a **shared `slug`** so both versions form a `/blog/<slug>` + `/es/blog/<slug>` pair. Routing is by `frontmatter.slug`, not filename. `blog.astro` / `es/blog.astro` are the listings (glob their respective folder, sort by `frontmatter.date` desc); `blog/[slug].astro` / `es/blog/[slug].astro` render a single post via the shared `PostPage` component.

- **`src/content/` is NOT an Astro content collection** (no `src/content/config.ts`). `src/content/posts/sobremi.mdx` (EN) and `sobremi-es.mdx` (ES) are the CV bodies, imported directly as components by `src/components/CVPage.astro` (rendered by `pages/index.astro` and `pages/es/index.astro`) — separate from the blog glob.

- **i18n is real, file-based routing** (not a client-side toggle): `astro.config.mjs` sets `i18n` (default `en`, `routing.prefixDefaultLocale: false`). English lives at the root, Spanish under `/es/...` (e.g. `/es/blog/<slug>`). Shared helpers are in `src/components/utils/i18n.ts` (`langFromPath`, `alternatePath`, locale-aware `formatDate`, and the `UI` string dictionary). Pages read the language from the URL and render only that locale; `Layout.astro` emits `<html lang>`, canonical and `hreflang` en/es/x-default. The header language button is a plain link to the counterpart URL. Legacy root-level post URLs (`/{slug}`) survive via `redirects` to `/blog/{slug}`.

- MDX config (`astro.config.mjs`): shiki `dracula` theme, `remark-toc`, accessible emojis, `gfm: false`.
