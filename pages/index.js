import Layout from '../components/layout';
import { allPosts } from '../lib/blog';
import '../assets/styles/app.scss';

export default () => (
  <Layout>
    <h1>My Blog</h1>
    {allPosts.map(post => (
      <>
        <h1>{post.title}</h1>
        <post.Component />
      </>
    ))}
  </Layout>
);
