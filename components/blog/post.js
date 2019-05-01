import PropTypes from 'prop-types';
import Link from 'next/link';
import { config } from './../../config';

const Blogpost = props => (
  <div className="content-container">
    <h1>{props.post.title}</h1>
    <img {...props.post.images.teaser} />
    <props.post.Component />
    <p className="blog-date">
      written on {new Intl.DateTimeFormat('en-US').format(props.post.date)} in{' '}
      {props.post.categories
        .map(category => (
          <Link
            as={config.routing.blogCategory.nextLink.as(category)}
            href={config.routing.blogCategory.nextLink.href(category)}
          >
            <a>{category}</a>
          </Link>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
    </p>
  </div>
);

Blogpost.propTypes = {
  post: PropTypes.object.isRequired
};

export default Blogpost;
