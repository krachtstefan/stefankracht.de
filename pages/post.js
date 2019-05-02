import { withRouter } from 'next/router';
import Error from 'next/error';
import Link from 'next/link';

import { config } from './../config';
import { findPostbyUrl } from '../lib/blog';
import Layout from '../components/layout';
import Blogpost from '../components/blog/post';
import Scrollprogress from '../components/misc/scrollprogress';

export default withRouter(props => {
  let post = findPostbyUrl(props.router.query.url);
  let blogCategory = post.categories[0];
  if (!post) return <Error statusCode={404} />;
  return (
    <Layout
      title={post.title}
      image={post.images.teaser.src}
      description={post.description}
    >
      <Scrollprogress />
      <Blogpost post={post} />
      <p className="pagination">
        <Link
          as={config.routing.blogList.nextLink.as()}
          href={config.routing.blogList.nextLink.href()}
        >
          <a className="first wide">read other articles</a>
        </Link>
        <Link
          as={config.routing.blogCategory.nextLink.as(blogCategory)}
          href={config.routing.blogCategory.nextLink.href(blogCategory)}
        >
          <a className="last wide">read more from this category</a>
        </Link>
      </p>
    </Layout>
  );
});
