import PropTypes from 'prop-types';

const Blogpost = props => (
  <div className="blog-post">
    <h1>{props.post.title}</h1>
    {/* <p>{new Intl.DateTimeFormat('en-US').format(props.post.date)}</p> */}
    <img {...props.post.images.teaser} />
    <props.post.Component />
  </div>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
