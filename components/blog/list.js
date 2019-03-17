import Link from 'next/link';
import PropTypes from 'prop-types';

const List = props => (
  <>
    {props.posts.map(post => (
      <div key={post.url}>
        <Link as={props.as(post.url)} href={props.href(post.url)}>
          <a>
            <h1>{post.title}</h1>
          </a>
        </Link>
        <post.Component />
      </div>
    ))}
  </>
);

List.propTypes = {
  posts: PropTypes.array.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired
};

export default List;
