import Layout from '../components/layout';
import { allPosts } from '../lib/blog';

export default () => (
  <Layout>
    <h1>My Blog</h1>
    {allPosts.map(post => (
      <>
        <h2>{post.title}</h2>
        <post.Component />
      </>
    ))}
  </Layout>
);
