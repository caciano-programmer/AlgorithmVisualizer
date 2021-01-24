import React from 'react';
import { Slider, Typography } from '@material-ui/core';
import { MAX_SPEED, MIN_SPEED } from '../../sort/AppConstants';

export const Speed = ({ speed, css, paused, setSpeed, size }) => (
  <div className={css}>
    <Typography>Speed</Typography>
    <Slider
      valueLabelDisplay="off"
      value={-speed}
      onChange={(event, value) => setSpeed(-value)}
      disabled={!paused}
      min={-MIN_SPEED(size)}
      max={-MAX_SPEED(size)}
    />
  </div>
);
