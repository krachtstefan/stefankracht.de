import { withRouter } from 'next/router';
import { getPostsList } from '../lib/blog';
import { config } from '../config';
import Error from 'next/error';

import Layout from '../components/layout';
import Bloglist from '../components/blog/list';
import Blogpagination from '../components/blog/pagination';

export default withRouter(props => {
  let { query } = props.router;
  if (!Object.keys(config.blog.categories).includes(query.category))
    return <Error statusCode={404} />;
  let categoryName = config.blog.categories[query.category];
  let postCount = getPostsList({ category: query.category }).length;
  let itemsPerPage = config.blog.itemsPerPage;
  let lastPage = Math.ceil(postCount / itemsPerPage);
  let page = query.page && lastPage ? parseInt(query.page) : 1;
  let offset = (page - 1) * itemsPerPage;
  if (isNaN(page) || page > lastPage || [0, 1].includes(parseInt(query.page)))
    return <Error statusCode={404} />;
  return (
    <Layout
      title={`${categoryName} Blog`}
      description={`All blog articles about ${categoryName}.`}
    >
      <h1>{categoryName} Blog</h1>
      <Bloglist
        posts={getPostsList({
          limit: itemsPerPage,
          offset,
          category: query.category
        })}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <Blogpagination
        page={page}
        lastPage={lastPage}
        href={page =>
          config.routing.blogCategory.nextLink.href(query.category, page)
        }
        as={page =>
          config.routing.blogCategory.nextLink.as(query.category, page)
        }
      />
    </Layout>
  );
});
