import React from 'react';

import styles from './footer.module.css';

export default () => (
  <footer className={styles.container}>
    <div className={`${styles.gridItem} ${styles.size}`}>size</div>
    <div className={`${styles.gridItem} ${styles.controls}`}>
      <div>controls</div>
      <div>progress bar</div>
    </div>
    <div className={`${styles.gridItem} ${styles.speed}`}>speed</div>
  </footer>
);
