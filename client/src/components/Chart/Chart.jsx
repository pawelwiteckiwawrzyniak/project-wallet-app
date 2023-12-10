import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";

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

export const ChartModel = () => {
  const [expenses, setExpenses] = useState([]);
  const tokenRedux = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/transactions", {
          headers: {
            Authorization: `Bearer ${tokenRedux}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Expenses:", data.data);
        setExpenses(data.data);
      } catch (error) {
        console.error("Error fetching expenses data:", error.message);
      }
    };

    fetchExpenses();
  }, []);

  const generateChartData = () => {
    return {
      labels: expenses.map((expense) => expense.description),
      datasets: [
        {
          label: "zł",
          data: expenses.map((expense) => expense.value),
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chart = generateChartData();

  return (
    <div>
      {expenses.length > 0 && <Doughnut data={chart} />}
      {expenses.length === 0 && <p>Loading expenses...</p>}

    </div>
  );
};
