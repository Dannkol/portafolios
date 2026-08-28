import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

export default defineConfig({
  site: "https://dannkol.com/",
  // ...
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Legacy deep-links from the old root-level post routes (/{slug})
  // now live under /blog/{slug}.
  redirects: {
    "/hackathon_mexa_aletheia": "/blog/hackathon_mexa_aletheia",
    "/hackathon_portal_nexora": "/blog/hackathon_portal_nexora",
  },
  // Shared Markdown/MDX pipeline: MDX inherits the processor defined here.
  markdown: {
    processor: unified({
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeAccessibleEmojis],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: false,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sitemap({
      // 404 pages should never be indexed.
      filter: (page) => !page.includes("/404"),
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'dracula' },
    }),
  ],
});