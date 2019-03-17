import { withRouter } from 'next/router';
import { getPostsList } from '../../lib/blog';
import Link from 'next/link';

export default withRouter(props => {
  let { limit, offset } = props;
  return (
    <>
      {getPostsList({ limit, offset }).map(post => (
        <div key={post.url}>
          <Link as={`/p/${post.url}`} href={`/post?url=${post.url}`}>
            <a>
              <h1>{post.title}</h1>
            </a>
          </Link>
          {/* <post.Component /> */}
        </div>
      ))}
    </>
  );
});
