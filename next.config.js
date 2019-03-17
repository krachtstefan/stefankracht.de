const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
});

module.exports = withImages(
  withSass(
    withMDX({
      pageExtensions: ['js', 'jsx', 'mdx']
    })
  )
);
