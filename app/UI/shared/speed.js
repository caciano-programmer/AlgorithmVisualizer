import React from 'react';
import { Slider, Typography } from '@material-ui/core';

export const Speed = ({ speed, css, paused, setSpeed, size }) => (
  <div className={css}>
    <Typography>Speed</Typography>
    <Slider
      valueLabelDisplay="off"
      value={-speed}
      onChange={(event, value) => setSpeed(-value)}
      disabled={!paused}
      min={0 - (300 / size) * 150}
      max={0 - (300 / size) * 25}
    />
  </div>
);
