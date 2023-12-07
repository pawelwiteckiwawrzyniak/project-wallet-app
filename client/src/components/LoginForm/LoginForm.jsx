import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { logIn } from "../../redux/auth/operations";
import desktopImage from "../../images/desktopImage.jpg";

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
            <img className={css.image} src={desktopImage} alt="desktop image" />
            <h2 className={css.finance}>Finance App</h2>
          </div>
          <div className={css.form}>
            <h1 className={css.title}>Wallet</h1>
            <div className={css.formField}>
              <label htmlFor="email" className={css.label}>
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
              <label htmlFor="password">
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
