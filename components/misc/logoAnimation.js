import { useCallback } from 'react';
import PropTypes from 'prop-types';

const LogoAnimation = ({ selector = null }) => {
  const element = document.querySelector(selector);
  const mouseMove = useCallback(e => {
    let {
      width: elemenWidth,
      height: elementHeigh
    } = element.getBoundingClientRect();
    let centerX = 0.5;
    let centerY = 0.5;
    let posX = e.offsetX / elemenWidth - centerX;
    let posY = e.offsetY / elementHeigh - centerY;
    console.log(posX, posY);
  });

  document.querySelector('#logo').addEventListener('mousemove', mouseMove);

  return <React.Fragment />;
};

LogoAnimation.propTypes = {
  selector: PropTypes.string.isRequired
};

export default LogoAnimation;
