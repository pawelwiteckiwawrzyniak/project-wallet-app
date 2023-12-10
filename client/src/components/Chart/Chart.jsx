import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../redux/transactions/operations";
import Chart from "chart.js/auto";

const getCategoryColor = (category) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--color-category-${category}`
  );
};

export const ChartModel = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const transactionsData = useSelector((state) => state.transactions) || [];
  const [filteredData, setFilteredData] = useState({
    filteredTransactions: [],
    sumExpenses: 0,
    sumIncome: 0,
  });

  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (
      chartRef.current &&
      selectedDate.selectedMonth &&
      selectedDate.selectedYear
    ) {
      const filteredTransactions = transactionsData.transactions.filter(
        (transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() + 1 ===
              selectedDate.selectedMonth.value &&
            transactionDate.getFullYear() === selectedDate.selectedYear.value
          );
        }
      );

      setFilteredData({
        filteredTransactions,
        sumExpenses: 0,
        sumIncome: 0,
      });

      updateChart(filteredTransactions);
    } else {
      setFilteredData({
        filteredTransactions: [],
        sumExpenses: 0,
        sumIncome: 0,
      });

      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const data = {
        labels: ["No Data"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#dddddd"],
            borderColor: ["#dddddd"],
            borderWidth: 1,
          },
        ],
      };

      chartRef.current.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data,
      });
    }
  }, [dispatch, selectedDate, transactionsData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};
