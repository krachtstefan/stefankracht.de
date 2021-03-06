import Blogpost from '../components/blog/Post';
import Error from 'next/error';
import Layout from '../components/Layout';
import Link from 'next/link';
import { config } from './../config';
import dynamic from 'next/dynamic';
import { findPostbyUrl } from '../lib/blog';
import { withRouter } from 'next/router';

const ScrollProgress = dynamic(
  () => import('../components/misc/ScrollProgress'),
  { ssr: false }
);

const Post = (props) => {
  let post = findPostbyUrl(props.router.query.url);
  if (!post) return <Error statusCode={404} />;
  let blogCategory = post.categories[0];
  return (
    <Layout
      title={post.title}
      image={post.images.teaser.src}
      description={post.description}
    >
      <ScrollProgress selector={'.blog-date'} />
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
};

export default withRouter(Post);
