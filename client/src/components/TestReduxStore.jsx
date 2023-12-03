import { useAuth } from "../hooks/userAuth";
import { useTransactions } from "../hooks/userTransactions";

export const TestComponent = () => {
  const { user, token, balance, isAuth, isRefresh } = useAuth();
  const { transactions, isLoading, error } = useTransactions();

  console.log(
    "username:",
    user.name,
    "useremail:",
    user.email,
    "token:",
    token,
    "balance:",
    balance,
    "isAuth:",
    isAuth,
    "isRefresh:",
    isRefresh,
    "transactions:",
    transactions,
    "isLoading",
    isLoading,
    "error",
    error
  );

  return (
    <>
      <div>test</div>
    </>
  );
};
