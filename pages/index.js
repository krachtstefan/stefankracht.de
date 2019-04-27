import { withRouter } from 'next/router';
import { getPostsList } from '../lib/blog';
import { config } from '../config';
import Link from 'next/link';
import Layout from '../components/layout';
import ProjectTeaser from '../components/projects/teaser';
import Bloglist from '../components/blog/list';

export default withRouter(() => {
  return (
    <Layout
      title="Stefan Kracht"
      description="Hello, my name is Stefan Kracht, I'm an developer and passionate runner living in hamburg."
    >
      <h1>Blog</h1>
      <Bloglist
        posts={getPostsList({ limit: config.blog.itemsPerPage })}
        href={url => config.routing.blogPost.nextLink.href(url)}
        as={url => config.routing.blogPost.nextLink.as(url)}
      />
      <p className="pagination">
        <Link
          as={config.routing.blogList.nextLink.as(2)}
          href={config.routing.blogList.nextLink.href(2)}
        >
          <a className="first only">read more articles</a>
        </Link>
      </p>
      <h1>Projects</h1>
      <ProjectTeaser />
      <p className="pagination">
        <Link href="/projects">
          <a className="first only">explore more projects</a>
        </Link>
      </p>
    </Layout>
  );
});
