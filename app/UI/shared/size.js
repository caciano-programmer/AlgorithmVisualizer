import React from 'react';
import { Slider, Typography, useMediaQuery } from '@material-ui/core';

export const Size = ({ size, css, disabled, setSize }) => {
  const mediaQuery = useMediaQuery('only screen and (min-width: 1050px)');
  return (
    <div className={css}>
      <Typography>Size</Typography>
      <Slider
        valueLabelDisplay="off"
        disabled={disabled}
        onChange={(event, value) => setSize(value)}
        value={size}
        min={5}
        max={mediaQuery ? 250 : 50}
      />
    </div>
  );
};
