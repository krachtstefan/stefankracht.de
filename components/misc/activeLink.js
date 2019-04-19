import { withRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Children } from 'react';

const ActiveLink = ({
  router,
  children,
  activeClassName = null,
  highlightOn = [],
  ...props
}) => {
  const child = Children.only(children);
  let className = child.props.className || '';
  console.log(router.pathname);
  if (
    activeClassName &&
    (router.pathname === props.href || highlightOn.includes(router.pathname))
  ) {
    className = `${className} ${activeClassName}`.trim();
  }
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string,
  highlightOn: PropTypes.array
};

export default withRouter(ActiveLink);
