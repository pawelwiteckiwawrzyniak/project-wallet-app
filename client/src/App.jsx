import "./App.css";
import { TestStoreReduxComponent } from "./components/TestReduxStore";
import { Balance } from "./components/Balance/Balance";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <>
      <TestStoreReduxComponent />
      <Balance />
      <LoginForm />
    </>
  );
}

export default App;
