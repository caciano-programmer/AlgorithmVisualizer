import React, { useState, Suspense, useContext, useCallback } from 'react';
import { IconButton, makeStyles, Switch } from '@material-ui/core';
import { Settings, Brightness4Outlined as Moon, WbSunnyOutlined as Sun } from '@material-ui/icons';
import { NumberInput } from '../shared/numberInput';
import { APP_NAME, STATES } from '../../config/AppConstants';
import { MyTheme } from '../../theme/theme';
import { AlgorithmSelect } from './algorithmSelect';

import styles from './header.module.css';

const mobileBundle = import('../mobileSettings/mobile');
const codeBundle = import('../code/code');
const CodeComponent = React.lazy(() => codeBundle);
const MobileComponent = React.lazy(() => mobileBundle);
const useStyles = theme =>
  makeStyles({
    track: {
      backgroundColor: `${theme.brand} !important`,
    },
    hover: {
      '&:hover': {
        backgroundColor: `transparent !important`,
        '&.MuiSwitch-colorSecondary&.Mui-checked': { color: `${theme.brand} !important` },
      },
    },
    settingsHover: { '&:hover': { backgroundColor: theme.settingsHover } },
  });

export const Header = ({
  algorithm,
  setAlgorithm,
  setNewData,
  clearCustom,
  isCustom,
  size,
  setSize,
  speed,
  setSpeed,
  setState,
  toggleTheme,
}) => {
  const theme = useContext(MyTheme);
  const [animate, toggleAnimate] = useState('');
  const [code, toggleCode] = useState(false);
  const [mobile, toggleMobile] = useState(false);
  const classes = useStyles(theme)();

  return (
    <header className={styles.container} style={{ backgroundColor: theme.background }}>
      <div
        className={`${styles.flexItem} ${styles.name}`}
        style={{ color: theme.brand, textShadow: theme.brandShadow }}
      >
        {APP_NAME}
      </div>
      <div className={`${styles.flexItem} ${styles.choose}`}>
        <AlgorithmSelect theme={theme} setAlgorithm={setAlgorithm} algorithm={algorithm} toggleCode={toggleCode} />
      </div>
      <div className={`${styles.flexItem} ${styles.custom}`}>
        <NumberInput setNewData={setNewData} clearCustom={clearCustom} isCustom={isCustom} theme={theme} />
      </div>
      <div className={`${styles.flexItem} ${styles.theme}`}>
        <Switch
          icon={<Sun style={{ fill: theme.brand }} />}
          checkedIcon={<Moon style={{ fill: theme.brand }} />}
          onChange={toggleTheme}
          checked={theme.isDark}
          classes={{ track: classes.track, switchBase: classes.hover }}
        />
      </div>
      <div className={`${styles.flexItem} ${styles.settings}`}>
        <IconButton
          onClick={() => {
            setState(STATES.STOP);
            toggleAnimate(styles.settingsIcon);
            setTimeout(() => toggleMobile(true), 400);
          }}
          classes={{ root: classes.settingsHover }}
        >
          <Settings className={animate} onAnimationEnd={() => toggleAnimate('')} style={{ fill: theme.brand }} />
        </IconButton>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CodeComponent toggleCode={useCallback(() => toggleCode(false), [])} code={code} />
        <MobileComponent
          toggleMobile={(boolean = false) => toggleMobile(boolean)}
          open={mobile}
          code={() => toggleCode(true)}
          algorithm={algorithm.name}
          setAlgorithm={setAlgorithm}
          setNewData={setNewData}
          clearCustom={clearCustom}
          isCustom={isCustom}
          size={size}
          setSize={setSize}
          speed={speed}
          setSpeed={setSpeed}
          toggleTheme={toggleTheme}
        />
      </Suspense>
    </header>
  );
};
