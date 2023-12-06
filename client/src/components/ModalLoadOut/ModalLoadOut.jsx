
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { globalSlice } from '../../redux/store';
import { toast } from 'react-toastify';
import { LoadSpinner } from '../LoadSpinner/LoadSpinner';
import css from './ModalLoadOut.module.css';

export const ModalLoadOut = ({ onClose }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.global.isLoading);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleLogout = async () => {
    try {
      dispatch(globalSlice.actions.setLoading(true)); 
      

      const resultAction = await dispatch(logOut());

      if (logOut.rejected.match(resultAction)) {
        console.error('Logout failed. Please try again.', resultAction.payload);
        toast.error('Logout failed. Please try again.');
      } else {
        toast.success('Logout successful');
        onClose();
      }
    } catch (error) {
      console.error('An error occurred during logout.', error);
      toast.error('An error occurred during logout. Please try again.');
    } finally {
      dispatch(globalSlice.actions.setLoading(false)); 

    }
  };

  const handleNoClick = () => {
    onClose();
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>Load Out</div>
        <div className={css.content}>
          <p>Do you want to log out?</p>
        </div>
        <div className={css.buttonContainer}>
          <button className={css.noButton} onClick={handleNoClick}>
            No
          </button>
          <button className={css.yesButton} onClick={handleLogout}>
            Yes
          </button>
        </div>
        <LoadSpinner loading={isLoading} />
      </div>
    </div>
  );
};
