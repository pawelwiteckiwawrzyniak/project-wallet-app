import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip);

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
