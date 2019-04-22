const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const externalLinks = require('remark-external-links');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [[externalLinks, { rel: ['noopener'] }]]
  }
});

module.exports = withImages(
  withSass(
    withMDX({
      pageExtensions: ['js', 'jsx', 'mdx'],
      target: 'serverless'
    })
  )
);
