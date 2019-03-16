import Layout from '../components/layout';
import { withRouter } from 'next/router';
import { getPostsList, allPosts } from '../lib/blog';
import { config } from '../config';
import Link from 'next/link';
import Error from 'next/error';

export default withRouter(props => {
  let { itemsPerPage } = config.blog;
  let postCount = allPosts.length;
  let lastPage = Math.ceil(postCount / itemsPerPage) - 1;
  let page =
    props.router.query.page && lastPage ? parseInt(props.router.query.page) : 0;
  let offset = page * itemsPerPage;
  let nextPage = page < lastPage ? page + 1 : null;
  let prevPage = page > 0 ? page - 1 : null;

  if (page > lastPage) return <Error statusCode={404} />;
  // error when offset to big
  return (
    <Layout>
      {getPostsList({ limit: itemsPerPage, offset }).map(post => (
        <div key={post.url}>
          <Link as={`/p/${post.url}`} href={`/post?url=${post.url}`}>
            <a>
              <h1>{post.title}</h1>
            </a>
          </Link>
          {/* <post.Component /> */}
        </div>
      ))}
      <hr />
      {prevPage ? (
        <Link href={`?page=${prevPage}`}>newer articles</Link>
      ) : (
        ''
      )}{' '}
      page: {page} / {lastPage}{' '}
      {nextPage ? <Link href={`?page=${nextPage}`}>older articles</Link> : ''}
    </Layout>
  );
});
