import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer as Sidebar } from '@material-ui/core';
import { PrimaryList } from './primaryList';
import { SecondaryList } from './secondaryList';
import { MyTheme } from '../../theme/theme';

const useStyles = theme =>
  makeStyles({
    paper: {
      height: '100%',
      width: '80vw',
      backgroundColor: theme.sidebar.background,
      color: theme.sidebar.color,
    },
  });

const Mobile = ({
  toggleMobile,
  open,
  code,
  algorithm,
  setAlgorithm,
  setNewData,
  clearCustom,
  isCustom,
  size,
  setSize,
  speed,
  setSpeed,
  toggleTheme,
  customNumTotal,
}) => {
  const [algorithmOptions, toggleAlgorithmOptions] = useState(false);
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();
  return (
    <Sidebar
      anchor="right"
      open={open}
      onOpen={() => toggleMobile(true)}
      classes={{ paper: classes.paper }}
      onClose={() => {
        toggleAlgorithmOptions(false);
        toggleMobile();
      }}
    >
      <div>
        {!algorithmOptions && (
          <PrimaryList
            toggleMobile={toggleMobile}
            algo={algorithm}
            algoOptions={algorithmOptions}
            code={code}
            toggleAlgoOptions={toggleAlgorithmOptions}
            setNewData={setNewData}
            clearCustom={clearCustom}
            isCustom={isCustom}
            size={size}
            setSize={setSize}
            speed={speed}
            setSpeed={setSpeed}
            theme={theme}
            toggleTheme={toggleTheme}
            customNumTotal={customNumTotal}
          />
        )}
        {algorithmOptions && (
          <SecondaryList toggle={toggleAlgorithmOptions} setAlgorithm={setAlgorithm} theme={theme} />
        )}
      </div>
    </Sidebar>
  );
};

export default Mobile;
