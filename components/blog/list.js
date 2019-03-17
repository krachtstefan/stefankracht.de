import Link from 'next/link';

export default props => (
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
);
