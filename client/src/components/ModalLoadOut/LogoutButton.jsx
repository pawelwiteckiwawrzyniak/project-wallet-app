
import React, { useState } from 'react';
import { ModalLoadOut } from './ModalLoadOut';
import css from './LogoutButton.module.css';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.logoutButton} onClick={handleLogoutClick}>
        Exit
      </button>
      {isModalOpen && <ModalLoadOut onClose={handleCloseModal} />}
    </>
  );
};

export default LogoutButton;
