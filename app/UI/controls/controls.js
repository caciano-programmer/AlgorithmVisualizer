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

export default ({ changeControls, state }) => (
  <div className={styles.container}>
    <Size
      css={`
        ${styles.gridItem} ${styles.size}
      `}
    />
    <div className={`${styles.gridItem} ${styles.controls}`}>
      <div>
        <SkipPrevious />
        <NavigateBefore />
        {state === STATES.STOP && <PauseCircleOutline />}
        {state === STATES.GO && <PlayCircleOutline />}
        <NavigateNext />
        <SkipNext />
      </div>
    </div>
    <div className={`${styles.gridItem}`}>
      <Progress variant="determinate" value={50} className={`${styles.progress}`} />
    </div>
    <Speed
      css={`
        ${styles.gridItem} ${styles.speed}
      `}
    />
  </div>
);
