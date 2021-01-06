import React from 'react';
import { LinearProgress as Progress } from '@material-ui/core';
import {
  NavigateBefore,
  SkipPrevious,
  NavigateNext,
  SkipNext,
  PauseCircleOutline,
  PlayCircleOutline,
} from '@material-ui/icons';
import { Size } from '../shared/size';
import { Speed } from '../shared/speed';
import { STATES } from '../../sort/AppConstants';

import styles from './controls.module.css';

export const Controls = ({ state, progress, size, speed, setState, setSpeed, setSize }) => (
  <div className={styles.container}>
    <Size
      css={`
        ${styles.gridItem} ${styles.size}
      `}
      setSize={payload => setSize(payload)}
      paused={state === STATES.STOP}
      size={size}
    />
    <div className={`${styles.gridItem} ${styles.controls}`}>
      <div>
        <SkipPrevious />
        <NavigateBefore />
        {state === STATES.STOP && <PlayCircleOutline onClick={() => setState(STATES.GO)} />}
        {state === STATES.GO && <PauseCircleOutline onClick={() => setState(STATES.STOP)} />}
        <NavigateNext />
        <SkipNext />
      </div>
    </div>
    <div className={`${styles.gridItem}`}>
      <Progress variant="determinate" value={progress} className={`${styles.progress}`} />
    </div>
    <Speed
      css={`
        ${styles.gridItem} ${styles.speed}
      `}
      setSpeed={newSpeed => setSpeed(newSpeed)}
      paused={state === STATES.STOP}
      size={size}
      speed={speed}
    />
  </div>
);
