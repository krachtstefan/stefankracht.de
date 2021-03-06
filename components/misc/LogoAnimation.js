import PropTypes from 'prop-types';
import { useCallback } from 'react';

const LogoAnimation = ({ selector = null }) => {
  const mouseMove = useCallback((e, element) => {
    let {
      width: elemenWidth,
      height: elementHeigh,
    } = element.getBoundingClientRect();
    let posX = (e.offsetX / elemenWidth - 0.5) / 0.5; // between -1 and 1
    let posY = (e.offsetY / elementHeigh - 0.5) / 0.5; // between -1 and 1
    element.style.setProperty('--logoRotateX', `${posX * 35}deg`);
    element.style.setProperty('--logoRotateY', `${posY * -35}deg`);
    element.style.setProperty('--innerMoveX', `${posX * 10}px`);
    element.style.setProperty('--innerMoveY', `${posY * 10}px`);
  });

  const init = useCallback((e) => {
    const element = document.querySelector(selector);
    element.addEventListener('mousemove', (e) => {
      mouseMove(e, element);
    });
  });

  // requestAnimationFrame is required to work after route change. otherwise
  // the query selector would access an old instance of the element
  window.requestAnimationFrame(init);

  return <React.Fragment />;
};

LogoAnimation.propTypes = {
  selector: PropTypes.string.isRequired,
};

export default LogoAnimation;
