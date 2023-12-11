import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTransactions } from "../../redux/transactions/operations";
import { useTransactions } from "../../hooks/userTransactions";
// import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip);

export const ChartModel = () => {
  const [chartData, setChartData] = useState({});
  const { transactions } = useTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    const generateChartData = (transactions) => {
      console.log("transactions", transactions);
      return {
        labels: transactions.map((transaction) => transaction.description),
        datasets: [
          {
            label: "zł",
            data: transactions.map((transaction) => transaction.value),
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

    setChartData(generateChartData(transactions));
  }, [transactions]);

  return (
    <div>
      {transactions.length > 0 && <Doughnut data={chartData} />}
      {transactions.length === 0 && <p>Loading expenses...</p>}
    </div>
  );
};
