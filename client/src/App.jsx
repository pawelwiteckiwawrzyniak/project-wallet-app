import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Balance } from "./components/Balance/Balance";
import LoginForm from "./components/LoginForm/LoginForm";
import { ChartWrapper } from "./components/Chart/ChartWrapper";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/userAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { refreshUserTest } from "./redux/auth/operations";

function App() {
  const dispatch = useDispatch();
  const { isRefresh } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //use test function
        await dispatch(refreshUserTest());
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Routes>
        {isRefresh ? (
          //there should be a loader
          <Route />
        ) : (
          <Route path="/" element={<ProtectedRoute />}>
            {/* Add components below, which would be display for logged-in user.*/}
            <Route
              path="/"
              element={
                <div>
                  <Balance />
                  <ChartWrapper />
                </div>
              }
            />
          </Route>
        )}
      </Routes>
      <TestStoreReduxComponent />
      <Balance />
      <LoginForm />
      <ChartWrapper />
    </>
  );
}

export default App;
