/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useLayoutEffect } from 'react';
import Chart from 'chart.js';
import { graphData, animations } from './utils';

import css from './chart.module.css';

export default ({ array, algorithm, state, speed }) => {
  const canvasRef = React.useRef();
  const ctx = <canvas ref={canvasRef} className={css.canvas} />;
  useLayoutEffect(() => {
    const chart = new Chart(canvasRef.current.getContext('2d'), graphData(array));
    animations(chart, algorithm, array);
    return () => chart.destroy();
  });
  return <div className={css.chartParent}>{ctx}</div>;
};
