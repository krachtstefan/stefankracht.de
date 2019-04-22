var url = require('url');
let Index = () => {};
Index.getInitialProps = async ({ req, res }) => {
  const path = url.parse(req.url, true);
  let location = '/';
  if (path.query.format) {
    location = '/static/rss.xml';
  }

  if (res) {
    res.writeHead(302, {
      Location: location
    });
    res.end();
  } else {
    Router.push(location);
  }

  return {};
};

export default Index;
