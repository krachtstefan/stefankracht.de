import { withRouter } from 'next/router';
import { getPostsList, allPosts } from '../../lib/blog';
import Pagination from './pagination';
import Link from 'next/link';
import Error from 'next/error';

export default withRouter(props => {
  let { itemsPerPage } = props;
  let postCount = allPosts.length;
  let lastPage = Math.ceil(postCount / itemsPerPage);
  let page =
    props.router.query.page && lastPage ? parseInt(props.router.query.page) : 1;
  let offset = (page - 1) * itemsPerPage;
  if (page > lastPage) return <Error statusCode={404} />;
  return (
    <>
      {getPostsList({ limit: itemsPerPage, offset }).map(post => (
        <div key={post.url}>
          <Link as={`/p/${post.url}`} href={`/post?url=${post.url}`}>
            <a>
              <h1>{post.title}</h1>
            </a>
          </Link>
          <post.Component />
        </div>
      ))}
      <Pagination page={page} lastPage={lastPage} />
    </>
  );
});
