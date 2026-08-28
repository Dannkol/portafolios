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

- **Tailwind and Iconify are loaded from CDN `<script>` tags in `src/layouts/Layout.astro`**, not Astro integrations. There is no `tailwind.config` and no build-time processing. Consequences: utility classes only apply at runtime in the browser; `@apply` inside Astro scoped `<style>` blocks (used in `index.astro`) is **not** compiled — treat those as legacy/unreliable and prefer inline utility classes.

- **Blog posts live in `src/posts/**/*.mdx`** and are pulled in with `import.meta.glob(..., { eager: true })` (migrated from the deprecated `Astro.glob`). Routing is by **`frontmatter.slug`, not filename** — a post with `slug: foo` is served at both `/foo` (`src/pages/[slug].astro`) and `/blog/foo` (`src/pages/blog/[slug].astro`), which glob the same directory. `src/pages/blog.astro` is the index/listing and sorts by `frontmatter.date` desc.

- **`src/content/` is NOT an Astro content collection** (no `src/content/config.ts`). `src/content/posts/sobremi.mdx` is the CV body, imported directly as a component into `src/pages/index.astro` — separate from the blog glob.

- MDX config (`astro.config.mjs`): shiki `dracula` theme, `remark-toc`, accessible emojis, `gfm: false`.
