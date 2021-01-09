/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { animations } from './utils';
import { STATES } from '../../sort/AppConstants';

import css from './chart.module.css';

const Chart = ({ config, setConfig, algorithm, state, speed, setState }) => {
  console.log(config.data.datasets[0].data);
  let ids = [];
  useEffect(() => {
    if (state === STATES.GO) {
      ids = animations(config, setConfig, algorithm.func.bind(null, config.data.datasets[0].data), speed, setState);
    }
    return function cleanup() {
      ids.forEach(el => clearTimeout(el));
    };
  }, [state]);
  return (
    <div className={css.chartParent}>
      <Bar data={config.data} options={config.options} />
    </div>
  );
};

export const MemoizedChart = React.memo(Chart);
