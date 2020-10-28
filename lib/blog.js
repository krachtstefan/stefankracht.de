const blogFolder = './blog/';
const posts = (
  preval`module.exports = require("fs").readdirSync("${blogFolder}")` || []
)
  .filter((folderNames) => folderNames[0] !== '.') // remove hidden folders
  .map((postFolder) => require(`../blog/${postFolder}/index.mdx`));

export const allPosts = posts
  .map((post) => {
    const { default: Component, meta } = post;
    return {
      Component,
      ...meta,
    };
  })
  .sort((first, second) => (second.date - first.date > 0 ? 1 : -1));

export const findPostbyUrl = (url) => {
  return allPosts.find((post) => post.url === url);
};

export const findPostbyId = (id) => {
  return allPosts.find((post) => post.id === id);
};

const filterPostbyCategory = (category) => {
  return allPosts.filter((post) =>
    category ? post.categories.includes(category) : true
  );
};

export const getPostsList = ({
  limit = null,
  offset = 0,
  category = null,
} = {}) => {
  return filterPostbyCategory(category).slice(
    offset,
    limit ? limit + offset : undefined
  );
};
