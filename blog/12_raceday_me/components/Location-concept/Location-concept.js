import { useEffect } from 'react';
import SVG from 'svg.js';

let LocationConcept = () => {
  useEffect(() => {
    var draw = SVG('svg').size(300, 130);
    var rect = draw
      .rect(100, 100)
      .fill('#f06')
      .move(20, 20);
  }, []);

  return <div id="svg" />;
};

export default LocationConcept;
