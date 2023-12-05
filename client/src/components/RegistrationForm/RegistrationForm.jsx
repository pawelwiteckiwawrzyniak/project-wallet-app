import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be the same")
    .required("Required"),
  name: Yup.string()
    .min(1, "The name must be at least 3 characters")
    .max(12, "The name must be at most 12 characters")
    .required("Required"),
});

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const result = zxcvbn(newPassword);
    setPasswordStrength(result.score);
  };

  const getPasswordStrengthDescription = () => {
    switch (passwordStrength) {
      case 0:
        return { strength: "", color: "" };
      case 1:
        return { strength: "Słabe", color: "red" };
      case 2:
      case 3:
        return { strength: "Dobre", color: "yellow" };
      case 4:
        return { strength: "Silne", color: "green" };
      default:
        return { strength: "Słabe", color: "red" };
    }
  };

  const passwordStrengthDescription = getPasswordStrengthDescription();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        dispatch(saveToken(token));
        dispatch(saveUser(user));
        dispatch(setAuth(true));
      } else {
        const { message } = await response.json();
        setServerError(message);
      }
    } catch (error) {
      setServerError("An unexpected error occured");
    }

    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <h1>Wallet</h1>
          <div>
            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" placeholder="E-mail" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field
              className={css.field}
              type="password"
              placeholder="Password"
              name="password"
              minLength={6}
              maxLength={12}
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <div style={{ color: passwordStrengthDescription.color }}>
              Password Strength: {passwordStrengthDescription.strength}
            </div>
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confrim Password"
              minLength={6}
              maxLength={12}
              required
            />

            <ErrorMessage name="confirmPassword" component="div" />
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              minLength={6}
              maxLength={12}
              required
            />
            <ErrorMessage name="name" component="div" />
          </div>

          <button
            className={css.registerButton}
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>

          <button
            className={css.button}
            type="button"
            disabled={isSubmitting}
            onClick={props.onLoginClick}
          >
            Login
          </button>

          {serverError && <div>{serverError}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
