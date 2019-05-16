/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import SVG from 'svg.js';

const Wrapper = styled.div`
  background: pink;
`;

let LocationConcept = () => {
  useEffect(() => {
    var draw = SVG('svg').size(300, 130);
    var rect = draw
      .rect(100, 100)
      .fill('#f06')
      .move(20, 20);
  }, []);

  const color = 'white';

  return (
    <Wrapper>
      <div id="svg" />
    </Wrapper>
  );
};

export default LocationConcept;
