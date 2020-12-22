import React from 'react';
import { Slider, Typography } from '@material-ui/core';

export const Size = ({ size = 50, css }) => (
  <div className={css}>
    <Typography>Size</Typography>
    <Slider valueLabelDisplay="off" defaultValue={size} />
  </div>
);
