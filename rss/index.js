const mdx = require('@mdx-js/mdx');
const babel = require('@babel/core');
const fs = require('fs');
// const path = require('path');
const RSS = require('rss');
const blogFolder = './blog/';
let posts = (fs.readdirSync(`${blogFolder}`) || [])
  .filter(folderNames => folderNames[0] !== '.') // remove hidden folders
  .map(postFolder => readPostMetadata(`./blog/${postFolder}/index.mdx`));
// .map(postFolder => require(`../blog/${postFolder}/index.mdx`));

function requireFromStringSync(src, filename) {
  const Module = module.constructor;
  const m = new Module();
  m._compile(src, filename);
  return m.exports;
}

function requireMDXSync(mdxSrc, filename) {
  let jsx = mdx
    .sync(mdxSrc)
    .split('\n')
    .filter(
      line =>
        !line.match(new RegExp('(require).*(.png|.jpg|.gif)')) && // line contains a require(...).jpg|.png|.gif
        !line.match(new RegExp('(^import).*(;+$)')) // line starts with import and ends with ;
    )
    .join('\n');
  const babelOptions = babel.loadOptions({
    babelrc: false,
    presets: [
      '@babel/preset-react'
      // ^^^ mitigates error:
      // SyntaxError: unknown: Unexpected token (6:33)
      // > 6 | export default ({components}) => <MDXTag name="wrapper">{`
      //     |                                  ^
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs'
      // ^^^ mitigages error:
      // hello.mdx:1
      // (function (exports, require, module, __filename, __dirname) { export const meta = {
      //                                                               ^^^^^^
      //      SyntaxError: Unexpected token export
    ]
  });
  const transformed = babel.transformSync(jsx, babelOptions);
  return requireFromStringSync(transformed.code, filename);
}

function requireMDXFileSync(path) {
  const mdxSrc = fs.readFileSync(path, { encoding: 'utf-8' });
  return requireMDXSync(mdxSrc, path);
}

function readPostMetadata(postPath) {
  const mod = requireMDXFileSync(postPath);
  const { meta } = mod;
  return {
    filePath: postPath
    // urlPath: postPath
    //   .replace(/\\/, '/')
    //   .replace(/^pages/, '')
    //   .replace(/\.mdx?$/, ''),
    // title: meta.title || path.basename(postPath),
    // publishDate: new Date(meta.publishDate)
  };
}

// function generateRSS(posts) {
//   const siteUrl = 'https://nextjs-mdx-blog-example.now.sh';
//   const feed = new RSS({
//     title: 'My blog',
//     site_url: siteUrl
//   });
//   posts.map(post => {
//     feed.item({
//       title: post.title,
//       guid: post.urlPath,
//       url: siteUrl + post.urlPath,
//       date: post.publishDate
//     });
//   });
//   return feed.xml({ indent: true });
// }

module.exports = (req, res) => {
  var feed = new RSS({
    title: 'Stefan Kracht Blog',
    description:
      'A mixed collection of articles about development, running and new releases of my current side projects.',
    feed_url: 'https://stefankracht.de/rss',
    site_url: 'https://stefankracht.de',
    language: 'en',
    ttl: '60'
  });
  console.log(posts);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.end(feed.xml());
};
