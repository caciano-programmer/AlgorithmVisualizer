/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useLayoutEffect } from 'react';
import Chart from 'chart.js';

import css from './chart.module.css';

export default ({ array, algorithm, state, speed }) => {
  const canvasRef = React.useRef();
  const ctx = <canvas ref={canvasRef} className={css.canvas} />;
  useLayoutEffect(() => {
    const chart = new Chart(canvasRef.current.getContext('2d'), graphData(array));
    sort(chart, algorithm, array);
    return () => chart.destroy();
  });
  return <div className={css.chartParent}>{ctx}</div>;
};

function sort(chart, algorithm, array) {
  const steps = algorithm(array);
  const { data, backgroundColor } = chart.data.datasets[0];
  for (let i = 0; i < steps.length; i++) {
    setTimeout(() => {
      backgroundColor[steps[i][0]] = 'red';
      backgroundColor[steps[i][1]] = 'red';
      if (i > 0) {
        backgroundColor[steps[i - 1][0]] = 'rgba(255, 99, 132, 0.2)';
        backgroundColor[steps[i - 1][1]] = 'rgba(255, 99, 132, 0.2)';
      }
      [data[steps[i][0]], data[steps[i][1]]] = [data[steps[i][1]], data[steps[i][0]]];
      chart.update();
    }, i * 100);
  }
}

function generateValues(limit, value) {
  const array = [];
  for (let i = 0; i < limit; i++) array.push(value);
  return array;
}

function graphData(data) {
  const baseColor = 'rgba(255, 99, 132, 0.2)';
  const baseBorderColor = 'rgba(255, 99, 132, 1)';

  return {
    type: 'bar',
    data: {
      labels: generateValues(data.length, ''),
      datasets: [
        {
          label: 'Number Value',
          data,
          backgroundColor: generateValues(data.length, baseColor),
          borderColor: generateValues(data.length, baseBorderColor),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
}
