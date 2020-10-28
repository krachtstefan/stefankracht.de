const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // this could be a page from the blog (/blog/2) or a category page (/blog/runverter)
    server.get('/blog/:page_or_category', (req, res) => {
      let isPage = parseInt(req.params.page_or_category);
      const queryParams = isPage
        ? { page: req.params.page_or_category }
        : { category: req.params.page_or_category };
      app.render(req, res, '/blog', queryParams);
    });

    server.get('/blog/:category/:page', (req, res) => {
      app.render(req, res, '/blog', {
        category: req.params.category,
        page: req.params.page,
      });
    });

    server.get('/p/:id', (req, res) => {
      const queryParams = { url: req.params.id };
      app.render(req, res, '/post', queryParams);
    });

    server.get('*', (req, res) => {
      redirectRules = [
        (url) => (['/news', '/news/'].includes(url) ? '/blog' : null),
        (url) =>
          ['/contact', '/contact/', '/about-me', '/about-me/'].includes(url)
            ? '/about'
            : null,
        (url) => (['/site-search', '/site-search/'].includes(url) ? '/' : null),
        (url) => {
          let newUrl = url.replace(new RegExp('^/news/(?=.)'), '/p/');
          return newUrl === url ? null : newUrl;
        },
      ];

      let redirectTarget = redirectRules
        .map((rule) => rule(req.url))
        .find((rule) => rule);

      if (redirectTarget) {
        res.redirect(301, redirectTarget);
      }

      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
