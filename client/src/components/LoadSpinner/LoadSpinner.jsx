import React, { useEffect, useState } from 'react';
import styles from './LoadSpinner.module.css';

export const LoadSpinner = ({ loading }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(loading);
  }, [loading]);

  return (
    <>
      {showSpinner && (
        <div className={styles['spinner-container']}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
};
