import React from 'react';
import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { CodeText } from './codeText';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  close: {
    textAlign: 'end',
  },
  icon: {
    fontSize: '7vh',
  },
  darkCode: {
    backgroundColor: '#1c1d21',
    padding: 0,
  },
  lightCode: {
    backgroundColor: '#f8f3f7',
    padding: 0,
  },
}));

const Code = ({ toggleCode, code, theme }) => {
  const classes = useStyles();
  const mediaQuery = useMediaQuery('only screen and (min-width: 768px)');
  return (
    <Dialog open={code} keepMounted onClose={toggleCode} fullScreen>
      <AppBar position="relative">
        <Toolbar>
          <Typography classes={{ root: classes.root }} variant={mediaQuery ? 'h4' : 'h6'}>
            Algorithms
          </Typography>
          <div className={`${classes.root} ${classes.close}`}>
            <IconButton>
              <Close classes={{ root: classes.icon }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: theme === 'light' ? classes.lightCode : classes.darkCode }}>
        <CodeText />
      </DialogContent>
    </Dialog>
  );
};
export default Code;
