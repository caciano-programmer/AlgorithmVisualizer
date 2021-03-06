import React, { useContext } from 'react';
import { IconButton, LinearProgress as Progress, makeStyles } from '@material-ui/core';
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
import { MyTheme } from '../../theme/theme';

const useStyles = theme =>
  makeStyles({
    control: { background: theme.background },
    progressBase: { backgroundColor: theme.progress.base },
    progressSecondary: { backgroundColor: theme.progress.secondary },
    hover: { '&:hover': { backgroundColor: `${theme.controlHover}` } },
  });

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
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();
  const busy = instruction.inProgress === true || state === STATES.GO;
  return (
    <div className={`${styles.container} ${classes.control}`}>
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
          <IconButton
            disabled={busy}
            onClick={() => setInstruction(INSTRUCTIONS.BEGINNING)}
            classes={{ root: classes.hover }}
          >
            <SkipPrevious style={{ fill: busy ? theme.controlDisabled : theme.brand }} />
          </IconButton>
          <IconButton
            disabled={busy}
            onClick={() => setInstruction(INSTRUCTIONS.PREVIOUS)}
            classes={{ root: classes.hover }}
          >
            <NavigateBefore style={{ fill: busy ? theme.controlDisabled : theme.brand }} />
          </IconButton>
          {state === STATES.STOP && (
            <IconButton onClick={() => setState(STATES.GO)} classes={{ root: classes.hover }}>
              <PlayCircleOutline style={{ fill: theme.brand }} fontSize="large" />
            </IconButton>
          )}
          {state === STATES.FINISHED && (
            <IconButton onClick={() => setSize()} classes={{ root: classes.hover }}>
              <Shuffle style={{ fill: theme.brand }} fontSize="large" />
            </IconButton>
          )}
          {state === STATES.GO && (
            <IconButton onClick={() => setState(STATES.STOP)} classes={{ root: classes.hover }}>
              <PauseCircleOutline style={{ fill: theme.brand }} fontSize="large" />
            </IconButton>
          )}
          <IconButton
            disabled={busy}
            onClick={() => setInstruction(INSTRUCTIONS.NEXT)}
            classes={{ root: classes.hover }}
          >
            <NavigateNext style={{ fill: busy ? theme.controlDisabled : theme.brand }} />
          </IconButton>
          <IconButton
            disabled={busy}
            onClick={() => setInstruction(INSTRUCTIONS.END)}
            classes={{ root: classes.hover }}
          >
            <SkipNext style={{ fill: busy ? theme.controlDisabled : theme.brand }} />
          </IconButton>
        </div>
      </div>
      <div className={`${styles.gridItem} ${styles.progress}`}>
        <Progress
          variant="determinate"
          value={progress}
          classes={{ root: classes.progressBase, bar: classes.progressSecondary }}
        />
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
