/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';

const Wrapper = styled.div`
  border: 1px solid pink;
  padding: 20px;
`;

const Interactive = styled.svg`
  background: #f3f3f3;
  path {
    stroke: #ff0000;
    fill: none;
  }
  circle {
    transition: all 0.5s ease;
    fill: black;
  }
`;

let LocationConceptTest = () => {
  let minAccuracy = 2,
    maxAccuracy = 100,
    defaultAccuracy = 10,
    [accuracy, setAccuracy] = useState(defaultAccuracy),
    [pathLength, setPathLength] = useState(null),
    [chordsArr, setChordsArr] = useState([]),
    path = useRef(null);

  useEffect(() => {
    setPathLength(path.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!pathLength) {
      return;
    }
    let newChordsArr = [];
    Array.from({ length: maxAccuracy + 1 }).map((item, index) => {
      newChordsArr.push(
        path.current.getPointAtLength((pathLength / accuracy + 1) * index)
      );
    });
    setChordsArr(newChordsArr);
  }, [pathLength, accuracy]);

  const onSliderChange = (e, x) => {
    setAccuracy(parseInt(e.target.value));
  };

  return (
    <Wrapper>
      <Interactive width="500" height="500" viewBox="-20 -20 460 460">
        <path
          ref={path}
          d="M-1,1.499h83c0,0,10.5,1,10.5,11.25s-10.25,12.25-10.25,12.25h-43.5c0,0-10.75,0.75-11.75,11.5s9.75,12.25,9.75,12.25H343.5"
          strokeWidth="3"
        />

        {chordsArr.map((choordinate, index) => {
          return (
            <circle key={index} r="3" cx={choordinate.x} cy={choordinate.y} />
          );
        })}
      </Interactive>
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
