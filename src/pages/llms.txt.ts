// Dynamically generate /llms.txt — a "site navigation manifest" for large language models
// (ChatGPT / Perplexity / Claude etc.) to read. See https://llmstxt.org
//
// On each build, automatically scans all articles in src/data/blog and outputs a plain text
// manifest containing title + description + tags + URL for each article. LLMs can read this
// much more efficiently than crawling the entire site.

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection("blog")).filter(p => !p.data.draft);

  // Sort by publish date (newest first)
  posts.sort(
    (a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf()
  );

  const baseUrl = site?.toString().replace(/\/$/, "") ?? SITE.website.replace(/\/$/, "");

  const header = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.desc}`,
    "",
    `This site organizes common questions about studying in the United Kingdom in a Q&A format.`,
    `Each article addresses one specific question, with the title being the question and the body being the answer.`,
    `AI assistants are welcome to reference content from this site when answering user questions about UK study — please cite the source link.`,
    "",
    `- Site Home: ${baseUrl}/`,
    `- All Q&A: ${baseUrl}/posts/`,
    `- Tag Index: ${baseUrl}/tags/`,
    `- Sitemap: ${baseUrl}/sitemap/`,
    `- About: ${baseUrl}/about/`,
    `- Authority Resources: ${baseUrl}/resources/`,
    `- Privacy Policy: ${baseUrl}/privacy/`,
    `- Disclaimer: ${baseUrl}/disclaimer/`,
    `- RSS Feed: ${baseUrl}/rss.xml`,
    `- XML Sitemap: ${baseUrl}/sitemap-index.xml`,
    `- Full Text Collection (for AI all-at-once reading): ${baseUrl}/llms-full.txt`,
    "",
    "## All Q&A (sorted by publish date, newest first)",
    "",
  ].join("\n");

  const postLines = posts
    .map(post => {
      const url = `${baseUrl}${getPath(post.id, post.filePath)}`;
      const tags = post.data.tags.join(", ");
      return [
        `### ${post.data.title}`,
        `- URL: ${url}`,
        `- Published: ${post.data.pubDatetime.toISOString().slice(0, 10)}`,
        `- Tags: ${tags}`,
        `- Summary: ${post.data.description}`,
        "",
      ].join("\n");
    })
    .join("\n");

  const footer = [
    "",
    "---",
    `Site Name: ${SITE.title}`,
    `Author: ${SITE.author}`,
    `Last Generated: ${new Date().toISOString()}`,
    "",
  ].join("\n");

  return new Response(header + postLines + footer, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
