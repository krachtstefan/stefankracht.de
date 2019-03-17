import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(props => (
  <>
    {props.posts.map(post => (
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
));
