/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import SVG from 'svg.js';

const Wrapper = styled.div`
  background: grey;
`;

let LocationConceptTest = () => {
  let canvas,
    track,
    trackLength,
    minAccuracy = 3,
    maxAccuracy = 20,
    defaultAccuracy = 16,
    [accuracy, setAccuracy] = useState(defaultAccuracy),
    ballRefs = Array.from({ length: maxAccuracy });

  const drawCircles = items => {
    if (canvas) {
      ballRefs.forEach((ball, index) => {
        if (!ball) {
          console.log('init ' + index);
          ball = canvas.circle(10).fill('#00ff00');
          ballRefs[index] = ball;
        } else {
          console.log('already there ' + index);
        }

        let visible = index <= items;
        let center = visible
          ? track.pointAt((track.length() / items - 1) * index)
          : {
              x: Math.floor(Math.random() * 100),
              y: Math.floor(Math.random() * 100)
            };

        if (visible) {
          ball.fill('#0000ff');
        } else {
          ball.fill('#00ff00');
        }
        ball.cx(center.x).cy(center.y);
      });
      // Array.from({ length: items + 1 }).forEach((x, i) => {
      //   var ball = canvas.circle(10).fill('#00ff00');
      //   let center = track.pointAt((track.length() / items - 1) * i);
      //   ball.cx(center.x).cy(center.y);
      // });
    } else {
      console.log('no canvas :(');
    }
  };

  useEffect(() => {
    canvas = SVG('svg')
      .size('100%', '100')
      .viewbox(0, 0, 800, 100);

    track = canvas
      .path(
        'M-1,1.499h83c0,0,10.5,1,10.5,11.25s-10.25,12.25-10.25,12.25h-43.5c0,0-10.75,0.75-11.75,11.5s9.75,12.25,9.75,12.25H343.5'
      )
      .fill('none')
      .stroke({ width: 3, color: '#ff0000' });

    drawCircles(defaultAccuracy);
  }, []);

  const onSliderChange = (e, x) => {
    setAccuracy(e.target.value);
    drawCircles(e.target.value);
  };
  return (
    <Wrapper>
      <div id="svg" />
      <input
        type="range"
        min={minAccuracy}
        max={maxAccuracy}
        value={accuracy}
        onChange={onSliderChange}
      />
      {accuracy}
    </Wrapper>
  );
};

export default LocationConceptTest;
