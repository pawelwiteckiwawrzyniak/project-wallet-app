import { useDispatch } from "react-redux";

import { useAuth } from "../../hooks/userAuth";
import {
  addTransaction,
  fetchAllTransactions,
} from "../../redux/transactions/operations";
import { useTransactions } from "../../hooks/userTransactions";
import { logOut, refreshUser } from "../../redux/auth/operations";
import { unwrapResult } from "@reduxjs/toolkit";

export const TestAddTransactionForm = () => {
  const dispatch = useDispatch();
  const { transactions } = useTransactions();
  const { user, token } = useAuth();

  const handleSubmit = (ev) => {
    console.log("add transaction");
    ev.preventDefault();
    const form = ev.currentTarget;

    dispatch(
      addTransaction({
        type: form.elements.type.value.toString().trim(),
        category: form.elements.category.value.trim(),
        value: form.elements.value.value.trim(),
        description: form.elements.description.value.trim(),
        date: form.elements.data.value.trim(),
        user: user,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(refreshUser());
      })
      .catch((error) => {
        console.error("Error during transaction:", error);
      });
  };

  const handleGetTransactions = () => {
    dispatch(fetchAllTransactions());
  };

  const handleLogOut = (token) => {
    dispatch(logOut(token));
  };

  return (
    <>
      <div>This is a test transaction form</div>
      <div>User name: {user.name}</div>

      <form onSubmit={handleSubmit}>
        <label>
          type (Income or Expense)
          <input type="text" name="type" />
        </label>
        <label>
          Category ObjectId: 656f4beab51e221a8c1a79d1
          <input type="text" name="category" />
        </label>
        <label>
          Value
          <input type="text" name="value" />
        </label>
        <label>
          comments
          <input type="text" name="description" />
        </label>
        <label>
          data format Date: 2023-07-22
          <input type="text" name="data" />
        </label>

        <button type="submit">Add </button>
        <button type="button" onClick={handleGetTransactions}>
          Get transactions
        </button>
        <div>transactions: {JSON.stringify(transactions)}</div>
        <button type="submit" onClick={() => handleLogOut(token)}>
          Log out
        </button>
      </form>
      <div></div>
    </>
  );
};
