import Layout from '../components/layout';
import { withRouter } from 'next/router';
import Bloglist from '../components/blog/list';
import { config } from '../config';

export default withRouter(props => {
  return (
    <Layout>
      <Bloglist itemsPerPage={config.blog.itemsPerPage} />
    </Layout>
  );
});
