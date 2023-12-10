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
    const handleResize = () => {
      if (chartRef.current && chartRef.current.chartInstance) {
      
        chartRef.current.chartInstance.width = window.innerWidth;
    
        chartRef.current.chartInstance.resize();
      }
    };

  
    window.addEventListener("resize", handleResize);

    return () => {
      // Czyszczenie nasłuchiwania po odmontowaniu komponentu
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, selectedDate, transactionsData]);

  useEffect(() => {
    if (chartRef.current && selectedDate.selectedMonth && selectedDate.selectedYear) {
      const filteredTransactions = transactionsData.transactions.filter(
        (transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() + 1 === selectedDate.selectedMonth.value &&
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
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#dddddd'],
            borderColor: ['#dddddd'],
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

  const updateChart = (filteredTransactions) => {
    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Ustawienie szerokości diagramu na 100%
      const ctx = chartRef.current.getContext("2d");
      ctx.canvas.style.width = '100%';

      const data = {
        labels: filteredTransactions.map((transaction) => transaction.category),
        datasets: [
          {
            data: filteredTransactions.map((transaction) => transaction.summ),
            backgroundColor: filteredTransactions.map((transaction) =>
              getCategoryColor(transaction.category)
            ),
            borderColor: filteredTransactions.map((transaction) =>
              getCategoryColor(transaction.category)
            ),
            borderWidth: 1,
          },
        ],
      };

      chartRef.current.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data,
      });
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <canvas ref={chartRef} style={{ width: '100%' }} />
    </div>
  );
};
