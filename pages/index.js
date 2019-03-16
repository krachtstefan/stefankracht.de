import Layout from '../components/layout';
import { allPosts } from '../lib/blog';
import '../assets/styles/app.scss';

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
