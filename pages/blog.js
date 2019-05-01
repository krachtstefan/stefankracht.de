import { withRouter } from 'next/router';
import { getPostsList } from '../lib/blog';
import { config } from '../config';
import Error from 'next/error';

import ActiveLink from '../components/misc/activeLink';
import Layout from '../components/layout';
import Bloglist from '../components/blog/list';
import Blogpagination from '../components/blog/pagination';

export default withRouter(props => {
  let { query } = props.router;

  let categoryMode = query.category ? true : false;
  let categoryName = null;
  let categories = { all: 'All', ...config.blog.categories }; // add "all" as pseudo category
  if (categoryMode) {
    if (!Object.keys(config.blog.categories).includes(query.category))
      return <Error statusCode={404} />;
    categoryName = config.blog.categories[query.category];
  } else {
    categoryName = categories['all'];
  }

  let postCount = categoryMode
    ? getPostsList({ category: query.category }).length
    : getPostsList().length;
  let itemsPerPage = config.blog.itemsPerPage;
  let lastPage = Math.ceil(postCount / itemsPerPage);
  let page = query.page && lastPage ? parseInt(query.page) : 1;
  let offset = (page - 1) * itemsPerPage;
  if (isNaN(page) || page > lastPage || [0, 1].includes(parseInt(query.page)))
    return <Error statusCode={404} />;

  let posts = categoryMode
    ? getPostsList({
        limit: itemsPerPage,
        offset,
        category: query.category
      })
    : getPostsList({ limit: itemsPerPage, offset });

  return (
    <Layout
      title={categoryMode ? `${categoryName} Blog` : 'Blog'}
      description={
        categoryMode
          ? `All blog articles about ${categoryName}.`
          : 'A mixed collection of articles about development, running and new releases of my current side projects.'
      }
    >
      <div className="blog-heading-container">
        <h1>Blog</h1>
        <nav
          role="navigation"
          aria-label="category navigation"
          className="cat-menu"
        >
          <ul>
            <li>
              <a href="#">{categoryName}</a>
              <ul>
                {Object.keys(categories).map(category => {
                  return (
                    <li key={category}>
                      <ActiveLink
                        activeClassName="active"
                        href={
                          category === 'all'
                            ? config.routing.blogList.nextLink.href(0)
                            : config.routing.blogCategory.nextLink.href(
                                category,
                                0
                              )
                        }
                        as={
                          category === 'all'
                            ? config.routing.blogList.nextLink.as(0)
                            : config.routing.blogCategory.nextLink.as(
                                category,
                                0
                              )
                        }
                        highlightOn={
                          category === 'all'
                            ? () => !categoryMode
                            : () => categoryMode && category === query.category
                        }
                      >
                        <a>{categories[category]}</a>
                      </ActiveLink>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <Bloglist
        posts={posts}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <Blogpagination
        page={page}
        lastPage={lastPage}
        href={
          categoryMode
            ? page =>
                config.routing.blogCategory.nextLink.href(query.category, page)
            : page => config.routing.blogList.nextLink.href(page)
        }
        as={
          categoryMode
            ? page =>
                config.routing.blogCategory.nextLink.as(query.category, page)
            : page => config.routing.blogList.nextLink.as(page)
        }
      />
    </Layout>
  );
});
