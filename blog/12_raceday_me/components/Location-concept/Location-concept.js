/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

const Wrapper = styled.div`
  padding: 20px;
`;

const Interactive = styled.svg`
  width: 100%;
  path#run-track {
    fill: none;
    stroke: #ff0000;
    opacity: 0;
    stroke-width: 3;
  }
  path#link {
    fill: none;
    stroke: #000;
    stroke-width: 1;
    stroke-dasharray: 5;
    transition: all 0.5s ease;
  }
  circle.choordinate {
    transition: all 0.5s ease;
    fill: black;
  }
`;

let LocationConceptTest = () => {
  let minAccuracy = 2,
    maxAccuracy = 100,
    defaultAccuracy = 10,
    [accuracy, setAccuracy] = useState(defaultAccuracy),
    [LengthAccuracy, setLengthAccuracy] = useState(0),
    [trackLength, setTrackLength] = useState(null),
    [linkLength, setLinkLength] = useState(null),
    [chordsArr, setChordsArr] = useState([]),
    track = useRef(null),
    link = useRef(null);

  useEffect(() => {
    if (track.current) {
      setTrackLength(track.current.getTotalLength());
    }
  }, []);

  useLayoutEffect(() => {
    if (link.current) {
      window.requestAnimationFrame(() => {
        setLinkLength(link.current.getTotalLength());
      });
    }
  });

  useEffect(() => {
    setLengthAccuracy((linkLength / trackLength) * 100);
  }, [trackLength, linkLength]);

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

  return (
    <Wrapper>
      <Interactive
        // width="420px"
        // height="267px"
        viewBox="0 0 420 267"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>race-track</title>
        <desc>Created with Sketch.</desc>
        <g
          id="race-track"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="berlin-marathon" fillRule="nonzero">
            <path
              d="M140.21,80.46 C138.710212,79.6143932 137.149176,78.8823442 135.54,78.27 L207,69.88 C209.421176,69.5961759 211.366648,67.7524545 211.78,65.35 L246.33,61.68 C246.81,62.2 247.51,62.58 247.51,63.45 C247.51,64.78 247.22,70.28 247.14,71.74 C247.06,73.2 247.27,74.74 246.64,75.62 C245.247743,77.1402271 243.456322,78.2386422 241.47,78.79 C239.01,79.46 233.89,80.79 230.68,81.46 C227.47,82.13 221.93,83.75 219.31,84.34 C216.69,84.93 213.48,86.67 211.64,86.59 C209.8,86.51 197.52,86.8 195.81,86.84 C194.1,86.88 184.48,86.84 183.48,87.01 C182.170196,87.0765881 180.884563,87.3886681 179.69,87.93 C178.52,88.6 178.44,89.14 178.02,89.14 C177.6,89.14 170.85,86.47 170.44,86.47 C170.03,86.47 169.44,87.55 169.32,88.97 C169.215009,90.2999844 169.011112,91.6203027 168.71,92.92 C168.673566,93.084183 168.555478,93.21821 168.397191,93.275031 C168.238903,93.3318521 168.062535,93.3035273 167.93,93.2 C166.93,92.61 165.24,90.88 164.69,90.97 C163.692866,91.1495839 162.932264,91.9630623 162.82,92.97 C162.82,93.97 163.01,97.29 163.09,97.79 C163.17,98.29 163.91,100.47 163.24,100.89 C162.57,101.31 159.66,101.64 158.24,102.14 C156.82,102.64 156.49,104.22 156.24,104.6 C155.99,104.98 154.41,105.1 153.57,105.14 C152.73,105.18 150.99,105.22 150.82,104.81 C150.65,104.4 150.73,103.62 149.61,103.6 C148.77,103.6 145.28,104.2 144.36,104.1 C142.949076,103.601344 141.605479,102.929546 140.36,102.1 C139.67,101.65 137.94,100.48 137.94,99.39 C137.94,98.3 140.32,95.97 140.48,94.14 C140.64,92.31 139.67,92.05 139.65,91.14 C139.769261,89.0208015 140.073756,86.9161056 140.56,84.85 C141.21,82.38 140.81,81.06 140.21,80.46 Z M179.63,57 C178.523499,56.3172652 177.381929,55.6930734 176.21,55.13 C175.044667,54.4671442 173.815024,53.924359 172.54,53.51 C171.038653,53.5098368 169.568183,53.9364116 168.3,54.74 C167.19,55.44 165.71,58.38 165.37,59.22 C165.124142,60.1919989 164.789399,61.1393229 164.37,62.05 C163.46,63.54 158.29,63.95 157.06,63.98 C155.83,64.01 151.96,63.8 151.33,63.88 C150.94,63.93 150.33,64.73 149.87,65.51 L181.68,61.78 L180.68,61.21 C179.68,60.67 179.22,59.84 179.47,59.21 C179.72,58.58 180.08,57.33 179.63,57 Z M204.13,42.62 C203.62,43.19 203.71,44.91 204.2,45.74 C204.58,46.39 205.46,47.83 204.59,48.33 C203.72,48.83 199.26,50.87 197.88,51.5 C196.5,52.13 192.88,52.58 192.13,52.88 C191.025864,53.6086355 190.168234,54.6545251 189.67,55.88 C189.26,56.88 185.46,60.25 183.76,61.54 L205.76,58.96 C208.222559,58.6760865 210.571552,60.0715687 211.5,62.37 L246.6,58.64 C246.74131,57.7820608 247.084015,56.9698485 247.6,56.27 C247.42,55.47 247.04,54.47 246.54,54.47 C245.83,54.47 239.69,54.47 238.31,54.47 C236.93,54.47 231.56,54.73 231.56,54.02 C231.56,53.31 231.45,49.17 231.45,48.81 C231.407853,48.1897379 230.891691,47.7085697 230.27,47.71 C228.842268,47.724309 227.416556,47.8211371 226,48 C225.17,48.17 224.9,48.92 224.83,49.83 C224.76,50.74 223.74,53.05 222.61,53.13 C221.75,53.19 215.24,50.62 214.99,49.91 C214.74,49.2 212.99,46.41 212.99,45.99 C212.99,45.57 214.41,45.2 215.7,44.7 C216.99,44.2 221.2,41.91 221.83,41.53 C222.13916,41.2996291 222.423973,41.0382719 222.68,40.75 L221.68,39.9 L214.77,38.55 C213.60783,39.7991836 212.347101,40.952901 211,42 C210,42.54 204.95,41.71 204.13,42.62 Z M358.55,190.17 C358.187565,189.431751 358.028765,188.610135 358.09,187.79 L326.09,178.45 C326.28,178.99 326.47,179.5 326.58,179.88 C326.798293,181.023977 326.561492,182.20798 325.92,183.18 C325.59,183.8 323.32,186.94 322.92,188.05 C322.673944,189.131687 322.603042,190.245848 322.71,191.35 C322.71,192.18 322.42,194.61 322.26,196.35 C322.1,198.09 322.26,199.35 323.99,200.11 C325.72,200.87 346.17,207.79 348.69,208.82 C351.166354,209.685834 353.818297,209.926296 356.41,209.52 C358.97,209.27 358.41,206.71 358.41,205.93 C358.41,205.15 358.12,203.53 359.36,202.67 C360.6,201.81 362.62,201.35 362.71,200.56 C362.8,199.77 363.08,192.67 362.21,191.72 C361.34,190.77 359.09,190.83 358.55,190.17 Z"
              id="parks"
              fill="#C0ECAE"
            />
            <path
              d="M418.08,191.91 C417.38,191.91 416.61,191.26 415.14,190.01 L414.82,189.74 C412.424819,187.825873 410.150467,185.765263 408.01,183.57 C407.06,182.34 405.12,178.82 404.9,176.23 C404.661334,174.070566 404.250018,171.933728 403.67,169.84 C403.6,169.73 403.32,169.37 403.06,169.05 C400.95,168.27 396.4,165.84 396.35,165.81 C395.63,165.41 390.66,162.81 387.02,160.81 L383.24,158.81 L380.68,157.5 C377.68,155.98 373.61,153.89 372.1,153 C370.01,151.76 364.35,148.85 362.49,147.94 C360.225093,146.78436 357.76807,146.052336 355.24,145.78 C353.856632,145.639942 352.463087,145.918651 351.24,146.58 L350.79,146.82 C349.377628,147.642102 347.87412,148.29653 346.31,148.77 C344.281628,149.187235 342.206638,149.331845 340.14,149.2 L338.6,149.2 C336.86596,149.127701 335.150003,148.818156 333.5,148.28 C332.556497,147.998336 331.598426,147.767998 330.63,147.59 C328.115933,147.030394 325.64865,146.278174 323.25,145.34 C322.49,145.07 321.85,144.84 321.44,144.71 C319.444465,144.080134 317.396157,143.631649 315.32,143.37 C313.21,143.2 308.06,142.37 305.47,141.79 C303.60912,141.321452 301.805062,140.650798 300.09,139.79 C299.3,139.42 298.56,139.08 297.97,138.87 C296.452779,138.269794 294.831303,137.977453 293.2,138.01 C292.374767,138.085686 291.560076,138.249965 290.77,138.5 C289.392556,138.906685 287.979509,139.181258 286.55,139.32 C283.870239,139.58007 281.165818,139.38738 278.55,138.75 C277.98,138.59 277.28,138.43 276.55,138.26 C275.048681,137.963006 273.573865,137.544974 272.14,137.01 C271.48,136.74 270.74,136.36 269.94,136.01 C268.639445,135.275904 267.256465,134.698544 265.82,134.29 C264.57,134.07 261.38,134 259.05,133.95 C258.05,133.95 257.15,133.95 256.57,133.88 C254.17,133.77 252.69,133.28 249.74,130.53 C247.884376,128.794738 246.627367,126.515315 246.15,124.02 C246.1,123.81 246.06,123.62 246.01,123.48 C245.771443,122.81502 245.404486,122.203423 244.93,121.68 L244.16,120.63 C243.31853,119.579078 242.351305,118.635362 241.28,117.82 C240.75,117.38 240.28,116.96 239.78,116.53 C238.454986,115.369309 237.385702,113.945868 236.64,112.35 C235.95677,111.048774 234.997791,109.912332 233.83,109.02 C232.689405,108.133579 231.497319,107.31548 230.26,106.57 L229.13,105.84 C227.898729,105.082509 226.545301,104.544522 225.13,104.25 C224.21474,104.178194 223.29526,104.178194 222.38,104.25 C221.76,104.25 221.11,104.25 220.38,104.25 C218.869084,104.213887 217.36431,104.454516 215.94,104.96 C214.1936,105.493246 212.375924,105.756286 210.55,105.74 C209.194699,105.684353 207.851338,105.462698 206.55,105.08 C204.26242,104.293121 202.055637,103.288516 199.96,102.08 C198.695457,101.555085 197.304737,101.412536 195.96,101.67 C194.736846,102.114508 193.555547,102.666673 192.43,103.32 C191.57,103.78 190.82,104.17 190.27,104.4 C188.584913,105.133778 186.79764,105.605888 184.97,105.8 C183.65,105.8 182.24,104.88 180.56,103.63 C180.25,103.4 179.98,103.2 179.78,103.07 C178.78,102.46 176.39,100.74 175.78,100.3 C174.241418,99.2872321 172.652733,98.3527116 171.02,97.5 C169.432317,96.644331 167.896332,95.6960271 166.42,94.66 L165.77,94.23 L164.77,93.53 C163.998798,92.9468708 163.182952,92.4252643 162.33,91.97 L160.97,91.46 C159.89,91.06 158.56,90.57 157.73,90.22 C156.25,89.61 149.37,85.16 148.56,84.56 C148.151158,84.2456355 147.781813,83.8830056 147.46,83.48 C147.03,82.97 146.8,82.72 146.36,82.61 C145.7,82.44 144.61,82.12 143.36,81.75 C141.89,81.31 140.22,80.82 138.8,80.45 C136.814754,79.8349753 134.900632,79.0103275 133.09,77.99 C132.52,77.69 132.09,77.44 131.71,77.3 C131.029195,77.0163009 130.472319,76.4984417 130.14,75.84 L130.14,75.84 C130.105734,75.7787766 130.075665,75.7152972 130.05,75.65 C129.750866,74.879945 129.581894,74.065499 129.55,73.24 L129.55,72.82 C129.46,72.37 128.22,71.4 127.82,71.09 L127.48,70.82 L126.98,70.44 C125.059406,69.1075375 123.370326,67.4691298 121.98,65.59 C119.887426,62.8543114 117.551203,60.3139191 115,58 C113.20822,56.862696 111.35544,55.8244716 109.45,54.89 L108,54.1 C105.905125,52.8143148 103.948147,51.316422 102.16,49.63 C100.432902,48.1249161 98.5680161,46.7856803 96.59,45.63 C95.3732446,45.5041688 94.1467554,45.5041688 92.93,45.63 C92.2,45.63 91.54,45.71 91.05,45.71 C89.7187636,45.6295144 88.4214895,45.2574016 87.25,44.62 C86.79,44.41 86.32,44.2 85.8,44 C84.43,43.47 81.4,43.62 79.59,43.7 L79,43.7 C76.93,43.79 70.37,43.88 70.09,43.88 C69.2615729,43.88 68.59,43.2084271 68.59,42.38 C68.59,41.5515729 69.2615729,40.88 70.09,40.88 C70.16,40.88 76.88,40.79 78.9,40.7 L79.47,40.7 C81.78,40.59 84.94,40.44 86.9,41.19 C87.48,41.41 88.01,41.65 88.51,41.88 C89.303524,42.3217239 90.1772807,42.6005101 91.08,42.7 C91.52,42.7 92.08,42.7 92.77,42.62 C93.46,42.54 94.19,42.54 94.77,42.52 C94.8663874,42.2849023 95.0212947,42.0783592 95.22,41.92 C96.2023883,41.070003 96.900444,39.9391527 97.22,38.68 C97.38,37.9 97.47,36.93 97.57,35.91 C97.6855554,33.7375853 98.1690923,31.600555 99,29.59 C100.38,26.76 106.26,22.18 113.06,23.14 C120.06,24.14 129.63,32.57 129.91,39.88 C129.925517,41.4459062 129.767894,43.0087297 129.44,44.54 C129.171379,45.8240499 129.014128,47.1288958 128.97,48.44 C129.28,50.15 130.22,53.09 131.53,54.04 C134.69,56.32 138.41,58.04 142,53.74 C145.55,49.18 149.48,43.85 149.86,42.91 C149.985325,42.412031 150.085453,41.9080573 150.16,41.4 C150.359386,39.591851 150.898861,37.8377066 151.75,36.23 C152.764004,34.4498732 154.381496,33.0913223 156.31,32.4 C157.990954,31.8250873 159.75351,31.5245749 161.53,31.51 C163.91,31.51 168.29,31.95 170.64,33.18 C173.256624,34.7996661 175.616094,36.801845 177.64,39.12 C178.43,40.05 179.72,41.64 180.97,43.18 C182.08,44.56 183.14,45.86 183.64,46.44 C184.79,47.76 190.58,53.13 192.51,53.96 C194.31866,54.7589658 196.327494,54.9891447 198.27,54.62 C200.500842,53.9868331 202.614742,52.9974198 204.53,51.69 C206.847565,49.6284289 209.329092,47.7589227 211.95,46.1 C212.79,45.64 214.29,45.04 215.88,44.41 C217.38854,43.8585885 218.861375,43.2140143 220.29,42.48 C221.95,41.48 224.09,39.39 224.45,38.48 L224.7,37.84 C225.33,36.21 226.19,33.97 228.06,32.84 L228.55,32.54 C230,31.64 231.37,30.79 235.27,30.63 C238.963176,30.4985134 242.475581,32.2302979 244.62,35.24 C245.959904,36.9477606 246.90272,38.9324557 247.38,41.05 C247.77,42.76 248.12,44.05 249.06,44.99 C250.416333,46.2609666 252.201299,46.9749533 254.06,46.99 C256.721938,46.901612 259.333981,46.2434864 261.72,45.06 C264.792791,43.3688067 267.641635,41.2993634 270.2,38.9 L270.81,38.21 C272.31,36.51 274.02,34.58 276.34,33.96 C279.470264,33.3723702 282.662836,33.1875371 285.84,33.41 L286.95,33.49 L287.03,33.49 C291.03,33.76 295.35,34.1 297.26,34.84 L298.26,35.2 C301.172379,36.1293442 303.885564,37.5944643 306.26,39.52 C308.76,41.67 310.8,45.43 312.26,48.17 C312.68,48.95 313.05,49.62 313.35,50.12 L314.01,51.2 C315.895915,54.4215529 317.948708,57.5424657 320.16,60.55 C322.16,62.97 325.16,64.8 327.46,65 C328.46,65.08 329.61,65.24 330.88,65.4 C333.165299,65.7695113 335.475138,65.9667334 337.79,65.99 L337.85,65.99 C338.59,65.99 339.49,65.83 340.45,65.7 C342.93,65.38 345.45,65.05 347.24,65.54 C349.57,66.19 357.81,70.69 360.06,72.14 C362.55,73.74 372.15,81.14 374.92,83.63 C377.69,86.12 384.99,92.27 386.62,93.44 C387.48,94.06 390.25,96.44 393.45,99.14 C396.65,101.84 400.63,105.26 401.45,105.83 C402.05,106.23 403.32,107.11 404.81,108.14 C407.55,110.04 411.3,112.63 412.69,113.49 C413.584793,114.072771 414.439998,114.714175 415.25,115.41 C416.1683,116.301262 417.251948,117.004444 418.44,117.48 C419.251859,117.648447 419.773447,118.443141 419.605,119.255 C419.436553,120.066859 418.641859,120.588447 417.83,120.42 C416.148983,119.881304 414.61558,118.960577 413.35,117.73 C412.639763,117.123005 411.891582,116.561869 411.11,116.05 C409.65,115.15 406.02,112.64 403.11,110.61 C401.64,109.61 400.39,108.73 399.8,108.33 C398.86,107.7 395.89,105.19 391.47,101.42 C388.58,98.96 385.6,96.42 384.84,95.88 C382.99,94.56 375.61,88.35 372.84,85.88 C370.07,83.41 360.73,76.21 358.37,74.7 C356.01,73.19 348.12,68.96 346.37,68.47 C345.22,68.15 342.75,68.47 340.77,68.72 C339.86,68.84 339,68.95 338.24,69.01 C337.174618,69.8018665 336.171665,70.6744355 335.24,71.62 C333.727006,73.1562669 332.080535,74.5550976 330.32,75.8 L327.82,77.37 L325.4,78.89 C325.26,78.98 325.09,79.11 324.9,79.27 C323.239401,80.7371858 321.115162,81.5727201 318.9,81.63 L317.5,81.63 C315.58,81.63 314.5,81.63 313.61,80.76 C311.556987,77.9757181 309.705604,75.0482596 308.07,72 C307.51,70.88 306.3,68.19 305.14,65.59 C304.08,63.22 302.98,60.77 302.67,60.2 C302.18,59.28 300.92,56.13 299.57,52.72 C299.22,51.83 298.93,51.1 298.78,50.72 L298.54,50.13 C298.198502,49.1216607 297.72434,48.163249 297.13,47.28 L297,47.2 C295.54964,46.2843528 294.281557,45.1078153 293.26,43.73 C292.45,42.48 287.97,37.57 287.38,36.98 C287.138413,36.7762128 286.869044,36.607857 286.58,36.48 L285.66,36.42 C282.818905,36.2243265 279.964553,36.3754393 277.16,36.87 C275.71,37.26 274.38,38.76 273.1,40.21 L272.46,40.92 C269.651017,43.5976837 266.504418,45.8971213 263.1,47.76 C260.298246,49.151332 257.227064,49.9157151 254.1,50 C251.441969,49.9941178 248.887071,48.9707273 246.96,47.14 C245.45,45.63 244.96,43.81 244.47,41.74 C244.084732,40.0283837 243.319145,38.4254361 242.23,37.05 C240.66718,34.8552682 238.113226,33.5839167 235.42,33.66 C232.31,33.79 231.42,34.32 230.15,35.13 L229.63,35.45 C228.63,36.04 228,37.72 227.52,38.95 L227.24,39.65 C226.41,41.65 223.24,44.18 221.9,45.01 C220.321728,45.8574364 218.684103,46.5893543 217,47.2 C215.57,47.77 214.08,48.36 213.41,48.73 C211.035627,50.2514295 208.779242,51.9495679 206.66,53.81 C205.39,55.08 201.03,57.09 198.92,57.55 C196.366624,58.0454198 193.722952,57.7524536 191.34,56.71 C188.66,55.56 182.5,49.71 181.34,48.4 C180.8,47.78 179.73,46.46 178.6,45.06 C177.47,43.66 176.1,41.96 175.33,41.06 C173.5445,39.0314754 171.476689,37.2701314 169.19,35.83 C167.59,35 164.01,34.5 161.47,34.5 C160.03095,34.5165 158.603471,34.7594751 157.24,35.22 C155.963127,35.6821277 154.897213,36.5917079 154.24,37.78 C153.600058,39.0682413 153.193761,40.4598081 153.04,41.89 C152.946053,42.5375773 152.812469,43.1787816 152.64,43.81 C152.17,45.35 146.64,52.57 144.26,55.61 C140.34,60.34 135.45,60.61 129.7,56.47 C126.91,54.47 126,49.38 125.91,48.81 C125.903674,48.730125 125.903674,48.649875 125.91,48.57 C125.939791,47.0408819 126.110514,45.5177677 126.42,44.02 C126.707221,42.7060843 126.851394,41.3649417 126.85,40.02 C126.66,35.08 119.25,27.02 112.58,26.14 C107.36,25.41 102.58,28.93 101.64,30.94 C101.028768,32.6496555 100.69128,34.4450903 100.64,36.26 C100.53,37.36 100.43,38.4 100.25,39.33 C99.9373055,40.7430721 99.2774268,42.0559557 98.33,43.15 C100.413333,44.4085048 102.386974,45.8402311 104.23,47.43 C105.834384,48.9546943 107.590142,50.3117207 109.47,51.48 L110.88,52.22 C112.955502,53.2258845 114.960134,54.3718661 116.88,55.65 C119.646814,58.1352748 122.171471,60.8775742 124.42,63.84 C125.635728,65.4525742 127.104773,66.8574544 128.77,68 L129.38,68.46 L129.68,68.7 C130.75,69.54 132.38,70.81 132.55,72.49 L132.55,72.97 C132.55,73.25 132.61,73.65 132.67,73.97 L132.73,73.97 C133.028624,73.9885669 133.325841,74.0253016 133.62,74.08 C133.76,74.08 134.46,73.92 134.97,73.8 C135.846287,73.5846278 136.734489,73.4210116 137.63,73.31 C139.043568,73.00736 140.515838,73.1434228 141.85,73.7 C143.102463,74.2657862 144.262226,75.0176091 145.29,75.93 C146.468709,76.9209584 147.514075,78.0604409 148.4,79.32 C148.62,79.77 148.92,80.41 149.08,80.79 C149.320273,81.0238089 149.547293,81.2708606 149.76,81.53 C149.931342,81.7531657 150.125751,81.9576308 150.34,82.14 C151.34,82.9 157.85,87.01 158.89,87.44 C159.7,87.77 160.98,88.25 162.03,88.64 L163.43,89.16 C164.521345,89.6819416 165.553861,90.318883 166.51,91.06 L167.45,91.71 L168.12,92.15 C169.28,92.92 171.44,94.36 172.31,94.77 C174.125803,95.7088705 175.888476,96.7471119 177.59,97.88 C178.13,98.28 180.53,99.98 181.4,100.53 C181.65,100.69 181.98,100.93 182.4,101.21 C183.180749,101.856312 184.049446,102.388305 184.98,102.79 C186.421328,102.603689 187.828786,102.213103 189.16,101.63 C189.59,101.45 190.31,101.07 191.08,100.63 C192.465693,99.7644674 193.962774,99.0916218 195.53,98.63 C197.559475,98.254853 199.655314,98.5168329 201.53,99.38 C203.354356,100.452692 205.276285,101.350039 207.27,102.06 C208.37277,102.391371 209.510486,102.592737 210.66,102.66 C212.152506,102.671549 213.638535,102.462629 215.07,102.04 C216.809498,101.425834 218.645674,101.131098 220.49,101.17 C221.13,101.17 221.75,101.17 222.33,101.17 C223.416456,101.099792 224.506864,101.119861 225.59,101.23 C227.445917,101.586667 229.219371,102.285198 230.82,103.29 L231.89,103.98 C233.249057,104.800162 234.554987,105.705295 235.8,106.69 C237.263047,107.831312 238.463523,109.27393 239.32,110.92 C239.908529,112.211098 240.76798,113.360444 241.84,114.29 C242.26,114.68 242.73,115.07 243.21,115.47 C244.480882,116.445495 245.62328,117.577813 246.61,118.84 L247.35,119.84 C248.033731,120.63526 248.556722,121.555589 248.89,122.55 C248.95,122.75 249.01,123 249.08,123.28 C249.42188,125.197035 250.376297,126.951477 251.8,128.28 C254.31,130.62 255.17,130.76 256.72,130.83 C257.28,130.83 258.14,130.83 259.12,130.9 C261.535112,130.895285 263.948688,131.022139 266.35,131.28 C268.097687,131.722901 269.778985,132.39542 271.35,133.28 C272.09,133.65 272.8,134.01 273.35,134.28 C274.626547,134.744052 275.937138,135.108476 277.27,135.37 C278.06,135.55 278.81,135.72 279.43,135.9 C281.684796,136.437465 284.013768,136.592955 286.32,136.36 C287.570388,136.234378 288.805968,135.989941 290.01,135.63 C291.020453,135.314089 292.064054,135.116107 293.12,135.04 C295.130525,134.975022 297.13358,135.3151 299.01,136.04 C299.72,136.3 300.52,136.67 301.37,137.04 C302.88501,137.809297 304.477219,138.416013 306.12,138.85 C308.82,139.43 313.77,140.23 315.57,140.37 C317.873709,140.645065 320.146836,141.133837 322.36,141.83 C322.79,141.97 323.47,142.21 324.28,142.5 C326.509529,143.367411 328.798824,144.072581 331.13,144.61 C332.206394,144.804984 333.271318,145.058696 334.32,145.37 C335.711048,145.829583 337.157078,146.101974 338.62,146.18 L340.23,146.18 C342.013477,146.292453 343.804016,146.181594 345.56,145.85 C346.90466,145.438229 348.196718,144.871066 349.41,144.16 L349.89,143.9 C351.578673,142.997006 353.491109,142.597859 355.4,142.75 C358.349045,143.040167 361.218102,143.877823 363.86,145.22 C365.8,146.22 371.48,149.09 373.68,150.39 C375.11,151.24 379.31,153.39 382.09,154.8 L384.7,156.14 L388.46,158.14 C392.11,160.07 397.1,162.72 397.84,163.14 C398.89,163.72 402.44,165.48 403.84,166.09 C404.56,165.51 405.94,164.24 406.9,163.27 C407.64,162.53 412.9,156.22 413.56,155.27 L417.2,150.5 L419.59,152.32 L415.94,157.11 C415.4,157.82 409.94,164.43 409.02,165.35 C407.76,166.61 406.85,167.45 406.16,168.02 C406.24,168.14 406.31,168.25 406.37,168.36 C407.155185,170.804258 407.678128,173.325108 407.93,175.88 C408.353322,177.948272 409.201193,179.906208 410.42,181.63 C411.1,182.52 415.09,185.9 416.8,187.34 L417.12,187.61 C418.12,188.45 418.53,188.77 418.69,188.89 C419.18556,189.107697 419.525402,189.575491 419.57926,190.114074 C419.633118,190.652657 419.392639,191.178483 418.95,191.49 C418.718,191.727378 418.410174,191.875983 418.08,191.91 Z M136.83,76.48 C137.730817,76.9165446 138.667626,77.2745393 139.63,77.55 C141.01,77.91 142.63,78.38 144.01,78.8 L143.34,78.18 C142.546819,77.4784649 141.653717,76.8987909 140.69,76.46 C140.05,76.18 139.81,76.11 137.99,76.31 C137.6,76.34 137.21,76.4 136.83,76.48 Z M315.69,78.57 C316.276061,78.6076951 316.863939,78.6076951 317.45,78.57 L319.08,78.57 C320.613719,78.5028067 322.073769,77.8932712 323.2,76.85 C323.48,76.63 323.73,76.44 323.94,76.31 L326.38,74.78 L328.85,73.23 C330.446051,72.0862668 331.941487,70.8082878 333.32,69.41 L333.97,68.8 C332.85,68.68 331.68,68.53 330.58,68.39 C329.48,68.25 328.18,68.08 327.29,68 C324.11,67.72 320.44,65.54 317.92,62.45 C315.619867,59.341068 313.490072,56.1096541 311.54,52.77 L310.89,51.7 C310.56,51.17 310.17,50.45 309.72,49.61 C308.41,47.21 306.44,43.61 304.36,41.8 C302.245036,40.0994518 299.829981,38.810518 297.24,38 L296.24,37.62 C294.642232,37.1823731 293.003539,36.910933 291.35,36.81 C292.921864,38.4836828 294.403942,40.2394774 295.79,42.07 C296.606617,43.1128471 297.597987,44.0060951 298.72,44.71 L298.89,44.83 C299.89,45.54 300.55,47.01 301.35,49.01 L301.58,49.57 C301.73,49.94 302.03,50.68 302.39,51.57 C303.27,53.78 304.9,57.9 305.39,58.75 C305.74,59.41 306.76,61.69 307.95,64.32 C309.14,66.95 310.29,69.55 310.83,70.61 C312.297291,73.3503839 313.919935,76.0047081 315.69,78.56 L315.69,78.57 Z"
              id="lake"
              fill="#259CE2"
            />
            <path
              d="M75.62,267 C75.3342654,267.000445 75.0493056,266.970273 74.77,266.91 L47.21,260.91 L46.86,260.82 L24.14,253.68 C23.3990472,253.445965 22.7423015,253.001184 22.25,252.4 L1.45,227 C0.110461609,225.362994 0.276976193,222.96606 1.83,221.53 L53.08,174.13 C53.8054885,173.460536 54.7529101,173.082992 55.74,173.07 L68.74,172.88 L82.3,166.21 L75.07,156.84 C74.3097008,155.855147 74.0509707,154.572585 74.37,153.37 L82,124.9 C82.3683382,123.512229 83.4522289,122.428338 84.84,122.06 L115.29,114.06 L137.53,106.18 C137.947603,106.031859 138.386919,105.954134 138.83,105.95 L143.36,105.95 C144.138552,105.954793 144.90037,106.176413 145.56,106.59 L162.84,117.73 L207.72,131.73 L228.59,89.35 C229.200834,88.1123083 230.406596,87.2769686 231.78,87.14 L293.43,80.95 L293.21,77.71 L288.77,77.93 C286.643189,78.0367688 284.805594,76.4585475 284.59,74.34 L284.15,69.95 L271.39,71.32 C270.334327,71.4319631 269.277445,71.1196835 268.452152,70.4519465 C267.626859,69.7842095 267.100855,68.8157899 266.99,67.76 L266.4,62.21 L252.47,63.69 C250.260861,63.924721 248.279721,62.324139 248.045,60.115 C247.810279,57.905861 249.410861,55.924721 251.62,55.69 L269.53,53.79 C270.585673,53.6780369 271.642555,53.9903165 272.467848,54.6580535 C273.293141,55.3257905 273.819145,56.2942101 273.93,57.35 L274.51,62.9 L287.29,61.53 C289.446156,61.3118722 291.383856,62.8505037 291.66,65 L292.12,69.61 L296.68,69.38 C298.856925,69.2713092 300.720137,70.9255211 300.87,73.1 L301.63,84.1 C301.803243,86.2860418 300.18412,88.2040111 298,88.4 L234.7,94.75 L213.3,138.21 C212.42901,139.977323 210.400765,140.847177 208.52,140.26 L159.9,125.12 C159.547061,125.013482 159.210543,124.858683 158.9,124.66 L142.17,113.88 L139.51,113.88 L117.75,121.6 L117.44,121.7 L89.07,129.2 L82.6,153.51 L91.6,165.19 C92.3208264,166.138519 92.5813447,167.358978 92.310638,168.519149 C92.0399314,169.67932 91.2661764,170.658448 90.2,171.19 L71.44,180.42 C70.9074688,180.681816 70.3233558,180.821867 69.73,180.83 L57.34,181.01 L10,224.85 L27.65,246.37 L49.06,253.1 L75,258.76 L88.1,251.76 L99.28,242.89 C100.045878,242.268037 101.0146,241.951065 102,242 L126.21,243.35 C127.393112,243.403409 128.491733,243.978354 129.21,244.92 L134.42,251.76 L162.28,212.76 L162.36,173.83 C162.364005,171.894021 163.753892,170.238793 165.66,169.9 L200.33,163.73 L202.33,162.16 L201.81,155.24 C201.718431,154.037802 202.174011,152.858437 203.05,152.03 L206.6,148.68 C207.649934,147.689948 209.151758,147.342197 210.53,147.77 L246.58,159 L263.79,151.36 C264.656405,150.976147 265.630951,150.912358 266.54,151.18 L364.6,179.8 L365.23,178.26 L348.1,134.26 L327.52,124.18 C325.55339,123.215156 324.728664,120.84797 325.67,118.87 L344,80.38 C344.90714,78.4336947 347.189197,77.5508871 349.17,78.38 L357.71,81.98 L372.33,51.6 L364.46,48.65 C364.306091,48.5925 364.155815,48.5257105 364.01,48.45 L345.7,38.9 C344.701391,38.3796312 343.968372,37.4624489 343.680955,36.3736902 C343.393538,35.2849315 343.578348,34.1254553 344.19,33.18 L349.9,24.37 L332.8,13.49 L314.24,8.16 L301.3,9.25 L277.7,17.61 L278.87,27.81 C279.092667,29.7701597 277.852988,31.5999597 275.95,32.12 L248.42,39.67 L241.35,44.18 C240.716586,44.5850696 239.981832,44.8034165 239.23,44.81 L231.3,44.86 C230.32231,44.8553132 229.378643,44.5005511 228.64,43.86 L222.43,38.45 L153,24.88 L131.1,32.36 L113.3,68.74 L114.52,71.17 L205.92,60.44 C208.115332,60.1831876 210.103188,61.7546681 210.36,63.95 C210.616812,66.1453319 209.045332,68.1331876 206.85,68.39 L112.67,79.45 C111.012692,79.6277136 109.418897,78.7590956 108.67,77.27 L105.3,70.56 C104.746137,69.4414761 104.746137,68.1285239 105.3,67.01 L124.7,27.36 C125.172672,26.4159172 125.999429,25.6969985 127,25.36 L151.45,17 C152.112582,16.773859 152.822914,16.725584 153.51,16.86 L225.02,30.86 C225.709127,30.994816 226.350622,31.3086656 226.88,31.77 L232.75,36.89 L238.01,36.89 L244.62,32.67 C244.956746,32.4530057 245.32418,32.2878293 245.71,32.18 L270.52,25.38 L269.38,15.38 C269.158463,13.5287855 270.245249,11.7700173 272,11.14 L299.09,1.54 C299.412532,1.42413022 299.748618,1.35019127 300.09,1.32 L314.28,0.12 C314.764519,0.0787497144 315.2525,0.126192268 315.72,0.26 L335.57,6 C335.923471,6.10965129 336.260014,6.26782671 336.57,6.47 L357.57,19.82 C358.469973,20.3925133 359.10401,21.3007624 359.33122,22.3429232 C359.55843,23.385084 359.359991,24.4748277 358.78,25.37 L353.26,33.88 L367.46,41.29 L379.21,45.69 C380.261757,46.0843525 381.099239,46.9027568 381.517718,47.9451498 C381.936197,48.9875427 381.897105,50.1578558 381.41,51.17 L363.18,88.95 C362.254912,90.871686 359.984808,91.7295742 358.02,90.9 L349.5,87.31 L334.59,118.7 L353.02,127.7 C353.93326,128.134805 354.647884,128.899453 355.02,129.84 L373.3,176.84 C373.689201,177.802131 373.689201,178.877869 373.3,179.84 L370.68,186.18 C369.899066,188.067976 367.820832,189.063975 365.86,188.49 L265.7,159.23 L248.46,166.89 C247.574877,167.285289 246.576322,167.3457 245.65,167.06 L210.37,156.15 L209.9,156.59 L210.44,163.74 C210.541018,165.071633 209.970816,166.365842 208.92,167.19 L204.45,170.69 C203.93369,171.094462 203.325845,171.36576 202.68,171.48 L170.32,177.24 L170.25,214.11 C170.24753,214.94254 169.985346,215.753562 169.5,216.43 L139,259.1 C138.249071,260.147859 137.039148,260.769574 135.75,260.77 L133.22,260.77 C131.959212,260.783412 130.765901,260.20158 130,259.2 L123.93,251.2 L103.08,250.04 L92.81,258.19 C92.6220537,258.337665 92.4212504,258.468187 92.21,258.58 L77.49,266.47 C76.9197224,266.797726 76.2774281,266.979767 75.62,267 Z"
              id="road"
              fill="#F2F1F0"
            />
          </g>
          <path
            d="M210,64.0511068 L118.040365,74.4765625 C110.224392,75.2746181 107.730035,72.2857639 110.557292,65.51 C114.798177,55.3463542 124.651615,28.9248616 135.54,25.9674479 C146.428385,23.0100342 149.87,20.0526205 165.775,23.0100342 C181.68,25.9674479 209.089844,30.9816667 218.826823,33.8958333 C228.563802,36.81 230.432292,40.29 242.178385,38.55 C253.924479,36.81 271.776042,30.3651205 274.398438,23.0100342 C277.020833,15.6549479 272.86875,13.0572917 282.109375,10.6067708 C291.35,8.15625 312.22526,1.51171875 325.292969,7.0703125 C338.360677,12.6289063 352.851563,17.6919434 352.851563,23.0100342 C352.851563,28.328125 345.77474,33.4046327 356.65625,39.7570039 C367.53776,46.109375 378.736979,46.528063 373.875,57.7041357 C369.013021,68.8802083 364.683594,80.2761431 360.643229,83.4219257 C356.602865,86.5677083 348.713542,77.4978176 342.518492,91.6575521 C336.323442,105.817287 331.947917,113.655411 331.947917,118.893229 C331.947917,124.131048 343.731771,125.358073 348.291667,130.652344 C352.851563,135.946615 367.643229,169.429688 367.643229,172.817708 C367.643229,176.205729 372.565104,187.690625 356.65625,183.070312 C340.747396,178.45 275.097656,155.869792 268.022135,155.869792 C260.946615,155.869792 252.782896,162.855469 247.51,162.855469 C243.994736,162.855469 233.384736,159.690972 215.68,153.361979 C209.542639,150.376736 206.473958,151.212674 206.473958,155.869792 C206.473958,162.855469 202.669271,167.376302 195.641927,169.178385 C188.614583,170.980469 165.775,172.159635 165.775,178.45 C165.775,184.740365 168.121094,209.292969 163.936198,216.428385 C159.751302,223.563802 139.38599,256.865885 133.747396,255.186198 C128.108802,253.50651 126.119792,244.057292 108.645833,246.64974 C91.171875,249.242187 82.71875,261.720052 76.9492188,261.720052 C71.1796875,261.720052 22.9778646,255.563802 17.5820313,241.795573 C12.1861979,228.027344 1.23046875,228.105613 9.40625,218.908854 C17.5820313,209.712095 54.1992187,176.294271 59.1888021,176.294271 C64.1783854,176.294271 73.1210938,176.457031 79.6627604,172.817708 C86.2044271,169.178385 90.5262044,167.92334 82.8893229,159.621094 C75.2524414,151.318848 84.5195312,126.79248 90.4192708,124.131048 C96.3190104,121.469615 107.861979,119.046712 127.794271,113.924479 C147.726562,108.802246 135.583171,109.577611 154.771973,117.186523 C173.960775,124.795436 167.307292,125.71582 187.884115,130.652344 C208.460938,135.588867 208.460938,138.197266 215.68,124.131048 C222.899062,110.06483 227.570729,89.8880208 237.540365,89.8880208 C247.51,89.8880208 270.690104,87.0338542 276.39974,87.0338542 C282.109375,87.0338542 296.822917,87.2369792 296.822917,80.8567708 C296.822917,74.4765625 297.736816,77 292.592285,73.4794922 C287.447754,69.9589844 289.820313,65.51 282.109375,65.51 C278.548559,65.51 274.342529,66.8800143 272.587891,66.5219727 C270.542864,66.104676 271.180678,63.8198593 270.075521,61.68 C268.022135,57.7041357 267.966268,58.3138607 248.496094,60.0302734"
            id="run-track"
            ref={track}
            stroke="#979797"
            strokeLinecap="round"
          />
          {chordsArr.map((choordinate, index) => {
            return (
              <circle
                className="choordinate"
                key={index}
                r="3"
                cx={choordinate.x}
                cy={choordinate.y}
              />
            );
          })}
          {chordsArr.length > 0 && (
            <path
              ref={link}
              id="link"
              d={`M${chordsArr.map(
                choordinate => `${choordinate.x},${choordinate.y}`
              )}`}
              strokeWidth="1"
            />
          )}
        </g>
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
      trackLength: {trackLength}
      <br />
      linkLength: {linkLength}
      <br />
      LengthAccuracy: {LengthAccuracy}
    </Wrapper>
  );
};

export default LocationConceptTest;
