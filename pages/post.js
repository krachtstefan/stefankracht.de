import { withRouter } from 'next/router';
import Layout from '../components/layout';
import Link from 'next/link';

export default withRouter(props => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <Link href={`/`}>
      <a>back</a>
    </Link>
  </Layout>
));
