import React, { useState, Suspense, useContext } from 'react';
import { Switch, NativeSelect } from '@material-ui/core';
import { Settings, Brightness4Outlined as Moon, WbSunnyOutlined as Sun } from '@material-ui/icons';
import { NumberInput } from '../shared/numberInput';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';
import { APP_NAME, STATES } from '../../config/AppConstants';
import { getAlgorithm } from './headerUtil';
import { MyTheme } from '../../theme/theme';

import styles from './header.module.css';

const mobileBundle = import('../mobileSettings/mobile');
const codeBundle = import('../code/code');
const CodeComponent = React.lazy(() => codeBundle);
const MobileComponent = React.lazy(() => mobileBundle);

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

  return (
    <header className={styles.container} style={{ backgroundColor: theme.background }}>
      <div
        className={`${styles.flexItem} ${styles.name}`}
        style={{ color: theme.brand, textShadow: theme.brandShadow }}
      >
        {APP_NAME}
      </div>
      <div className={`${styles.flexItem} ${styles.choose}`}>
        <NativeSelect
          value={algorithm.name}
          onChange={event => {
            if (event.target.value === 'code') toggleCode(true);
            else setAlgorithm(getAlgorithm(event.target.value));
          }}
        >
          {Object.values(SORT_ALGORITHMS).map(el => (
            <option key={el.name} value={el.name} disabled={algorithm.name === el.name}>
              {el.name}
            </option>
          ))}
          <option key="code" value="code">
            View Algorithm Code
          </option>
        </NativeSelect>
      </div>
      <div className={`${styles.flexItem} ${styles.custom}`}>
        <NumberInput setNewData={setNewData} clearCustom={clearCustom} isCustom={isCustom} />
      </div>
      <div className={`${styles.flexItem} ${styles.theme}`}>
        <Switch icon={<Sun />} checkedIcon={<Moon />} onChange={toggleTheme} />
      </div>
      <div className={`${styles.flexItem} ${styles.settings}`}>
        <Settings
          className={animate}
          onClick={() => {
            setState(STATES.STOP);
            toggleAnimate(styles.settingsIcon);
            setTimeout(() => toggleMobile(true), 400);
          }}
          onAnimationEnd={() => toggleAnimate('')}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CodeComponent toggleCode={() => toggleCode(false)} code={code} />
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
        />
      </Suspense>
    </header>
  );
};
