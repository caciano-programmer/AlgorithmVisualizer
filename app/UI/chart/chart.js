/* eslint-disable react/no-array-index-key */

import React, { useContext, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import { makeStyles } from '@material-ui/core';
import { step, getIntervals, mergeStep, indexInsideStep, getBarValue } from './chartUtil';
import { INSTRUCTIONS, STATES } from '../../config/AppConstants';
import { MyTheme } from '../../theme/theme';

import styles from './chart.module.css';

const useStyles = theme =>
  makeStyles({
    container: { backgroundColor: theme.background },
    bar: {
      borderLeft: `1px solid ${theme.bar.border}`,
      borderRight: `1px solid ${theme.bar.border}`,
      borderTop: `1px solid ${theme.bar.border}`,
      backgroundColor: theme.bar.color,
    },
    chart: {
      borderLeft: `1px solid ${theme.graph}`,
      borderBottom: `1px solid ${theme.graph}`,
    },
    ticks: {
      color: theme.graph,
    },
  });

const Chart = ({ state, data, steps, pointer, setData, speed, instruction, isMerge }) => {
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();
  const barStyle = `${styles.bar} ${classes.bar}`;
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

  return (
    <div className={`${styles.container} ${classes.container}`}>
      <div className={styles.ticks}>
        {intervals.map((el, index) => (
          <div
            className={`${styles.tick} ${index === intervals.length - 1 ? styles.topTick : ''} 
            ${index === 0 ? styles.bottomTick : ''} ${classes.ticks}`}
            key={new Date().getTime() + index}
          >
            {el}&ndash;
          </div>
        ))}
      </div>
      <div className={`${styles.chart} ${classes.chart}`}>
        {data.map((el, index) => {
          const key = new Date().getTime() + index;
          const from = { height: `${(el / largestTick) * 100}%`, backgroundColor: theme.bar.transition };
          if ((inProgress || state === STATES.GO) && indexInsideStep(steps[pointer], index)) {
            const value = getBarValue(steps[pointer], data, index, isPrevious, el);
            const to = { height: `${(value / largestTick) * 100}%`, backgroundColor: theme.bar.color };
            return (
              <Spring key={key} from={from} to={to} config={{ duration: speed - 5 }}>
                {props => <div className={`${barStyle}`} style={props} />}
              </Spring>
            );
          }
          return <div className={`${barStyle}`} style={{ height: from.height }} key={key} />;
        })}
      </div>
    </div>
  );
};

export const MemoizedChart = React.memo(Chart);
