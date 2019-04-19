import PropTypes from 'prop-types';

const Blogpost = props => (
  <div className="blog-post">
    {/* <p>{new Intl.DateTimeFormat('en-US').format(props.post.date)}</p> */}
    <img className="teaser" {...props.post.images.teaser} />
    <h1>{props.post.title}</h1>
    <props.post.Component />
  </div>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
