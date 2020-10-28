import Link from 'next/link';
import PropTypes from 'prop-types';

const List = (props) => (
  <div className="blog-list">
    {props.posts.map((post) => (
      <Link as={props.as(post.url)} href={props.href(post.url)} key={post.url}>
        <a>
          <h1>{post.title}</h1>
          <img {...post.images.teaser} />
        </a>
      </Link>
    ))}
  </div>
);

List.propTypes = {
  posts: PropTypes.array.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired,
};

export default List;
