import React from 'react';
import { Slider, Typography, useMediaQuery } from '@material-ui/core';

export const Size = ({ size, css, paused, setSize }) => {
  const mediaQuery = useMediaQuery('only screen and (min-width: 768px)');
  return (
    <div className={css}>
      <Typography>Size</Typography>
      <Slider
        valueLabelDisplay="off"
        disabled={!paused}
        onChange={(event, value) => setSize(value)}
        value={size}
        min={5}
        max={mediaQuery ? 200 : 100}
      />
    </div>
  );
};
