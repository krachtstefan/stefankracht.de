import Layout from '../components/layout';
import { allPosts } from '../lib/blog';
import Link from 'next/link';

export default () => (
  <Layout>
    {allPosts.map(post => (
      <>
        <Link href={`/post?url=${post.url}`}>
          <a>
            <h1>{post.title}</h1>
          </a>
        </Link>
        <post.Component />
      </>
    ))}
  </Layout>
);
