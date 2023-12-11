import { useState } from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";

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
    .min(3, "The name must be at least 3 characters")
    .max(12, "The name must be at most 12 characters")
    .required("Required"),
});

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  /* const [password, setPassword] = useState(""); */
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (event, setFieldValue) => {
    const newPassword = event.target.value;
    setFieldValue("password", newPassword);
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
    console.log("Submitting form with values:", values);
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
      {({ errors, touched, setFieldValue }) => (
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
              <label htmlFor="email">
                <EmailIcon className={css.icon} />
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={css.field}
                />
                {/* <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                /> */}
                {touched.email && errors.email && (
                  <div className={css.error}>{errors.email}</div>
                )}
              </label>
            </div>

            <div className={css.label}>
              <label htmlFor="password">
                <LockIcon className={css.icon} />
                <Field
                  className={css.field}
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={(event) => {
                    handlePasswordChange(event, setFieldValue);
                  }}
                />
              </label>
              <div style={{ color: passwordStrengthDescription.color }}>
                Password Strength: {passwordStrengthDescription.strength}
              </div>
              {/* <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              /> */}
              {touched.password && errors.password && (
                <div className={css.error}>{errors.password}</div>
              )}
            </div>

            <div className={css.label}>
              <label htmlFor="confirmPassword">
                <LockIcon className={css.icon} />
                <Field
                  className={css.field}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
                {/* <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={css.error}
                /> */}
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className={css.error}>{errors.confirmPassword}</div>
                )}
              </label>
            </div>

            <div className={css.label}>
              <label htmlFor="name">
                <AccountCircleIcon className={css.icon} />
                <Field
                  className={css.field}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                {/* <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                /> */}
                {touched.name && errors.name && (
                  <div className={css.error}>{errors.name}</div>
                )}
              </label>
            </div>

            <button
              className={css.registerButton}
              type="submit"
              /* disabled={isSubmitting} */
              disabled={isSubmitting || Object.keys(errors).length > 0}
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

SignupForm.propTypes = {
  onLoginClick: PropTypes.func,
};
