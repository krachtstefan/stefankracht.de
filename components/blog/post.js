import PropTypes from 'prop-types';

const Blogpost = props => (
  <>
    <p>{new Intl.DateTimeFormat('en-US').format(props.post.date)}</p>
    <h1>{props.post.title}</h1>
    <props.post.Component />
  </>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
