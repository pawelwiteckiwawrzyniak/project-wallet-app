import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import registerDesktop from "../../../src/assets/images/registration/registerDesktop.png";
import registerDesktop2x from "../../assets/images/registration/registerDesktop@2x.png";
import registerTablet from "../../assets/images/registration/registerTablet.png";
import registerTablet2x from "../../assets/images/registration/registerTablet@2x.png";
import wallet from "../../assets/icons/wallet.svg";
import lock from "../../assets/icons/lock.svg";
import email from "../../assets/icons/email.svg";
import name from "../../assets/icons/name.svg";

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
        return { strength: "Too short to assess", color: "" };
      case 1:
        return { strength: "Weak", color: "red" };
      case 2:
      case 3:
        return { strength: "Good", color: "yellow" };
      case 4:
        return { strength: "Strong", color: "green" };
      default:
        return { strength: "Weak", color: "red" };
    }
  };

  const passwordStrengthDescription = getPasswordStrengthDescription();

  const handleSubmit = (values) => {
    dispatch(register(values));
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
        <Form className={css.app}>
          <div className={css.titleImage}>
            <img
              className={css.image}
              src={registerDesktop}
              srcSet={`${registerDesktop} 1x, ${registerDesktop2x} 2x, ${registerTablet} 1x, ${registerTablet2x} 2x`}
              alt="desktop image"
            />
            <h2 className={css.finance}>Finance App</h2>
          </div>
          <div className={css.form}>
            <div className={css.appTitle}>
              <img src={wallet} alt="wallet" />
              <h1 className={css.title}>Wallet</h1>
            </div>
            <div className={css.label}>
              <img className={css.icon} src={email} alt="email" />
              <label htmlFor="email">
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={css.field}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>

            <div className={css.label}>
              <label htmlFor="password">
                <img className={css.icon} src={css.icon} alt="lock" />
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
              </label>
              <div style={{ color: passwordStrengthDescription.color }}>
                Password Strength: {passwordStrengthDescription.strength}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.label}>
              <label htmlFor="confirmPassword">
                <img className={css.icon} src={lock} alt="lock" />
                <Field
                  className={css.field}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  minLength={6}
                  maxLength={12}
                  required
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>

            <div className={css.label}>
              <label htmlFor="name">
                <img className={css.icon} src={name} alt="name" />
                <Field
                  className={css.field}
                  type="text"
                  name="name"
                  placeholder="Name"
                  minLength={6}
                  maxLength={12}
                  required
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>

            <button
              className={css.registerButton}
              type="submit"
              disabled={isSubmitting}
            >
              REGISTER
            </button>

            <button
              className={css.button}
              type="button"
              disabled={isSubmitting}
              onClick={props.onLoginClick}
            >
              <span className={css.login}>LOG IN</span>
            </button>

            {serverError && <div>{serverError}</div>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
