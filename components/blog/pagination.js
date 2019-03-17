import Link from 'next/link';
import PropTypes from 'prop-types';

const Pagination = props => {
  let { page, lastPage } = props;
  let nextPage = page < lastPage ? page + 1 : null;
  let prevPage = page > 0 ? page - 1 : null;
  return (
    <>
      <hr />
      {prevPage ? (
        <Link as={props.as(prevPage)} href={props.href(prevPage)}>
          <a>newer articles</a>
        </Link>
      ) : (
        ''
      )}{' '}
      page: {page} / {lastPage}{' '}
      {nextPage ? (
        <Link as={props.as(nextPage)} href={props.href(nextPage)}>
          <a>older articles</a>
        </Link>
      ) : (
        ''
      )}
    </>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired
};

export default Pagination;
