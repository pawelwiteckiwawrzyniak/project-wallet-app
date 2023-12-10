import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { transactionsReducer } from "../../redux/slices/transactionsSlice";
import 'chart.js/auto';
export const ChartModel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://api.example.com/transactions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch(transactionsReducer.actions.setTransactions(data));
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
        dispatch(transactionsReducer.actions.handleRejected(null, { payload: error.message }));
      }
    };

    fetchData();
  }, [dispatch]);

  const transactionsData = useSelector((state) => state.transactions) || [];
  const filteredTransactions = transactionsData.transactions || [];

  const expenses = filteredTransactions.filter((transaction) => transaction.type === "-");
  const income = filteredTransactions.filter((transaction) => transaction.type === "+");

  const sumExpenses = expenses.reduce((sum, transaction) => sum + transaction.summ, 0);
  const sumIncome = income.reduce((sum, transaction) => sum + transaction.summ, 0);

  const data = transactionsData.transactions.map((transaction) => transaction.summ);
  const backgroundColors = transactionsData.transactions.map((transaction) => transaction.color);

  const chart = {
    labels: transactionsData.transactions.map((transaction) => transaction.category),
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chart} />
    </div>
  );
};
