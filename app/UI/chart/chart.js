/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { step, getIntervals, getTickHeight } from './utils';
import { INSTRUCTIONS, STATES } from '../../sort/AppConstants';

import styles from './chart.module.css';

const Chart = ({ state, data, steps, pointer, setData, speed, instruction }) => {
  const intervals = getIntervals(Math.max(...data));
  const largestTick = Math.max(...intervals);
  const [tickHeight, setTickHeight] = useState(0);
  let id = null;

  useEffect(() => {
    const limit = steps.length - pointer;
    if (state === STATES.GO) id = step(data, setData, pointer, steps, speed, limit);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    const { type, inProgress } = instruction;
    if (inProgress && (type === INSTRUCTIONS.NEXT || type === INSTRUCTIONS.PREVIOUS))
      id = step(data, setData, pointer, steps, speed);
    return () => clearInterval(id);
  }, [instruction]);

  useLayoutEffect(() => {
    setTickHeight(getTickHeight());
    const setNewTickHeight = () => setTickHeight(getTickHeight());
    window.addEventListener('resize', setNewTickHeight);
    return () => window.removeEventListener('resize', setNewTickHeight);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.ticks}>
        {intervals.map((el, index) => (
          <div
            className={`${styles.tick} ${index !== intervals.length - 1 ? styles.tickSpace : ''}`}
            id={index === 0 ? 'bottomTick' : index === intervals.length - 1 ? 'topTick' : ''}
            key={new Date().getTime() + index}
          >
            {el}&ndash;
          </div>
        ))}
      </div>
      <div className={styles.chart}>
        {data.map((el, index) => (
          <div
            className={styles.bar}
            style={{ height: `${(el / largestTick) * tickHeight}px` }}
            key={new Date().getTime() + index}
          />
        ))}
      </div>
    </div>
  );
};

export const MemoizedChart = React.memo(Chart);
