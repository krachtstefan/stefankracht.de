import PropTypes from 'prop-types';

const Blogpost = props => (
  <>
    <h1>{props.post.title}</h1>
    <props.post.Component />
  </>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
