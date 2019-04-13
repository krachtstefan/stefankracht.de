import { withRouter } from 'next/router';
import { allPosts, getPostsList } from '../lib/blog';
import { config } from '../config';
import Error from 'next/error';
import Layout from '../components/layout';
import ProjectList from '../components/projects/list';
import Bloglist from '../components/blog/list';
import Blogpagination from '../components/blog/pagination';

export default withRouter(props => {
  let itemsPerPage = config.blog.itemsPerPage;
  return (
    <Layout>
      <h1>Blog</h1>
      <Bloglist
        posts={getPostsList({ limit: itemsPerPage })}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <a className="more">read more articles</a>
      <h1>Projects</h1>
      <ProjectList />
      <a className="more">explore more projects</a>
    </Layout>
  );
});
