const baseUrl = 'https://stefankracht.now.sh';
const mdx = require('@mdx-js/mdx');
const babel = require('@babel/core');
const fs = require('fs');
const RSS = require('rss');
const path = require('path');
const blogFolder = './../blog/';

const requireFromStringSync = (src, filename) => {
  const Module = module.constructor;
  const m = new Module();
  m._compile(src, filename);
  return m.exports;
};

const requireMDXSync = (mdxSrc, filename) => {
  const jsx = mdx
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
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-transform-modules-commonjs']
  });
  const transformed = babel.transformSync(jsx, babelOptions);
  return requireFromStringSync(transformed.code, filename);
};

const requireMDXFileSync = path => {
  const mdxSrc = fs.readFileSync(path, { encoding: 'utf-8' });
  return requireMDXSync(mdxSrc, path);
};

const readPostMetadata = postPath => {
  const mod = requireMDXFileSync(postPath);
  const { meta } = mod;
  return meta;
};

const generateRSS = () => {
  var feed = new RSS({
    title: 'Stefan Kracht Blog',
    description:
      'A mixed collection of articles about development, running and new releases of my current side projects.',
    feed_url: `${baseUrl}/rss`,
    site_url: baseUrl,
    language: 'en',
    ttl: '60'
  });

  let posts = (fs.readdirSync(path.resolve(__dirname, `${blogFolder}`)) || [])
    .filter(folderNames => folderNames[0] !== '.') // remove hidden folders
    .map(postFolder =>
      readPostMetadata(
        `${path.resolve(__dirname, `${blogFolder}`)}/${postFolder}/index.mdx`
      )
    );
  posts.map(post => {
    feed.item({
      title: post.title,
      url: `${baseUrl}/p/${post.url}`,
      description: post.description,
      date: post.date
    });
  });
  fs.writeFileSync('static/rss.xml', feed.xml({ indent: true }));
};

generateRSS();
