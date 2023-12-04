import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("isAuth", true);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token: data.token, user: data.user },
        });
        dispatch({ type: "SET_AUTH", payload: true });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <h1>Wallet</h1>
          <label htmlFor="email" className={css.label}>
            Email:
            <Field
              type="email"
              id="email"
              placeholder="E-mail"
              name="email"
              required
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </label>
          <label htmlFor="password">
            Password:
            <Field
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              minLength={6}
              maxLength={12}
              required
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </label>
          <button className={css.loginButton} type="submit">
            Login
          </button>
          <Link to="/register">
            <button className={css.button} type="button">
              Register
            </button>
          </Link>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
