import { withRouter } from 'next/router';
import Error from 'next/error';

import { findPostbyUrl } from '../lib/blog';
import Layout from '../components/layout';
import Link from 'next/link';

export default withRouter(props => {
  let post = findPostbyUrl(props.router.query.url);
  if (!post) return <Error statusCode={404} />;
  return (
    <Layout>
      <p>
        <Link href={`/`}>
          <a>back</a>
        </Link>
      </p>
      <h1>{post.title}</h1>
      <post.Component />
    </Layout>
  );
});
