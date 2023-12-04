import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestStoreReduxComponent } from './components/TestReduxStore';
import { Balance } from './components/Balance/Balance';
import ModalLoadOut from './components/ModalLoadOut/ModalLoadOut';
import LoadSpinner from './components//LoadSpinner/LoadSpinner';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.global.isLoading);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      dispatch({ type: 'STOP_LOADING' });
    }, 3000);
  }, [dispatch]);

  return (
    <>
      <TestStoreReduxComponent />
      <Balance />
      <button className="exit-button" onClick={handleOpenModal}>
        EXIT
      </button>
      {isModalOpen && <ModalLoadOut onClose={handleCloseModal} />}
      <LoadSpinner loading={isLoading} />
    </>
  );
}

export default App;
