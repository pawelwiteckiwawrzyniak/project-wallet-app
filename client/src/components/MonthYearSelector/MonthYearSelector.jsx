
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./MonthYearSelector.module.css";

const MonthYearSelector = ({ transactionsData, onFilterChange, onDateChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sumExpenses, setSumExpenses] = useState(0);
  const [sumIncome, setSumIncome] = useState(0);

  useEffect(() => {
    const filterTransactions = () => {
      const newFilteredTransactions = transactionsData.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          selectedMonth &&
          selectedYear &&
          transactionDate.getMonth() + 1 === selectedMonth.value &&
          transactionDate.getFullYear() === selectedYear.value
        );
      });
      setFilteredTransactions(newFilteredTransactions);
    };

    filterTransactions();
  }, [selectedMonth, selectedYear, transactionsData]);

  useEffect(() => {
    const calculateSums = () => {
      const expenses = filteredTransactions.filter((transaction) => transaction.type === "-");
      const income = filteredTransactions.filter((transaction) => transaction.type === "+");

      const sumExpenses = expenses.reduce((sum, transaction) => sum + transaction.summ, 0);
      const sumIncome = income.reduce((sum, transaction) => sum + transaction.summ, 0);

      setSumExpenses(sumExpenses);
      setSumIncome(sumIncome);

      onFilterChange({
        filteredTransactions,
        sumExpenses,
        sumIncome,
      });
    };

    calculateSums();
  }, [filteredTransactions, onFilterChange]);

  const monthsOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const yearsOptions = [
    { value: 2019, label: 2019 },
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
  ];

  return (
    <div className={styles.monthYearSelector}>
      <div className={styles.selectContainer}>
        <Select
          options={monthsOptions}
          placeholder="Month"
          isSearchable
          value={selectedMonth}
          onChange={(selectedOption) => {
            setSelectedMonth(selectedOption);
            onDateChange({ selectedMonth: selectedOption, selectedYear });
          }}
        />
      </div>
      <div className={styles.selectContainer}>
        <Select
          options={yearsOptions}
          placeholder="Year"
          isSearchable
          value={selectedYear}
          onChange={(selectedOption) => {
            setSelectedYear(selectedOption);
            onDateChange({ selectedMonth, selectedYear: selectedOption });
          }}
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;
