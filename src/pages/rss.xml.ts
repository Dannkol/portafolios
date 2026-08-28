import rss from "@astrojs/rss";
import type { APIContext } from "astro";

const posts = Object.values(import.meta.glob("../posts/*.mdx", { eager: true }))
  .filter((post: any) => post.frontmatter.lang !== "es")
  .sort(
    (a: any, b: any) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  ) as any[];

export function GET(context: APIContext) {
  return rss({
    title: "Daniel Manosalva — Blog",
    description:
      "Notes on the things I build — AI clones, hackathon projects and full-stack experiments.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      pubDate: new Date(post.frontmatter.date),
      link: `/blog/${post.frontmatter.slug}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
