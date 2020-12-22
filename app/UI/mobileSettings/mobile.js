import React, { useState } from 'react';
import { Divider, List, ListItem, ListItemText, SwipeableDrawer as Sidebar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Brightness4Outlined as Moon, WbSunnyOutlined as Sun, ArrowBack } from '@material-ui/icons';
import { NumberInput } from '../shared/numberInput';
import { Speed } from '../shared/speed';
import { Size } from '../shared/size';

const useStyles = makeStyles(() => ({
  paper: {
    height: '100%',
    width: '80vw',
    backgroundColor: 'gray',
  },
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
}));

const Mobile = ({ settings, toggleMobile, open, algorithm, algoList }) => {
  const [algorithmOptions, toggleAlgorithmOptions] = useState(false);
  const classes = useStyles();
  return (
    <Sidebar
      anchor="right"
      open={open}
      classes={{ paper: classes.paper }}
      onClose={() => {
        toggleAlgorithmOptions(false);
        toggleMobile();
      }}
      onOpen={() => {
        // eslint-disable-next-line spaced-comment
        /*stuff here called after sidebar opened*/
      }}
    >
      <div>
        {!algorithmOptions && (
          <PrimaryList algo={algorithm} algoOptions={algorithmOptions} toggleAlgoOptions={toggleAlgorithmOptions} />
        )}
        {algorithmOptions && <SecondaryList items={algoList} toggle={toggleAlgorithmOptions} />}
      </div>
    </Sidebar>
  );
};

export default Mobile;

function PrimaryList({ algo, algoOptions, toggleAlgoOptions }) {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText primary={algo} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => toggleAlgoOptions(!algoOptions)}>
        <ListItemText primary="Change Algorithm" />
        {!algoOptions && <ExpandMore />}
      </ListItem>
      <ListItem button>
        <NumberInput />
      </ListItem>
      <ListItem button>
        <Speed css={classes.controls} />
      </ListItem>
      <ListItem button>
        <Size css={classes.controls} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Algorithm Code" />
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
}

function SecondaryList({ items, toggle }) {
  return (
    <List>
      <ListItem button onClick={() => toggle(false)}>
        <ArrowBack fontSize="large" />
      </ListItem>
      <Divider />
      {items.map(el => (
        <ListItem key={el} button>
          <ListItemText primary={el} />
        </ListItem>
      ))}
    </List>
  );
}
