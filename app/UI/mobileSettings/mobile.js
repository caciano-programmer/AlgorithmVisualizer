/* eslint-disable react/prop-types */

import React from 'react';
import { Drawer } from '@material-ui/core';

import styles from './mobile.module.css';

export default ({ settings, toggleMobile, open }) => (
  <Drawer anchor="right" open={open} onClose={toggleMobile}>
    options go here
  </Drawer>
);
