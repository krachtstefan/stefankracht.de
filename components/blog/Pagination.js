import Link from 'next/link';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  let { page, lastPage } = props;
  let nextPage = page < lastPage ? page + 1 : null;
  let prevPage = page > 0 ? page - 1 : null;
  return (
    <p className="pagination">
      {prevPage ? (
        <Link as={props.as(prevPage)} href={props.href(prevPage)}>
          <a className="first">newer articles</a>
        </Link>
      ) : (
        <span className="first empty" />
      )}
      <span className="middle">
        page {page} of {lastPage}
      </span>
      {nextPage ? (
        <Link as={props.as(nextPage)} href={props.href(nextPage)}>
          <a className="last">older articles</a>
        </Link>
      ) : (
        <span className="last empty" />
      )}
    </p>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired,
};

export default Pagination;
