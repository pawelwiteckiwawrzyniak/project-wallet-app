import "./App.css";
import { TestStoreReduxComponent } from "./components/TestReduxStore";
import { Balance } from "./components/Balance/Balance";

function App() {
  return (
    <>
      <TestStoreReduxComponent />
      <Balance />
    </>
  );
}

export default App;
