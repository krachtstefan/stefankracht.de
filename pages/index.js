const postFileNames =
  preval`
module.exports = require("fs").readdirSync("./posts")
` || [];

import { Component } from 'react';
import Layout from '../components/layout';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const posts = postFileNames.map(name => {
      //   const {
      //     default: Component,
      //     meta: { title }
      //   } = require("../posts/" + name)
      //   return {
      //     Component,
      //     title
      //   }
    });
    return {};
  }

  render() {
    return (
      <Layout>
        <h1>Hello</h1>
      </Layout>
    );
  }
}

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
