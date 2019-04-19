import PropTypes from 'prop-types';

const Blogpost = props => (
  <div className="blog-post">
    <h1 className="blog-headline">{props.post.title} </h1>
    <img {...props.post.images.teaser} />
    <props.post.Component />
    <p className="blog-date">
      written on {new Intl.DateTimeFormat('en-US').format(props.post.date)}
    </p>
  </div>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
