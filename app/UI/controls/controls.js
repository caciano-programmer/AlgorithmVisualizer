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
import { INSTRUCTIONS, STATES } from '../../config/AppConstants';

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
}) => {
  const busy = instruction.inProgress === true || state === STATES.GO;
  return (
    <div className={styles.container}>
      <Size
        css={`
          ${styles.gridItem} ${styles.size}
        `}
        setSize={payload => setSize(payload)}
        disabled={state === STATES.GO || instruction.inProgress}
        size={size}
      />
      <div className={`${styles.gridItem} ${styles.controls}`}>
        <div>
          <IconButton disabled={busy} onClick={() => setInstruction(INSTRUCTIONS.BEGINNING)}>
            <SkipPrevious />
          </IconButton>
          <IconButton disabled={busy} onClick={() => setInstruction(INSTRUCTIONS.PREVIOUS)}>
            <NavigateBefore />
          </IconButton>
          {state === STATES.STOP && (
            <IconButton onClick={() => setState(STATES.GO)}>
              <PlayCircleOutline />
            </IconButton>
          )}
          {state === STATES.FINISHED && (
            <IconButton onClick={() => setSize()}>
              <Shuffle />
            </IconButton>
          )}
          {state === STATES.GO && (
            <IconButton onClick={() => setState(STATES.STOP)}>
              <PauseCircleOutline />
            </IconButton>
          )}
          <IconButton disabled={busy} onClick={() => setInstruction(INSTRUCTIONS.NEXT)}>
            <NavigateNext />
          </IconButton>
          <IconButton disabled={busy} onClick={() => setInstruction(INSTRUCTIONS.END)}>
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
        disabled={state === STATES.GO || instruction.inProgress}
        size={size}
        speed={speed}
      />
    </div>
  );
};
