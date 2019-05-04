import { useCallback } from 'react';
import PropTypes from 'prop-types';

const LogoAnimation = ({ selector = null }) => {
  const element = document.querySelector(selector);

  const mouseMove = useCallback(e => {
    let {
      width: elemenWidth,
      height: elementHeigh
    } = element.getBoundingClientRect();
    let posX = (e.offsetX / elemenWidth - 0.5) / 0.5; // between -1 and 1
    let posY = (e.offsetY / elementHeigh - 0.5) / 0.5; // between -1 and 1
    element.style.setProperty('--logoRotateX', `${posX * 35}deg`);
    element.style.setProperty('--logoRotateY', `${posY * -35}deg`);
    element.style.setProperty('--innerMoveX', `${posX * 10}px`);
    element.style.setProperty('--innerMoveY', `${posY * 10}px`);
  });

  document.querySelector('#logo').addEventListener('mousemove', mouseMove);

  return <React.Fragment />;
};

LogoAnimation.propTypes = {
  selector: PropTypes.string.isRequired
};

export default LogoAnimation;
