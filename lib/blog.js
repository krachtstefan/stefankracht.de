const blogFolder = './blog/';
const posts = (
  preval`module.exports = require("fs").readdirSync("${blogFolder}")` || []
)
  .filter(folderNames => folderNames[0] !== '.') // remove hidden folders
  .map(postFolder => require(`../blog/${postFolder}/index.mdx`));

export const allPosts = posts
  .map(post => {
    const { default: Component, meta } = post;
    return {
      Component,
      ...meta
    };
  })
  .sort((first, second) => (second.date - first.date > 0 ? 1 : -1));

export function findPostbyUrl(url) {
  return allPosts.find(post => post.url === url);
}

export function findPostbyId(id) {
  return allPosts.find(post => post.id === id);
}

export function getPostsList({ limit = 5, offset = 0 } = {}) {
  return allPosts.slice(offset, limit + offset);
}
