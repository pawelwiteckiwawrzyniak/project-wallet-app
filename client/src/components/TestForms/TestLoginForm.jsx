import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

export const TestLoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
  };
  return (
    <>
      <div>This is a test login form</div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
      <div></div>
    </>
  );
};
