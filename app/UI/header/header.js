import React from 'react';

import styles from './header.module.css';

const APP_NAME = 'Sort Visualizer';

export default () => (
  <header className={styles.container}>
    <div className={`${styles.flexItem} ${styles.name}`}>{APP_NAME}</div>
    <div className={`${styles.flexItem} ${styles.choose}`}>Choose</div>
    <div className={`${styles.flexItem} ${styles.current}`}>current</div>
    <div className={`${styles.flexItem} ${styles.theme}`}>theme</div>
  </header>
);
