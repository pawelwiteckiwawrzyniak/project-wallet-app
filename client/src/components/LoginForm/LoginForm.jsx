import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { logIn } from "../../redux/auth/operations";
import loginDesktop from "../../../src/assets/images/login/loginDesktop.png";
import loginDesktop2x from "../../assets/images/login/loginDesktop@2x.png";
import loginTablet from "../../assets/images/login/loginTablet.png";
import loginTablet2x from "../../assets/images/login/loginTablet@2x.png";
import wallet from "../../assets/icons/wallet.svg";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import PropTypes from "prop-types";

const LoginForm = (props) => {
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

  const onSubmit = (values) => {
    dispatch(logIn(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.app}>
          <div className={css.titleImage}>
            <img
              className={css.image}
              src={loginDesktop}
              srcSet={`${loginDesktop} 1x, ${loginDesktop2x} 2x, ${loginTablet} 1x, ${loginTablet2x} 2x`}
              alt="desktop image"
            />
            <h2 className={css.finance}>Finance App</h2>
          </div>
          <div className={css.form}>
            <div className={css.appTitle}>
              <img src={wallet} alt="wallet" />
              <h1 className={css.title}>Wallet</h1>
            </div>
            <div className={css.formField}>
              <label htmlFor="email" className={css.label}>
                <EmailIcon className={css.icon} />
                <Field
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  name="email"
                  className={css.field}
                  required
                />

                {errors.email && touched.email ? (
                  <div className={css.error}>{errors.email}</div>
                ) : null}
              </label>
              <label htmlFor="password" className={css.label}>
                <LockIcon className={css.icon} />
                <Field
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  minLength={6}
                  maxLength={12}
                  className={css.field}
                  required
                />
                {errors.password && touched.password ? (
                  <div className={css.error}>{errors.password}</div>
                ) : null}
              </label>
            </div>
            <button className={css.loginButton} type="submit">
              LOG IN
            </button>

            <button
              className={css.button}
              type="button"
              onClick={props.onRegisterClick}
            >
              <span className={css.register}>REGISTER</span>
            </button>

            {error && <p>{error}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onRegisterClick: PropTypes.func,
};
