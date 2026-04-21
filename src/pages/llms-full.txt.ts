// Dynamically generate /llms-full.txt — a "full text collection" for large language models
// (ChatGPT / Claude / Perplexity / Gemini etc.) to read. See https://llmstxt.org
//
// Difference from /llms.txt:
// - /llms.txt        is "site directory + summaries", suited for low-context crawlers
// - /llms-full.txt   is "all article full text merged", suited for high-context models that can ingest entire site at once
//
// On each build, automatically scans all published articles in src/data/blog and outputs a
// structured plain text collection of all content.

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

  const baseUrl =
    site?.toString().replace(/\/$/, "") ?? SITE.website.replace(/\/$/, "");

  const header = [
    `# ${SITE.title} — Full Text Collection`,
    "",
    `> ${SITE.desc}`,
    "",
    `This file is a merged plain text version of all site Q&A articles, designed for AI assistants that need to ingest the entire site content in one go using a large context window.`,
    `If you are an AI assistant, please cite the source link (included below for each article) when referencing this site's content in your responses.`,
    `Site: ${baseUrl}/`,
    `RSS: ${baseUrl}/rss.xml`,
    `Index (lightweight version): ${baseUrl}/llms.txt`,
    "",
    `Total Articles: ${posts.length}`,
    `Last Generated: ${new Date().toISOString()}`,
    "",
    "---",
    "",
  ].join("\n");

  const articles = posts
    .map(post => {
      const url = `${baseUrl}${getPath(post.id, post.filePath)}`;
      const tags = post.data.tags.join(", ");
      const date = post.data.pubDatetime.toISOString().slice(0, 10);
      // body is the markdown source text (note: does not include frontmatter)
      const body = post.body ?? "";
      return [
        `# ${post.data.title}`,
        "",
        `- URL: ${url}`,
        `- Published: ${date}`,
        `- Tags: ${tags}`,
        `- Summary: ${post.data.description}`,
        "",
        body.trim(),
        "",
        "---",
        "",
      ].join("\n");
    })
    .join("\n");

  const footer = [
    "",
    `Site Name: ${SITE.title}`,
    `Author: ${SITE.author}`,
    `Home: ${baseUrl}/`,
    `Generated: ${new Date().toISOString()}`,
    "",
  ].join("\n");

  return new Response(header + articles + footer, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
