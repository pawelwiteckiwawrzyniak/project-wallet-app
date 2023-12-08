import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/RegistrationForm/RegistrationForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Balance } from "./components/Balance/Balance";
import { ModalLoadOut } from "./components/ModalLoadOut/ModalLoadOut";
import { LoadSpinner } from "./components/LoadSpinner/LoadSpinner";
import { ChartWrapper } from "./components/Chart/ChartWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useAuth } from "./hooks/userAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { refreshUser } from "./redux/auth/operations";
import { TestRegistrationForm } from "./components/TestForms/TestRegistrationForm";
import { TestLoginForm } from "./components/TestForms/TestLoginForm";
import { refreshUserTest } from "./redux/auth/operations";
import { Currency } from "./components/Currency/Currency";

function App() {
  const dispatch = useDispatch();
  const { isRefresh, isAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.global.isLoading);

  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "START_LOADING" });

    setTimeout(() => {
      dispatch({ type: "STOP_LOADING" });
    }, 3000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {/* This is a test TestRegistrationForm*/}
      <TestRegistrationForm />
      <TestLoginForm />
      <Routes>
        {isRefresh ? (
          //there should be a loader
          <Route />
        ) : isAuth ? (
          <Route path="/" element={<ProtectedRoute />}>
            {/* Add components below, which would be display for logged-in user.*/}
            <Route
              path="/"
              element={
                <div>
                  <Balance />
                  <Currency />
                  <ChartWrapper />
                </div>
              }
            />
          </Route>
        ) : (
          <Route path="/" element={<div>No access. Register or login. </div>} />
        )}
      </Routes>

      <ToastContainer />
      {showLoginForm ? (
        <LoginForm onRegisterClick={handleRegisterClick} />
      ) : (
        <SignupForm onLoginClick={handleLoginClick} />
      )}
      <button className="exit-button" onClick={handleOpenModal}>
        EXIT
      </button>
      {isModalOpen && <ModalLoadOut onClose={handleCloseModal} />}
      <LoadSpinner loading={isLoading} />
    </>
  );
}
export default App;
