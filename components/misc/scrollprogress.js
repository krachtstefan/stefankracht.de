import { useCallback } from 'react';
import PropTypes from 'prop-types';

const scrollProgress = ({ selector = null }) => {
  const root = document.body.style;

  // returns number between 0 and 1, 1 means it has reached the element/end of the document
  const ScrollProgress = useCallback(() => {
    let element = selector ? document.querySelector(selector) : null;
    let distanceFromViewportTop = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : document.body.offsetHeight;
    let distanceFromViewportBottm =
      distanceFromViewportTop - window.innerHeight;
    let progress = window.pageYOffset / distanceFromViewportBottm;
    return progress > 1 ? 1 : progress;
  });

  // Initialize variables
  root.setProperty('--scroll', scrollProgress());

  // Scroll events
  window.addEventListener('scroll', scroll, false);
  function scroll() {
    root.setProperty('--scroll', scrollProgress());
  }

  return <div className="progress" />;
};

ScrollProgress.propTypes = {
  selector: PropTypes.string
};

export default ScrollProgress;
