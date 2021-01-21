/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { step } from './utils';

import styles from './chart.module.css';

const Chart = ({ state, data, pointer, setData, speed, steps, instruction }) => {
  const intervals = getIntervals(Math.max(...data));
  const largestTick = Math.max(...intervals);
  const [tickHeight, setTickHeight] = useState(0);

  useEffect(() => {
    let id;
    if (instruction.inProgress) id = step(data, setData, pointer, steps, speed, instruction.type);
    return () => (id ? clearTimeout(id) : null);
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
          <React.Fragment key={new Date().getTime() + index}>
            <div
              className={styles.tick}
              id={index === 0 ? 'bottomTick' : index === intervals.length - 1 ? 'topTick' : ''}
            >
              {el}&ndash;
            </div>
            {index !== intervals.length - 1 && <div className={styles.tickSpace} />}
          </React.Fragment>
        ))}
      </div>
      <div className={styles.chart}>
        <div className={styles.barSpace} />
        {data.map((el, index) => (
          <React.Fragment key={new Date().getTime() + index}>
            <div className={styles.bar} style={{ height: `${(el / largestTick) * tickHeight}px` }} />
            <div className={styles.barSpace} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const MemoizedChart = React.memo(Chart);

function getIntervals(num) {
  const intervals = [0];
  const interval = num / 5 >= 10 ? Math.floor(num / 5 / 10) * 10 : Math.floor(num / 5);
  for (let i = interval; i < num + interval; i += interval) intervals.push(i);
  return intervals;
}

function getTickHeight() {
  const topTick = document.getElementById('topTick').getBoundingClientRect();
  const bottomTick = document.getElementById('bottomTick').getBoundingClientRect();
  return bottomTick.top - topTick.top;
}
