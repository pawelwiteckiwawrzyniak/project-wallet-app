import "./App.css";
import { TestStoreReduxComponent } from "./components/TestReduxStore";
import { Balance } from "./components/Balance/Balance";
import LoginForm from "./components/LoginForm/LoginForm";
import { ChartWrapper } from "./components/Chart/ChartWrapper";

function App() {
  return (
    <>
      <TestStoreReduxComponent />
      <Balance />
      <LoginForm />
      <ChartWrapper />
    </>
  );
}

export default App;
