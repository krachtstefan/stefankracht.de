import { withRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Children } from 'react';

const ActiveLink = ({
  router,
  children,
  activeClassName = null,
  highlightOn = null,
  ...props
}) => {
  const child = Children.only(children);
  let className = child.props.className || '';
  if (
    activeClassName &&
    ((!highlightOn && router.pathname === props.href) || // use normal page path matching
      (highlightOn && highlightOn(router))) // use highlightOn function if provided
  ) {
    className = `${className} ${activeClassName}`.trim();
  }
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string,
  highlightOn: PropTypes.func
};

export default withRouter(ActiveLink);
