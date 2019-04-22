const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { url: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:page', (req, res) => {
      const actualPage = '/blog';
      const queryParams = { page: req.params.page };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      redirectRules = [
        url => (['/news', '/news/'].includes(url) ? '/blog' : null),
        url =>
          ['/contact', '/contact/', '/about-me', '/about-me/'].includes(url)
            ? '/about'
            : null,
        url => (['/site-search', '/site-search/'].includes(url) ? '/' : null),
        url => (url === '/news?format=rss' ? '/static/rss.xml' : null),
        url => {
          let newUrl = url.replace(new RegExp('^/news/(?=.)'), '/p/');
          return newUrl === url ? null : newUrl;
        }
      ];

      let redirectTarget = redirectRules
        .map(rule => rule(req.url))
        .find(rule => rule);

      if (redirectTarget) {
        res.redirect(301, redirectTarget);
      }

      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
