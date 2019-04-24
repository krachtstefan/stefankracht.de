import { withRouter } from 'next/router';
import { getPostsList } from '../lib/blog';
import { config } from '../config';
import Error from 'next/error';

import Layout from '../components/layout';
import Bloglist from '../components/blog/list';
import Blogpagination from '../components/blog/pagination';

export default withRouter(props => {
  let { query } = props.router;
  let postCount = getPostsList().length;
  let itemsPerPage = config.blog.itemsPerPage;
  let lastPage = Math.ceil(postCount / itemsPerPage);
  let page = query.page && lastPage ? parseInt(query.page) : 1;
  let offset = (page - 1) * itemsPerPage;
  if (isNaN(page) || page > lastPage || [0, 1].includes(parseInt(query.page)))
    return <Error statusCode={404} />;
  return (
    <Layout
      title="Blog"
      description="A mixed collection of articles about development, running and new releases of my current side projects."
    >
      <h1>Blog</h1>
      <Bloglist
        posts={getPostsList({ limit: itemsPerPage, offset })}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <Blogpagination
        page={page}
        lastPage={lastPage}
        href={page => config.routing.blogList.nextLink.href(page)}
        as={page => config.routing.blogList.nextLink.as(page)}
      />
    </Layout>
  );
});
