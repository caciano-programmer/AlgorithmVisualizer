import React from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { NumberInput } from '../shared/numberInput';
import { Speed } from '../shared/speed';
import { Size } from '../shared/size';

const useStyles = makeStyles({
  controls: { width: '100%', textAlign: 'center', margin: '0 15% 0 15%' },
  current: { fontWeight: 'bolder' },
});

export const PrimaryList = ({
  toggleMobile,
  algo,
  algoOptions,
  toggleAlgoOptions,
  code,
  setNewData,
  clearCustom,
  isCustom,
  size,
  setSize,
  speed,
  setSpeed,
  theme,
  toggleTheme,
  customNumTotal,
}) => {
  const classes = useStyles();

  const viewCode = () => {
    toggleMobile();
    code();
  };

  const changeTheme = () => {
    toggleMobile();
    toggleTheme();
  };

  return (
    <List>
      <ListItem>
        <ListItemText primary={`Algorithm: ${algo}`} classes={{ primary: classes.current }} />
      </ListItem>
      <Divider style={{ backgroundColor: theme.sidebar.color, height: '2px' }} />
      <ListItem button onClick={changeTheme}>
        <ListItemText primary={theme.isDark ? 'Light Mode' : 'Dark Mode'} />
        <KeyboardArrowRight />
      </ListItem>
      <ListItem button onClick={viewCode}>
        <ListItemText primary="View Algorithm Code" />
        <KeyboardArrowRight />
      </ListItem>
      <ListItem button onClick={() => toggleAlgoOptions(!algoOptions)}>
        <ListItemText primary="Change Algorithm" />
        {!algoOptions && <KeyboardArrowRight />}
      </ListItem>
      <ListItem button>
        <Speed css={classes.controls} speed={speed} setSpeed={setSpeed} size={size} disabled={false} />
      </ListItem>
      <ListItem button>
        <Size css={classes.controls} size={size} setSize={setSize} disabled={false} />
      </ListItem>
      <ListItem button>
        <NumberInput
          newData={setNewData}
          clear={clearCustom}
          isCustom={isCustom}
          theme={theme}
          css={{ width: '100%' }}
          nums={customNumTotal}
        />
      </ListItem>
    </List>
  );
};
