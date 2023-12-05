import "./App.css";
import { TestStoreReduxComponent } from "./components/TestReduxStore";
import { Balance } from "./components/Balance/Balance";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/RegistrationForm/RegistrationForm";
import { ChartWrapper } from "./components/Chart/ChartWrapper";
import React, { useState } from "react";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <TestStoreReduxComponent />
      <Balance />
      {showLoginForm ? (
        <LoginForm onRegisterClick={handleRegisterClick} />
      ) : (
        <SignupForm onLoginClick={handleLoginClick} />
      )}
      <ChartWrapper />
    </>
  );
}

export default App;
