// Directory data applied to every post. Drafts are never written to the public site.
module.exports = {
  layout: 'post.njk',
  eleventyComputed: {
    // Published posts → /posts/<slug>/ ; drafts → not written at all.
    permalink: (data) =>
      data.draft ? false : `/posts/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) => !!data.draft,
  },
};
