import React, { useState, useEffect } from 'react';
import styles from './LoadSpinner.module.css';

const LoadSpinner = ({ loading }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (loading) {
      // dla prezentacji robimy opóźnienie
      timeoutId = setTimeout(() => {
        setShowSpinner(true);
      }, 2000);
    } else {
      setShowSpinner(false);
    }

    return () => {
 
      clearTimeout(timeoutId);
    };
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

export default LoadSpinner;
