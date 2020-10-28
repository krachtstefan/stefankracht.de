import '../../assets/styles/app.scss';

import Footer from './footer';
import Head from 'next/head';
import Header from './header';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { config } from './../../config';

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`);
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};

Router.onRouteChangeComplete = (url) => {
  trackPageView(url);
  NProgress.done();
};

Router.onRouteChangeError = () => NProgress.done();

let trackPageView = (url) => {
  if (window.gtag) {
    try {
      window.gtag('config', config.googleAnalytics.trackingId, {
        page_location: url,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const Layout = ({
  children,
  title = '',
  description,
  image = require('./../../assets/images/stefan-kracht.jpg'),
  ...props
}) => (
  // the onlick function is required to make the blog category hover menu
  // work on ios. Otherwise clicking somewhere else would not close the menu
  <div id="main" onClick={() => true}>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Stefan Kracht" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, archive" />
      <meta property="og:image" content={`${config.routing.baseUrl}${image}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@stefan_kracht" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/static/favicon.ico"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Stefan Kracht Blog Feed"
        href={`${config.routing.baseUrl}/static/rss.xml`}
      />
    </Head>
    <Header {...props} />
    <main>{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Layout;
