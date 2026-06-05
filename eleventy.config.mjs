// Eleventy build: content/ (Markdown/Nunjucks) + src/ (design) → _site/
// Pages not yet migrated to content/ are still served from their original .html at the
// repo root via passthrough, so the public mirror never breaks during the gradual refactor.

export default function (eleventyConfig) {
  // Shared design assets (CSS, images) → /assets
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });

  // Private Sveltia CMS editor → /admin (copied verbatim, not templated).
  eleventyConfig.addPassthroughCopy({ admin: 'admin' });

  // Friendly date formatting for posts, e.g. "5 June 2026".
  eleventyConfig.addFilter('postDate', (d) =>
    d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''
  );

  // Published posts, newest first.
  eleventyConfig.addCollection('posts', (api) =>
    api.getFilteredByGlob('content/posts/*.md').filter((p) => !p.data.draft).reverse()
  );

  return {
    dir: {
      input: 'content',
      includes: '../src/_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
