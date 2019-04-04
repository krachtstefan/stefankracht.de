import Link from 'next/link';
import PropTypes from 'prop-types';

const List = props => (
  <div className="blog-list">
    {props.posts.map(post => (
      <div key={post.url}>
        <Link as={props.as(post.url)} href={props.href(post.url)}>
          <a>
            <h1>{post.title}</h1>
          </a>
        </Link>
        <img {...post.images.teaser} />
      </div>
    ))}
  </div>
);

List.propTypes = {
  posts: PropTypes.array.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired
};

export default List;
