import { useEffect, useState } from "react";
import styles from "./LoadSpinner.module.css";
// eslint-disable-next-line react/prop-types
export const LoadSpinner = ({ loading }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setShowSpinner(loading);
  }, [loading]);

  return (
    <>
      {showSpinner && (
        <div className={styles["spinner-container"]}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
};
