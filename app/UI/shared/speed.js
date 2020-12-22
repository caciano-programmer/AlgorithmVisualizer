import React from 'react';
import { Slider, Typography } from '@material-ui/core';

export const Speed = ({ speed = 50, css }) => (
  <div className={css}>
    <Typography>Speed</Typography>
    <Slider valueLabelDisplay="off" defaultValue={speed} />
  </div>
);
