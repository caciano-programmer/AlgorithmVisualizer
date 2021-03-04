import React, { useContext } from 'react';
import { makeStyles, Slider, Typography } from '@material-ui/core';
import { maxSpeed, minSpeed } from '../../config/AppConstants';
import { MyTheme } from '../../theme/theme';

const useStyles = theme =>
  makeStyles({
    text: { color: theme.control, fontWeight: 'bold' },
    slider: { color: theme.control, '&.Mui-disabled': { color: theme.controlDisabled } },
  });

export const Speed = ({ speed, css, disabled, setSpeed, size }) => {
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();
  return (
    <div className={css}>
      <Typography classes={{ root: classes.text }}>Speed</Typography>
      <Slider
        classes={{ root: classes.slider }}
        valueLabelDisplay="off"
        value={-speed}
        onChange={(event, value) => setSpeed(-value)}
        disabled={disabled}
        min={-minSpeed(size)}
        max={-maxSpeed(size)}
      />
    </div>
  );
};
