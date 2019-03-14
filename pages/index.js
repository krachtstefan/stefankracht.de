import Layout from '../components/layout';

const postsFolders =
  preval`module.exports = require("fs").readdirSync("./blog/")` || [];

const posts = postsFolders.map(folder => {
  const {
    default: Component,
    meta: { title }
  } = require(`../blog/${folder}/index.mdx`);

  return {
    Component,
    title
  };
});

export default () => (
  <Layout>
    <h1>My Blog</h1>
    {posts.map(post => (
      <>
        <h2>{post.title}</h2>
        <post.Component />
      </>
    ))}
  </Layout>
);
