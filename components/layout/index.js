import Head from 'next/head';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import Header from './header';
import Footer from './footer';
import '../../assets/styles/app.scss';

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const Layout = ({
  children,
  title = '',
  description,
  image = require('./../../assets/images/stefan-kracht.jpg'),
  ...props
}) => (
  <div id="main">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Stefan Kracht" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, archive" />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@stefan_kracht" />
    </Head>
    <Header {...props} />
    <main>{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default Layout;
