/* eslint-disable react/prop-types */

import React, { useState, Suspense } from 'react';
import { Select, MenuItem, Switch, TextField, InputAdornment, Divider } from '@material-ui/core';
import {
  Add,
  Settings,
  SettingsBackupRestore as Rewind,
  Brightness4Outlined as Moon,
  WbSunnyOutlined as Sun,
} from '@material-ui/icons';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';
import { APP_NAME } from '../../sort/AppConstants';

import styles from './header.module.css';

const mobileBundle = import('../mobileSettings/mobile');
const codeBundle = import('../code/code');

const CodeComponent = React.lazy(() => codeBundle);
const MobileComponent = React.lazy(() => mobileBundle);

export default ({ settings, algorithm }) => {
  const [animate, toggleAnimate] = useState('');
  const [code, toggleCode] = useState(false);
  const [mobile, toggleMobile] = useState(false);
  return (
    <header className={styles.container}>
      <div className={`${styles.flexItem} ${styles.name}`}>{APP_NAME}</div>
      <div className={`${styles.flexItem} ${styles.choose}`}>
        <Select
          value={algorithm.name}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {Object.values(SORT_ALGORITHMS).map(el => (
            <MenuItem key={el.name} value={el.name} disabled={algorithm.name === el.name}>
              {el.name}
            </MenuItem>
          ))}
          <MenuItem key="code">View Algorithm Code</MenuItem>
        </Select>
      </div>
      <div className={`${styles.flexItem} ${styles.custom}`}>
        <NumberInput />
      </div>
      <div className={`${styles.flexItem} ${styles.theme}`}>
        <Switch icon={<Sun />} checkedIcon={<Moon />} />
      </div>
      <div className={`${styles.flexItem} ${styles.settings}`}>
        <Settings
          className={`${animate}`}
          onClick={() => {
            toggleAnimate(`${styles.settingsIcon}`);
            toggleMobile(true);
          }}
          onAnimationEnd={() => toggleAnimate('')}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {code && <CodeComponent toggleCode={() => toggleCode(false)} />}
        <MobileComponent settings={settings} toggleMobile={() => toggleMobile(false)} open={mobile} />
      </Suspense>
    </header>
  );
};

function NumberInput() {
  const isError = false;
  return (
    <TextField
      error={isError}
      helperText={isError ? 'Enter a number from 1-100.' : ''}
      label="Custom Data:"
      placeholder="Enter numbers from 1-100"
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment>
              <Add />
            </InputAdornment>
            <Divider orientation="vertical" flexItem />
            <InputAdornment>
              <Rewind />
            </InputAdornment>
          </>
        ),
      }}
    />
  );
}

function returnValidNumbers(input) {
  return input
    .replaceAll(',', ' ')
    .split(' ')
    .filter(el => /^[1-9][0-9]*$/g.test(el) && +el <= 100)
    .map(el => +el);
}
