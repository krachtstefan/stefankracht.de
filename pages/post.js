import { withRouter } from 'next/router';
import Error from 'next/error';
import { findPostbyUrl } from '../lib/blog';
import Layout from '../components/layout';
import Link from 'next/link';
import Blogpost from '../components/blog/post';

export default withRouter(props => {
  let post = findPostbyUrl(props.router.query.url);
  if (!post) return <Error statusCode={404} />;
  return (
    <Layout>
      <Blogpost post={post} />
      <p className="pagination">
        <Link href={`/`}>
          <a className="first only">back</a>
        </Link>
      </p>
    </Layout>
  );
});
