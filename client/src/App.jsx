import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Balance } from "./components/Balance/Balance";
import "./App.css";
import { useAuth } from "./hooks/userAuth";
import { refreshUser } from "./redux/auth/operations";
import { ChartWrapper } from "./components/Chart/ChartWrapper";
import { Table } from "./components/Table/Table";
import Currency from "./components/Currency/Currency";
/* import { ButtonAddTransaction } from "./components/ButtonAddTransactions/ButtonAddTransaction"; */
import { LoadSpinner } from "./components/LoadSpinner/LoadSpinner";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/RegistrationForm/RegistrationForm";
/* import CustomButton from "./components/CustomButton/CustomButton"; */
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { TestAddTransactionForm } from "./components/TestForms/TestAddTransactionForm";

function App() {
  const dispatch = useDispatch();
  const { isRefresh, isAuth } = useAuth();
  /* const [isModalOpen, setIsModalOpen] = useState(false); */
  const isLoading = useSelector((state) => state.global.isLoading);

  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  };

  /* const handleOpenModal = () => {
    setIsModalOpen(true);
  }; */

  /* const handleCloseModal = () => {
    setIsModalOpen(false);
  }; */

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
      <Routes>
        {isLoading ? (
          <Route path="/" element={<LoadSpinner loading={true} />} />
        ) : isAuth ? (
          <Route path="/" element={<ProtectedRoute />}>
            {/* Add components below, which would be display for logged-in user.*/}
            <Route
              path="/"
              element={
                <div className="container">
                  <Balance />
                  <Currency />
                  <ChartWrapper />
                  <TestAddTransactionForm />
                </div>
              }
            />
          </Route>
        ) : (
          <Route
            path="/"
            element={
              <>
              
                {showLoginForm ? (
                  <LoginForm onRegisterClick={handleRegisterClick} />
                ) : (
                  <SignupForm onLoginClick={handleLoginClick} />
                )}
              </>
            }
          />
        )}
      </Routes>
    </>
  );
}
export default App;
