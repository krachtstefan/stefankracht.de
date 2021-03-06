/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  input[type='range'] {
    width: 100px;
    position: relative;
    top: -4px;
  }
  .inline-toggle {
    position: relative;
    top: 4px;
    .toggle {
      background: #f26662;
    }
    .active-bg {
      background: #10cf6b;
    }
  }

  .red {
    cursor: pointer;
    transition: all 0.4s ease;
    border-bottom: 4px dashed #f26662;
  }
  .green {
    cursor: pointer;
    transition: all 0.4s ease;
    border-bottom: 4px dashed #10cf6b;
  }
`;

const Svg = styled.svg`
  padding: 20px 20px 0 20px;
  width: 100%;
  path#run-track,
  path#link {
    opacity: 0;
    fill: none;
    stroke: #10cf6b;
    stroke-width: 2;
    stroke-dasharray: 4;
    stroke-linecap: round;
    transition: all 0.4s ease;
    animation: dash 50s linear infinite;
  }
  path#link {
    stroke: #f26662;
  }

  circle.choordinate {
    stroke: #252525;
    stroke-width: 2;
    transition: all 0.4s ease;
    fill: white;
  }
  #road {
    stroke: #b6b6b6;
    stroke-width: 1;
  }

  &.show-non-gpx {
    path#link {
      transition: all 0.4s ease;
      opacity: 1;
    }
  }
  &.show-gpx {
    path#run-track {
      transition: all 0.4s ease;
      opacity: 1;
    }
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 500;
    }
  }
`;

const ProgressBar = styled.div`
  display: inline;
  padding: 0px 10px;
  position: relative;
  z-index: 0;
  &:after {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #d6d6d6;
    content: '';
    position: absolute;
    z-index: -2;
  }
  div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: -1;
    transition: all 0.4s ease;
    width: ${(props) => (props.dataWidth ? `${props.dataWidth}%` : '0%')};
    background: #10cf6b;
  }
`;

const Battery = styled.div`
  display: inline-block;
  position: relative;
  top: 4px;
  width: 41px;
  height: 22px;
  margin-right: 5px;
  box-sizing: content-box;
  position: relative;
  transition: all 0.4s ease;
  animation: batteryborder 10s linear;
  animation-play-state: paused;
  animation-delay: ${(props) =>
    props.dataWidth ? `calc( ${props.dataWidth * 0.01} * -10s)` : '0%'};
  animation-iteration-count: 1;
  animation-fill-mode: both;
  border: 1px solid #10cf6b;
  @keyframes batteryborder {
    0%,
    25% {
      border-color: #f26662;
    }

    25%,
    35% {
      border-color: #f9bf00;
    }

    35%,
    100% {
      border-color: #10cf6b;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    animation: batteryfill 10s linear;
    animation-play-state: paused;
    animation-delay: ${(props) =>
      props.dataWidth ? `calc( ${props.dataWidth * 0.01} * -10s)` : '0%'};
    animation-iteration-count: 1;
    border: 1px solid white;
    animation-fill-mode: both;
    @keyframes batteryfill {
      0%,
      25% {
        background-color: #f26662;
      }
      25%,
      35% {
        background-color: #f9bf00;
      }
      35%,
      100% {
        background-color: #10cf6b;
      }
      0% {
        width: 12%;
      }
      100% {
        width: 112%;
      }
    }
  }
  &:after {
    width: 5px;
    height: 13px;
    border-radius: 0 2px 2px 0;
    position: absolute;
    content: '';
    top: 4px;
    right: -7px;
    animation: batterytop 10s linear;
    animation-play-state: paused;
    animation-delay: ${(props) =>
      props.dataWidth ? `calc( ${props.dataWidth * 0.01} * -10s)` : '0%'};
    animation-iteration-count: 1;
    animation-fill-mode: both;
    @keyframes batterytop {
      0%,
      25% {
        background-color: #f26662;
      }
      25%,
      35% {
        background-color: #f9bf00;
      }
      35%,
      100% {
        background-color: #10cf6b;
      }
    }
  }
`;

let LocationConceptTest = () => {
  const minAccuracy = 5,
    maxAccuracy = 50,
    defaultAccuracy = 15,
    [accuracy, setAccuracy] = useState(defaultAccuracy),
    [lengthAccuracy, setLengthAccuracy] = useState(0),
    [trackLength, setTrackLength] = useState(null),
    [linkLength, setLinkLength] = useState(null),
    [chordsArr, setChordsArr] = useState([]),
    [showGpx, setShowGpx] = useState(false),
    [battery, setBattery] = useState(100),
    track = useRef(null),
    link = useRef(null);

  useEffect(() => {
    if (track.current) {
      setTrackLength(track.current.getTotalLength());
    }
  }, []);

  useLayoutEffect(() => {
    if (link.current) {
      window.setTimeout(() => {
        setLinkLength(link.current.getTotalLength());
      }, 500);
    }
  });

  useEffect(() => {
    if (linkLength && trackLength) {
      setLengthAccuracy((linkLength / trackLength) * 100);
    }
  }, [trackLength, linkLength]);

  useEffect(() => {
    setBattery((accuracy / (maxAccuracy - minAccuracy)) * 100 * -1 + 100);
  }, [accuracy, maxAccuracy]);

  const toggleShowGpx = () => {
    if (!showGpx) {
      setAccuracy(20);
    }
    setShowGpx(!showGpx);
  };

  useEffect(() => {
    if (!trackLength) {
      return;
    }
    let newChordsArr = [];
    Array.from({ length: maxAccuracy + 1 }).map((item, index) => {
      newChordsArr.push(
        track.current.getPointAtLength((trackLength / accuracy + 1) * index)
      );
    });
    setChordsArr(newChordsArr);
  }, [trackLength, accuracy]);

  const onSliderChange = (e, x) => {
    setAccuracy(parseInt(e.target.value));
  };

  let classNames = showGpx ? 'show-gpx' : 'show-non-gpx';

  return (
    <Wrapper>
      <Svg
        viewBox="0 -1 420 269"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames}
      >
        <g
          id="race-track"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="berlin-marathon" fillRule="nonzero">
            <path
              d="M75.62,267 C75.3342654,267.000445 75.0493056,266.970273 74.77,266.91 L47.21,260.91 L46.86,260.82 L24.14,253.68 C23.3990472,253.445965 22.7423015,253.001184 22.25,252.4 L1.45,227 C0.110461609,225.362994 0.276976193,222.96606 1.83,221.53 L53.08,174.13 C53.8054885,173.460536 54.7529101,173.082992 55.74,173.07 L68.74,172.88 L82.3,166.21 L75.07,156.84 C74.3097008,155.855147 74.0509707,154.572585 74.37,153.37 L82,124.9 C82.3683382,123.512229 83.4522289,122.428338 84.84,122.06 L115.29,114.06 L137.53,106.18 C137.947603,106.031859 138.386919,105.954134 138.83,105.95 L143.36,105.95 C144.138552,105.954793 144.90037,106.176413 145.56,106.59 L162.84,117.73 L207.72,131.73 L228.59,89.35 C229.200834,88.1123083 230.406596,87.2769686 231.78,87.14 L293.43,80.95 L293.21,77.71 L288.77,77.93 C286.643189,78.0367688 284.805594,76.4585475 284.59,74.34 L284.15,69.95 L271.39,71.32 C270.334327,71.4319631 269.277445,71.1196835 268.452152,70.4519465 C267.626859,69.7842095 267.100855,68.8157899 266.99,67.76 L266.4,62.21 L252.47,63.69 C250.260861,63.924721 248.279721,62.324139 248.045,60.115 C247.810279,57.905861 249.410861,55.924721 251.62,55.69 L269.53,53.79 C270.585673,53.6780369 271.642555,53.9903165 272.467848,54.6580535 C273.293141,55.3257905 273.819145,56.2942101 273.93,57.35 L274.51,62.9 L287.29,61.53 C289.446156,61.3118722 291.383856,62.8505037 291.66,65 L292.12,69.61 L296.68,69.38 C298.856925,69.2713092 300.720137,70.9255211 300.87,73.1 L301.63,84.1 C301.803243,86.2860418 300.18412,88.2040111 298,88.4 L234.7,94.75 L213.3,138.21 C212.42901,139.977323 210.400765,140.847177 208.52,140.26 L159.9,125.12 C159.547061,125.013482 159.210543,124.858683 158.9,124.66 L142.17,113.88 L139.51,113.88 L117.75,121.6 L117.44,121.7 L89.07,129.2 L82.6,153.51 L91.6,165.19 C92.3208264,166.138519 92.5813447,167.358978 92.310638,168.519149 C92.0399314,169.67932 91.2661764,170.658448 90.2,171.19 L71.44,180.42 C70.9074688,180.681816 70.3233558,180.821867 69.73,180.83 L57.34,181.01 L10,224.85 L27.65,246.37 L49.06,253.1 L75,258.76 L88.1,251.76 L99.28,242.89 C100.045878,242.268037 101.0146,241.951065 102,242 L126.21,243.35 C127.393112,243.403409 128.491733,243.978354 129.21,244.92 L134.42,251.76 L162.28,212.76 L162.36,173.83 C162.364005,171.894021 163.753892,170.238793 165.66,169.9 L200.33,163.73 L202.33,162.16 L201.81,155.24 C201.718431,154.037802 202.174011,152.858437 203.05,152.03 L206.6,148.68 C207.649934,147.689948 209.151758,147.342197 210.53,147.77 L246.58,159 L263.79,151.36 C264.656405,150.976147 265.630951,150.912358 266.54,151.18 L364.6,179.8 L365.23,178.26 L348.1,134.26 L327.52,124.18 C325.55339,123.215156 324.728664,120.84797 325.67,118.87 L344,80.38 C344.90714,78.4336947 347.189197,77.5508871 349.17,78.38 L357.71,81.98 L372.33,51.6 L364.46,48.65 C364.306091,48.5925 364.155815,48.5257105 364.01,48.45 L345.7,38.9 C344.701391,38.3796312 343.968372,37.4624489 343.680955,36.3736902 C343.393538,35.2849315 343.578348,34.1254553 344.19,33.18 L349.9,24.37 L332.8,13.49 L314.24,8.16 L301.3,9.25 L277.7,17.61 L278.87,27.81 C279.092667,29.7701597 277.852988,31.5999597 275.95,32.12 L248.42,39.67 L241.35,44.18 C240.716586,44.5850696 239.981832,44.8034165 239.23,44.81 L231.3,44.86 C230.32231,44.8553132 229.378643,44.5005511 228.64,43.86 L222.43,38.45 L153,24.88 L131.1,32.36 L113.3,68.74 L114.52,71.17 L205.92,60.44 C208.115332,60.1831876 210.103188,61.7546681 210.36,63.95 C210.616812,66.1453319 209.045332,68.1331876 206.85,68.39 L112.67,79.45 C111.012692,79.6277136 109.418897,78.7590956 108.67,77.27 L105.3,70.56 C104.746137,69.4414761 104.746137,68.1285239 105.3,67.01 L124.7,27.36 C125.172672,26.4159172 125.999429,25.6969985 127,25.36 L151.45,17 C152.112582,16.773859 152.822914,16.725584 153.51,16.86 L225.02,30.86 C225.709127,30.994816 226.350622,31.3086656 226.88,31.77 L232.75,36.89 L238.01,36.89 L244.62,32.67 C244.956746,32.4530057 245.32418,32.2878293 245.71,32.18 L270.52,25.38 L269.38,15.38 C269.158463,13.5287855 270.245249,11.7700173 272,11.14 L299.09,1.54 C299.412532,1.42413022 299.748618,1.35019127 300.09,1.32 L314.28,0.12 C314.764519,0.0787497144 315.2525,0.126192268 315.72,0.26 L335.57,6 C335.923471,6.10965129 336.260014,6.26782671 336.57,6.47 L357.57,19.82 C358.469973,20.3925133 359.10401,21.3007624 359.33122,22.3429232 C359.55843,23.385084 359.359991,24.4748277 358.78,25.37 L353.26,33.88 L367.46,41.29 L379.21,45.69 C380.261757,46.0843525 381.099239,46.9027568 381.517718,47.9451498 C381.936197,48.9875427 381.897105,50.1578558 381.41,51.17 L363.18,88.95 C362.254912,90.871686 359.984808,91.7295742 358.02,90.9 L349.5,87.31 L334.59,118.7 L353.02,127.7 C353.93326,128.134805 354.647884,128.899453 355.02,129.84 L373.3,176.84 C373.689201,177.802131 373.689201,178.877869 373.3,179.84 L370.68,186.18 C369.899066,188.067976 367.820832,189.063975 365.86,188.49 L265.7,159.23 L248.46,166.89 C247.574877,167.285289 246.576322,167.3457 245.65,167.06 L210.37,156.15 L209.9,156.59 L210.44,163.74 C210.541018,165.071633 209.970816,166.365842 208.92,167.19 L204.45,170.69 C203.93369,171.094462 203.325845,171.36576 202.68,171.48 L170.32,177.24 L170.25,214.11 C170.24753,214.94254 169.985346,215.753562 169.5,216.43 L139,259.1 C138.249071,260.147859 137.039148,260.769574 135.75,260.77 L133.22,260.77 C131.959212,260.783412 130.765901,260.20158 130,259.2 L123.93,251.2 L103.08,250.04 L92.81,258.19 C92.6220537,258.337665 92.4212504,258.468187 92.21,258.58 L77.49,266.47 C76.9197224,266.797726 76.2774281,266.979767 75.62,267 Z"
              id="road"
            />
          </g>
          <path
            d="M210,64.0511068 L118.040365,74.4765625 C110.224392,75.2746181 107.730035,72.2857639 110.557292,65.51 C114.798177,55.3463542 124.651615,28.9248616 135.54,25.9674479 C146.428385,23.0100342 149.87,20.0526205 165.775,23.0100342 C181.68,25.9674479 209.089844,30.9816667 218.826823,33.8958333 C228.563802,36.81 230.432292,40.29 242.178385,38.55 C253.924479,36.81 271.776042,30.3651205 274.398438,23.0100342 C277.020833,15.6549479 272.86875,13.0572917 282.109375,10.6067708 C291.35,8.15625 312.22526,1.51171875 325.292969,7.0703125 C338.360677,12.6289063 352.851563,17.6919434 352.851563,23.0100342 C352.851563,28.328125 345.77474,33.4046327 356.65625,39.7570039 C367.53776,46.109375 378.736979,46.528063 373.875,57.7041357 C369.013021,68.8802083 364.683594,80.2761431 360.643229,83.4219257 C356.602865,86.5677083 348.713542,77.4978176 342.518492,91.6575521 C336.323442,105.817287 331.947917,113.655411 331.947917,118.893229 C331.947917,124.131048 343.731771,125.358073 348.291667,130.652344 C352.851563,135.946615 367.643229,169.429688 367.643229,172.817708 C367.643229,176.205729 372.565104,187.690625 356.65625,183.070312 C340.747396,178.45 275.097656,155.869792 268.022135,155.869792 C260.946615,155.869792 252.782896,162.855469 247.51,162.855469 C243.994736,162.855469 233.384736,159.690972 215.68,153.361979 C209.542639,150.376736 206.473958,151.212674 206.473958,155.869792 C206.473958,162.855469 202.669271,167.376302 195.641927,169.178385 C188.614583,170.980469 165.775,172.159635 165.775,178.45 C165.775,184.740365 168.121094,209.292969 163.936198,216.428385 C159.751302,223.563802 139.38599,256.865885 133.747396,255.186198 C128.108802,253.50651 126.119792,244.057292 108.645833,246.64974 C91.171875,249.242187 82.71875,261.720052 76.9492188,261.720052 C71.1796875,261.720052 22.9778646,255.563802 17.5820313,241.795573 C12.1861979,228.027344 1.23046875,228.105613 9.40625,218.908854 C17.5820313,209.712095 54.1992187,176.294271 59.1888021,176.294271 C64.1783854,176.294271 73.1210938,176.457031 79.6627604,172.817708 C86.2044271,169.178385 90.5262044,167.92334 82.8893229,159.621094 C75.2524414,151.318848 84.5195312,126.79248 90.4192708,124.131048 C96.3190104,121.469615 107.861979,119.046712 127.794271,113.924479 C147.726562,108.802246 135.583171,109.577611 154.771973,117.186523 C173.960775,124.795436 167.307292,125.71582 187.884115,130.652344 C208.460938,135.588867 208.460938,138.197266 215.68,124.131048 C222.899062,110.06483 227.570729,89.8880208 237.540365,89.8880208 C247.51,89.8880208 270.690104,87.0338542 276.39974,87.0338542 C282.109375,87.0338542 296.822917,87.2369792 296.822917,80.8567708 C296.822917,74.4765625 297.736816,77 292.592285,73.4794922 C287.447754,69.9589844 289.820313,65.51 282.109375,65.51 C278.548559,65.51 274.342529,66.8800143 272.587891,66.5219727 C270.542864,66.104676 271.180678,63.8198593 270.075521,61.68 C268.022135,57.7041357 267.966268,58.3138607 248.496094,60.0302734"
            id="run-track"
            ref={track}
          />
          {chordsArr.length > 0 && (
            <path
              ref={link}
              id="link"
              d={`M${chordsArr.map(
                (choordinate) => `${choordinate.x},${choordinate.y}`
              )}`}
            />
          )}
          {chordsArr.map((choordinate, index) => (
            <circle
              className="choordinate"
              key={index}
              r="3"
              cx={choordinate.x}
              cy={choordinate.y}
            />
          ))}
        </g>
      </Svg>
      <div className="paragraph">
        The amount of data points{' '}
        <input
          type="range"
          min={minAccuracy}
          max={maxAccuracy}
          value={accuracy}
          onChange={onSliderChange}
        />{' '}
        influences the{' '}
        <ProgressBar dataWidth={showGpx ? 100 : lengthAccuracy}>
          accuracy
          <div />
        </ProgressBar>{' '}
        and <Battery dataWidth={battery} /> life.{' '}
        <label className="toggle-label inline-toggle">
          <div className="toggle">
            <input
              className="toggle-state"
              type="checkbox"
              checked={showGpx}
              readOnly={true}
              onClick={() => {
                toggleShowGpx();
              }}
            />
            <div className="toggle-inner">
              <div className="indicator" />
            </div>
            <div className="active-bg" />
          </div>
        </label>{' '}
        <span
          onClick={() => {
            toggleShowGpx();
          }}
          className={showGpx ? 'green' : 'red'}
        >
          Providing a gpx file
        </span>{' '}
        allows fewer data points while having high accuracy and long battery
        life at the same time.
      </div>
    </Wrapper>
  );
};

export default LocationConceptTest;
