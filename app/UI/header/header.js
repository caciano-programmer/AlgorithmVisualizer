import React, { useState, Suspense } from 'react';
import { Switch, NativeSelect } from '@material-ui/core';
import { Settings, Brightness4Outlined as Moon, WbSunnyOutlined as Sun } from '@material-ui/icons';
import { NumberInput } from '../shared/numberInput';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';
import { APP_NAME } from '../../sort/AppConstants';

import styles from './header.module.css';

const mobileBundle = import('../mobileSettings/mobile');
const codeBundle = import('../code/code');

const CodeComponent = React.lazy(() => codeBundle);
const MobileComponent = React.lazy(() => mobileBundle);

export const Header = ({ algorithm, setAlgorithm }) => {
  const [animate, toggleAnimate] = useState('');
  const [code, toggleCode] = useState(false);
  const [mobile, toggleMobile] = useState(false);
  return (
    <header className={styles.container}>
      <div className={`${styles.flexItem} ${styles.name}`}>{APP_NAME}</div>
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
        <NumberInput />
      </div>
      <div className={`${styles.flexItem} ${styles.theme}`}>
        <Switch icon={<Sun />} checkedIcon={<Moon />} />
      </div>
      <div className={`${styles.flexItem} ${styles.settings}`}>
        <Settings
          className={animate}
          onClick={() => {
            toggleAnimate(styles.settingsIcon);
            setTimeout(() => toggleMobile(true), 400);
          }}
          onAnimationEnd={() => toggleAnimate('')}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CodeComponent toggleCode={() => toggleCode(false)} code={code} />
        <MobileComponent
          toggleMobile={() => toggleMobile(false)}
          open={mobile}
          algorithm={algorithm.name}
          algoList={Object.values(SORT_ALGORITHMS).map(el => el.name)}
        />
      </Suspense>
    </header>
  );
};

function getAlgorithm(name) {
  switch (name) {
    case SORT_ALGORITHMS.BUBBLE_SORT.name:
      return SORT_ALGORITHMS.BUBBLE_SORT;
    case SORT_ALGORITHMS.HEAP_SORT.name:
      return SORT_ALGORITHMS.HEAP_SORT;
    case SORT_ALGORITHMS.INSERTION_SORT.name:
      return SORT_ALGORITHMS.INSERTION_SORT;
    case SORT_ALGORITHMS.MERGE_SORT.name:
      return SORT_ALGORITHMS.MERGE_SORT;
    case SORT_ALGORITHMS.QUICK_SORT.name:
      return SORT_ALGORITHMS.QUICK_SORT;
    case SORT_ALGORITHMS.SELECTION_SORT.name:
      return SORT_ALGORITHMS.SELECTION_SORT;
    default:
      throw new Error('No valid algorithm name given.');
  }
}
