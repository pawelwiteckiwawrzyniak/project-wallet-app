import React from "react";
import { Link, useRoutes } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../RegistrationForm/RegistrationForm";

function Nav() {
  let routes = useRoutes([
    { path: "/home", element: <LoginForm /> },
    { path: "login", element: <LoginForm /> },
    { path: "register", element: <SignupForm /> },
  ]);

  return (
    <>
      <nav>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </nav>
      {routes}
    </>
  );
}

export default Nav;
