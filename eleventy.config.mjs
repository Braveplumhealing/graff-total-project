// Eleventy build: content/ (Markdown/Nunjucks) + src/ (design) → _site/
// Pages not yet migrated to content/ are still served from their original .html at the
// repo root via passthrough, so the public mirror never breaks during the gradual refactor.

export default function (eleventyConfig) {
  // Shared design assets (CSS, images) → /assets
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });

  // Not-yet-migrated pages stay byte-for-byte identical until converted in a reviewed PR.
  eleventyConfig.addPassthroughCopy({
    'legacy-pages/about.html': 'about.html',
    'legacy-pages/work-with-me.html': 'work-with-me.html',
    'legacy-pages/speaking.html': 'speaking.html',
    'legacy-pages/podcast.html': 'podcast.html',
    'legacy-pages/videos.html': 'videos.html',
    'legacy-pages/book.html': 'book.html',
    'legacy-pages/contact.html': 'contact.html',
  });

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
