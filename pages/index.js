import Layout from '../components/layout';
import { withRouter } from 'next/router';
import Bloglist from '../components/blog/list';
import { allPosts } from '../lib/blog';
// import Blogpagination from './components/blog/pagination';
import { config } from '../config';

export default withRouter(props => {
  let postCount = allPosts.length;
  let itemsPerPage = config.blog.itemsPerPage;
  let lastPage = Math.ceil(postCount / itemsPerPage);
  let page =
    props.router.query.page && lastPage ? parseInt(props.router.query.page) : 1;
  let offset = (page - 1) * itemsPerPage;
  if (page > lastPage) return <Error statusCode={404} />;

  return (
    <Layout>
      <Bloglist limit={itemsPerPage} offset={offset} />
      {/* <Blogpagination page={page} lastPage={lastPage} /> */}
    </Layout>
  );
});
