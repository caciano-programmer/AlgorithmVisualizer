/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Spring } from 'react-spring/renderprops';
import { step, getIntervals, getTickHeight, mergeStep, indexInsideStep, getBarValue } from './chartUtil';
import { INSTRUCTIONS, STATES } from '../../config/AppConstants';

import styles from './chart.module.css';

const Chart = ({ state, data, steps, pointer, setData, speed, instruction, isMerge }) => {
  const [tickHeight, setTickHeight] = useState(0);
  const intervals = getIntervals(Math.max(...data));
  const largestTick = Math.max(...intervals);
  const stepFunc = isMerge ? mergeStep : step;
  const { type, inProgress } = instruction;
  const isPrevious = type === INSTRUCTIONS.PREVIOUS;
  let id = null;

  useEffect(() => {
    const limit = steps.length - pointer;
    if (state === STATES.GO) id = stepFunc(data, setData, pointer, steps, speed, limit, isPrevious);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (inProgress && (type === INSTRUCTIONS.NEXT || isPrevious))
      id = stepFunc(data, setData, pointer, steps, speed, 1, isPrevious);
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
        {data.map((el, index) => {
          const key = new Date().getTime() + index;
          const from = { height: `${(el / largestTick) * tickHeight}px`, backgroundColor: 'red' };
          if ((inProgress || state === STATES.GO) && indexInsideStep(steps[pointer], index)) {
            const value = getBarValue(steps[pointer], data, index, isPrevious, el);
            const to = { height: `${(value / largestTick) * tickHeight}px`, backgroundColor: 'rgb(224, 40, 40, 0.2)' };
            return (
              <Spring key={key} from={from} to={to} config={{ duration: speed - 2 }}>
                {props => <div className={styles.bar} style={props} />}
              </Spring>
            );
          }
          return <div className={styles.bar} style={{ height: from.height }} key={key} />;
        })}
      </div>
    </div>
  );
};

export const MemoizedChart = React.memo(Chart);
