import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(props => {
  let { page, lastPage } = props;
  let nextPage = page < lastPage ? page + 1 : null;
  let prevPage = page > 0 ? page - 1 : null;
  return (
    <>
      <hr />
      {prevPage ? (
        <Link href={`?page=${prevPage}`}>
          <a>newer articles</a>
        </Link>
      ) : (
        ''
      )}{' '}
      page: {page} / {lastPage}{' '}
      {nextPage ? (
        <Link href={`?page=${nextPage}`}>
          <a>older articles</a>
        </Link>
      ) : (
        ''
      )}
    </>
  );
});
