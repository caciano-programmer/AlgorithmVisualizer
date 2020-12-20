/* eslint-disable react/prop-types */

import React from 'react';
import { Slider, Typography, LinearProgress as Progress } from '@material-ui/core';
import {
  NavigateBefore,
  SkipPrevious,
  NavigateNext,
  SkipNext,
  PauseCircleOutline,
  PlayCircleOutline,
} from '@material-ui/icons';
import { STATES } from '../../sort/AppConstants';

import styles from './controls.module.css';

export default ({ changeControls, state }) => (
  <div className={styles.container}>
    <div className={`${styles.gridItem} ${styles.size}`}>
      <Typography>size:</Typography>
      <Slider valueLabelDisplay="off" defaultValue={50} />
    </div>
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
    <div className={`${styles.gridItem} ${styles.speed}`}>
      <Typography>speed:</Typography>
      <Slider valueLabelDisplay="off" defaultValue={50} />
    </div>
  </div>
);
