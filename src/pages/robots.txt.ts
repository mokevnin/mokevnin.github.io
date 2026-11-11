import type { APIRoute } from "astro";

// Allows everything and points crawlers to the sitemap that @astrojs/sitemap generates.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
