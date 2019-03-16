const blogFolder = './blog/';
const posts = (
  preval`module.exports = require("fs").readdirSync("${blogFolder}")` || []
)
  .filter(folderNames => folderNames[0] !== '.') // remove hidden folders
  .map(postFolder => require(`../blog/${postFolder}/index.mdx`));

export const allPosts = posts
  .map(post => {
    const {
      default: Component,
      meta: { title, date, url }
    } = post;

    return {
      Component,
      title,
      date,
      url
    };
  })
  .sort((first, second) => (second.date - first.date > 0 ? 1 : -1));

export function findPostbyUrl(url) {
  return allPosts.find(post => post.url === url);
}
