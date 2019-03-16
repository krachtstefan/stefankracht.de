import Layout from '../components/layout';
import { allPosts } from '../lib/blog';

export default () => (
  <Layout>
    {allPosts.map(post => (
      <>
        <h1>{post.title}</h1>
        <post.Component />
      </>
    ))}
  </Layout>
);
