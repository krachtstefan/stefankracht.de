const blogFolder = './blog/';
const posts = (
  preval`module.exports = require("fs").readdirSync("${blogFolder}")` || []
)
  .filter(folderNames => folderNames[0] !== '.') // remove hidden folders
  .map(postFolder => `${postFolder}/index.mdx`);

export const allPosts = posts.map(path => {
  const {
    default: Component,
    meta: { title }
  } = require(`../blog/${path}`);

  return {
    Component,
    title
  };
});
