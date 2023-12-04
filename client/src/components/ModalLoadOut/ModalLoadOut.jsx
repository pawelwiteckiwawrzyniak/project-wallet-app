import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from '../../redux/slices/authSlice';
import { globalSlice } from '../../redux/store';  
import { toast } from 'react-toastify';
import LoadSpinner from '../LoadSpinner/LoadSpinner'; 
import css from './ModalLoadOut.module.css';

const ModalLoadOut = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
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
      setIsLogoutLoading(true);
  
      await dispatch(authReducer.actions.logOut());
      toast.success('Logout successful');
      onClose();
    } catch (error) {
      console.error('Logout failed. Please try again.', error);
      toast.error('Logout failed. Please try again.');
      onClose();
    } finally {
      dispatch(globalSlice.actions.setLoading(false));
      setIsLogoutLoading(false);
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
        <LoadSpinner loading={isLoading || isLogoutLoading} />
      </div>
    </div>
  );
};

export default ModalLoadOut;
