import { Component } from 'react';
import Layout from '../components/layout';

class Index extends Component {


  render() {
    const { schedule } = this.props;
    return (
      <Layout>
        <h1>Imprint</h1>  
      </Layout>
    );
  }
}
export default Index;