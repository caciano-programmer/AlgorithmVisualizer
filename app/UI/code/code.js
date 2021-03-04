import React, { useContext } from 'react';
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
import { MyTheme } from '../../theme/theme';

const useStyles = theme =>
  makeStyles({
    root: { flexGrow: 1, color: theme.brand },
    close: { textAlign: 'end' },
    icon: { fontSize: '7vh' },
    dialog: { backgroundColor: theme.background, padding: 0 },
    appBar: { backgroundColor: theme.background },
  });

const Code = ({ toggleCode, code }) => {
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();
  const mediaQuery = useMediaQuery('only screen and (min-width: 1050px)');
  return (
    <Dialog open={code} keepMounted onClose={toggleCode} fullScreen>
      <AppBar position="relative" classes={{ root: classes.appBar }}>
        <Toolbar>
          <Typography classes={{ root: classes.root }} variant={mediaQuery ? 'h4' : 'h6'}>
            Algorithms
          </Typography>
          <div className={`${classes.root} ${classes.close}`}>
            <IconButton onClick={toggleCode}>
              <Close classes={{ root: classes.icon }} style={{ fill: theme.brand }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: classes.dialog }}>
        <CodeText />
      </DialogContent>
    </Dialog>
  );
};
export default React.memo(Code);
