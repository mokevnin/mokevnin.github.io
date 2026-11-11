// Page content lives in the YAML files next to this one; this module parses and validates them,
// so a typo in a field name or a broken URL fails the build instead of rendering an empty card.
// String fields marked "inline Markdown" may contain links and `code`, rendered with md().
import { z } from "astro/zod";
import { marked } from "marked";
import { parse } from "yaml";

import articles from "./articles.yaml?raw";
import career from "./career.yaml?raw";
import openSource from "./open-source.yaml?raw";
import orgprog from "./orgprog.yaml?raw";
import podcasts from "./podcasts.yaml?raw";
import projects from "./projects.yaml?raw";
import talks from "./talks.yaml?raw";
import textLinks from "./text-links.yaml?raw";

const url = z.url();

const card = z.strictObject({
  name: z.string(),
  url,
  description: z.string(), // inline Markdown
});

const link = z.strictObject({
  title: z.string(),
  url,
});

const entry = z.strictObject({
  title: z.string(),
  url: url.optional(), // talks without a recording have no link
  venue: z.string().optional(), // inline Markdown
});

const milestone = z.strictObject({
  period: z.string(),
  text: z.string(),
});

export type Card = z.infer<typeof card>;
export type Link = z.infer<typeof link>;
export type Entry = z.infer<typeof entry>;
export type Milestone = z.infer<typeof milestone>;

function load<T extends z.ZodType>(schema: T, source: string, file: string): z.infer<T>[] {
  const result = z.array(schema).safeParse(parse(source));
  if (!result.success) {
    throw new Error(`src/data/${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const data = {
  projects: load(card, projects, "projects.yaml"),
  openSource: load(card, openSource, "open-source.yaml"),
  orgprog: load(link, orgprog, "orgprog.yaml"),
  textLinks: load(link, textLinks, "text-links.yaml"),
  articles: load(entry, articles, "articles.yaml"),
  talks: load(entry, talks, "talks.yaml"),
  podcasts: load(entry, podcasts, "podcasts.yaml"),
  career: load(milestone, career, "career.yaml"),
};

export function md(source: string): string {
  return marked.parseInline(source, { async: false });
}
