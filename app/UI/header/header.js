/* eslint-disable react/prop-types */

import React from 'react';
import { Select, MenuItem, Switch, TextField, InputAdornment, Divider } from '@material-ui/core';
import {
  Add,
  SettingsBackupRestore as Rewind,
  Brightness4Outlined as Moon,
  WbSunnyOutlined as Sun,
} from '@material-ui/icons';
import Settings from '@material-ui/icons/Settings';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

import styles from './header.module.css';

const APP_NAME = 'SortVisualizer';

export default ({ changeAlgorithm, algorithm }) => (
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
      </Select>
    </div>
    <div className={`${styles.flexItem} ${styles.custom}`}>
      <NumberInput />
    </div>
    <div className={`${styles.flexItem} ${styles.settings}`}>
      <Settings />
    </div>
    <div className={`${styles.flexItem} ${styles.theme}`}>
      <Switch icon={<Sun />} checkedIcon={<Moon />} />
    </div>
  </header>
);

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
  const substrings = input.replaceAll(',', ' ').split(' ');
  return substrings.filter(el => /^[1-9][0-9]*$/g.test(el) && +el <= 100).map(el => +el);
}
