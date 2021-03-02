import React from 'react';
import { KeyboardArrowRight, Brightness4Outlined as Moon, WbSunnyOutlined as Sun } from '@material-ui/icons';
import { Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { NumberInput } from '../shared/numberInput';
import { Speed } from '../shared/speed';
import { Size } from '../shared/size';

const useStyles = makeStyles({
  controls: { width: '100%', textAlign: 'center', margin: '0 15% 0 15%' },
  themeContainer: { height: '6vh', width: '80vw' },
  themeOption: { height: '100%', display: 'inline-block', minWidth: '49%' },
  themeLight: { backgroundColor: 'yellow' },
  themeDark: { backgroundColor: 'purple' },
  themeDivider: {
    backgroundColor: 'gray',
    height: '100%',
    minWidth: '2%',
    display: 'inline-block',
  },
  themeListItem: { padding: 0 },
  icon: { margin: '.5vh 0 0 1vw' },
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
}) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText primary={algo} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => toggleAlgoOptions(!algoOptions)}>
        <ListItemText primary="Change Algorithm" />
        {!algoOptions && <KeyboardArrowRight />}
      </ListItem>
      <ListItem button>
        <NumberInput setNewData={setNewData} clearCustom={clearCustom} isCustom={isCustom} />
      </ListItem>
      <ListItem button>
        <Speed css={classes.controls} speed={speed} setSpeed={setSpeed} size={size} disabled={false} />
      </ListItem>
      <ListItem button>
        <Size css={classes.controls} size={size} setSize={setSize} disabled={false} />
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="Algorithm Code"
          onClick={() => {
            code();
            toggleMobile();
          }}
        />
      </ListItem>
      <ListItem button classes={{ root: classes.themeListItem }}>
        <div className={classes.themeContainer}>
          <div className={`${classes.themeOption} ${classes.themeDark}`}>
            <Moon classes={{ root: classes.icon }} />
          </div>
          <div className={classes.themeDivider} />
          <div className={`${classes.themeOption} ${classes.themeLight}`}>
            <Sun classes={{ root: classes.icon }} />
          </div>
        </div>
      </ListItem>
    </List>
  );
};
