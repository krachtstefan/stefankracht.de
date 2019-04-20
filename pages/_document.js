import Document, { Head, Main, NextScript } from 'next/document';
import { config } from './../config/';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = process.env.NODE_ENV === 'production';
    const initialProps = await Document.getInitialProps(ctx);
    console.log('isProduction? ' + isProduction);
    return { ...initialProps, isProduction };
  }

  setGoogleTags() {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.googleAnalytics.trackingId}');
      `
    };
  }

  render() {
    const { isProduction } = this.props;
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${
                  config.googleAnalytics.trackingId
                }`}
              />
              {/* We call the function above to inject the contents of the script tag */}
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </Fragment>
          )}
        </body>
      </html>
    );
  }
}
