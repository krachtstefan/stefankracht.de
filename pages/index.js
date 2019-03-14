const postsFolders =
  preval`
module.exports = require("fs").readdirSync("./blog/")
` || [];

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
  <div>
    <h1>My Blog</h1>
    {posts.map(post => (
      <>
        <h2>{post.title}</h2>
        <post.Component />
      </>
    ))}
  </div>
);

// import { Component } from 'react';
// import Layout from '../components/layout';

// export default class extends React.Component {
//   static async getInitialProps({ req }) {
//     const posts = postFileNames.map(name => {
//       //   const {
//       //     default: Component,
//       //     meta: { title }
//       //   } = require("../posts/" + name)
//       //   return {
//       //     Component,
//       //     title
//       //   }
//     });
//     return {};
//   }

//   render() {
//     return (
//       <Layout>
//         <h1>Hello</h1>
//       </Layout>
//     );
//   }
// }

//   render() {
//     // console.log(posts)
//     return (
//       <Layout>
//         <h1>Hello</h1>
//       </Layout>
//     );
//   }
// }
// export default Index;
