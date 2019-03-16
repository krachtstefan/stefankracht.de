import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
export default ({ children, title = 'stefankracht.de', ...props }) => (
  <div id="root">
    <Head>
      <title>{title}</title>
    </Head>
    <Header {...props} />
    <main>{children}</main>
    <Footer />
  </div>
);
