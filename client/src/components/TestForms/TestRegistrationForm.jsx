import { useDispatch } from "react-redux";
import { logOut, register } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/userAuth";

export const TestRegistrationForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };
  const { user, token, balance, isAuth } = useAuth();
  console.log("TestRegistrationForm", user, token, balance, isAuth);
  const handleLogOut = (token) => {
    dispatch(logOut(token));
  };

  return (
    <div>
      An error occurs when refreshing the page after user registration, as the
      token is not received from the server following registration.
      <div>This is a test registration form</div>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            required
            title="The password must be at least 8 characters long."
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <button type="submit" onClick={() => handleLogOut(token)}>
        Log out
      </button>
    </div>
  );
};
