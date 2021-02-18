import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer as Sidebar } from '@material-ui/core';
import { PrimaryList } from './primaryList';
import { SecondaryList } from './secondaryList';

const useStyles = makeStyles({
  paper: {
    height: '100%',
    width: '80vw',
    backgroundColor: 'gray',
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
}) => {
  const [algorithmOptions, toggleAlgorithmOptions] = useState(false);
  const classes = useStyles();
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
          />
        )}
        {algorithmOptions && <SecondaryList toggle={toggleAlgorithmOptions} setAlgorithm={setAlgorithm} />}
      </div>
    </Sidebar>
  );
};

export default Mobile;
