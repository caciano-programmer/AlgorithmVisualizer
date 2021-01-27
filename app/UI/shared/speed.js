import React from 'react';
import { Slider, Typography } from '@material-ui/core';
import { maxSpeed, minSpeed } from '../../config/AppConstants';

export const Speed = ({ speed, css, disabled, setSpeed, size }) => (
  <div className={css}>
    <Typography>Speed</Typography>
    <Slider
      valueLabelDisplay="off"
      value={-speed}
      onChange={(event, value) => setSpeed(-value)}
      disabled={disabled}
      min={-minSpeed(size)}
      max={-maxSpeed(size)}
    />
  </div>
);
