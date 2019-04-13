import { withRouter } from 'next/router';
import { getPostsList } from '../lib/blog';
import { config } from '../config';
import Layout from '../components/layout';
import ProjectList from '../components/projects/list';
import Bloglist from '../components/blog/list';

export default withRouter(props => {
  return (
    <Layout>
      <h1>Blog</h1>
      <Bloglist
        posts={getPostsList({ limit: config.blog.itemsPerPage })}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <p className="pagination">
        <a>read more articles</a>
      </p>
      <h1>Projects</h1>
      <ProjectList />
      <p className="pagination">
        <a className="first">explore more projects</a>
      </p>
    </Layout>
  );
});
