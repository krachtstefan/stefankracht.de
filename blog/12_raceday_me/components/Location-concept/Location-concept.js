/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import SVG from 'svg.js';

const Wrapper = styled.div`
  border: 1px solid pink;
  paddin: 20px;
`;

let LocationConceptTest = () => {
  let minAccuracy = 2,
    maxAccuracy = 10,
    defaultAccuracy = 5,
    [accuracy, setAccuracy] = useState(defaultAccuracy),
    [pathLength, setPathLength] = useState(null),
    path = useRef(null);

  useEffect(() => {
    setPathLength(path.current.getTotalLength());
  }, [useEffect]);

  const onSliderChange = (e, x) => {
    setAccuracy(e.target.value);
  };
  return (
    <Wrapper>
      <svg width="100%" height="100" viewBox="0 0 800 100">
        <path
          ref={path}
          d="M-1,1.499h83c0,0,10.5,1,10.5,11.25s-10.25,12.25-10.25,12.25h-43.5c0,0-10.75,0.75-11.75,11.5s9.75,12.25,9.75,12.25H343.5"
          fill="none"
          stroke="#ff0000"
          strokeWidth="3"
        />

        {path.current &&
          Array.from({ length: maxAccuracy + 1 }).map((item, index) => {
            let visible = index < accuracy + 1;
            let center = visible
              ? path.current.getPointAtLength(
                  (pathLength / accuracy + 1) * index
                )
              : { x: 0, y: 0 };
            return (
              <circle
                key={index}
                r="5"
                cx={center.x}
                cy={center.y}
                fill="#00ff00"
              />
            );
          })}
      </svg>
      <input
        type="range"
        min={minAccuracy}
        max={maxAccuracy}
        value={accuracy}
        onChange={onSliderChange}
      />
      {accuracy}
      <br />
      pathLength: {pathLength}
    </Wrapper>
  );
};

export default LocationConceptTest;
