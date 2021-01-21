import React from 'react';
import { IconButton, LinearProgress as Progress } from '@material-ui/core';
import {
  NavigateBefore,
  SkipPrevious,
  NavigateNext,
  SkipNext,
  PauseCircleOutline,
  PlayCircleOutline,
  Shuffle,
} from '@material-ui/icons';
import { Size } from '../shared/size';
import { Speed } from '../shared/speed';
import { INSTRUCTIONS, STATES } from '../../sort/AppConstants';

import styles from './controls.module.css';

export const Controls = ({
  state,
  progress,
  size,
  speed,
  setState,
  setSpeed,
  setSize,
  instruction,
  setInstruction,
}) => (
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
        <IconButton>
          <SkipPrevious />
        </IconButton>
        <IconButton
          disabled={instruction.inProgress === true || state === STATES.GO}
          onClick={() => setInstruction(INSTRUCTIONS.PREVIOUS)}
        >
          <NavigateBefore />
        </IconButton>
        {state === STATES.STOP && (
          <IconButton onClick={() => setState(STATES.GO)}>
            <PlayCircleOutline />
          </IconButton>
        )}
        {state === STATES.FINISHED && (
          <IconButton>
            <Shuffle />
          </IconButton>
        )}
        {state === STATES.GO && (
          <IconButton onClick={() => setState(STATES.STOP)}>
            <PauseCircleOutline />
          </IconButton>
        )}
        <IconButton
          disabled={instruction.inProgress === true || state === STATES.GO}
          onClick={() => setInstruction(INSTRUCTIONS.NEXT)}
        >
          <NavigateNext />
        </IconButton>
        <IconButton>
          <SkipNext />
        </IconButton>
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
