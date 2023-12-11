import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip);

export const ChartModel = () => {
  const [expenses, setExpenses] = useState([]);
  const expensesRedux = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    setExpenses(expensesRedux);
  }, []);

  const generateChartData = () => {
    return {
      labels: expenses.map((expense) => expense.comment),
      datasets: [
        {
          label: "zł",
          data: expenses.map((expense) => expense.summ),
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
