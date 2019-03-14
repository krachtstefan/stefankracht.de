const postsFolders =
  preval`module.exports = require("fs").readdirSync("./blog/")` || [];

export const allPosts = postsFolders.map(folder => {
  const {
    default: Component,
    meta: { title }
  } = require(`../blog/${folder}/index.mdx`);

  return {
    Component,
    title
  };
});
