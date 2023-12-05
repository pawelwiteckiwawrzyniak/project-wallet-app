import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestStoreReduxComponent } from './components/TestReduxStore';
import { Balance } from './components/Balance/Balance';
import {ModalLoadOut} from './components/ModalLoadOut/ModalLoadOut';
import {LoadSpinner} from './components/LoadSpinner/LoadSpinner';
import { ChartWrapper } from "./components/Chart/ChartWrapper";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useAuth } from "./hooks/userAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { refreshUserTest } from "./redux/auth/operations";
  
function App() {
  const dispatch = useDispatch();
  const { isRefresh } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.global.isLoading);

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //use test function
        await dispatch(refreshUserTest());
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    };
    fetchData();
  }, [dispatch]);


  return (
    <>
      <Routes>
        {isRefresh ? (
          //there should be a loader
          <Route />
        ) : (
          <Route path="/" element={<ProtectedRoute />}>
            {/* Add components below, which would be display for logged-in user.*/}
            <Route
              path="/"
              element={
                <div>
                  <Balance />
                  <ChartWrapper />
                </div>
              }
            />
          </Route>
        )}
      </Routes>
      <TestStoreReduxComponent />
      <ToastContainer />
      <Balance />
      <LoginForm />
      <ChartWrapper />
      <button className="exit-button" onClick={handleOpenModal}>
        EXIT
      </button>
      {isModalOpen && <ModalLoadOut onClose={handleCloseModal} />}
      <LoadSpinner loading={isLoading} />
    </>
  )
}
export default App;
