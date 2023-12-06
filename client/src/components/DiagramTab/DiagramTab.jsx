import React, { useState } from "react";
import Select from "react-select";
import css from "./DiagramTab.module.css";
import { useSelector } from "react-redux";

const monthsOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const yearsOptions = [
  { value: 2019, label: 2019 },
  { value: 2020, label: 2020 },
  { value: 2021, label: 2021 },
  { value: 2022, label: 2022 },
  { value: 2023, label: 2023 },
];

const DiagramTab = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const authData = useSelector((state) => state.auth);
  const transactionsData = useSelector((state) => state.transactions) || [];
  const globalData = useSelector((state) => state.global);


  const filteredTransactions = transactionsData.transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.data);
    return (
      (!selectedMonth || transactionDate.getMonth() === monthsOptions.findIndex((month) => month.value === selectedMonth.value)) &&
      (!selectedYear || transactionDate.getFullYear() === selectedYear.value)
    );
  });

  
  const expenses = filteredTransactions.filter(transaction => transaction.type === "-");
  const income = filteredTransactions.filter(transaction => transaction.type === "+");


  const mergedTransactions = [...expenses, ...income];


  const sumExpenses = expenses.reduce((sum, transaction) => sum + transaction.summ, 0);
  const sumIncome = income.reduce((sum, transaction) => sum + transaction.summ, 0);

  return (
    <div className={css.diagramTab}>
      <div className={css.filters}>
        <Select
          options={monthsOptions}
          placeholder="Select month"
          isSearchable
          value={selectedMonth}
          onChange={(selectedOption) => setSelectedMonth(selectedOption)}
        />
        <Select
          options={yearsOptions}
          placeholder="Select year"
          isSearchable
          value={selectedYear}
          onChange={(selectedOption) => setSelectedYear(selectedOption)}
        />
      </div>
      <div className={css.tableArea}>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mergedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.category}</td>
                <td>{transaction.summ}</td>
              </tr>
            ))}
            <tr>
              <td>Total Expenses:</td>
              <td>{sumExpenses}</td>
              <td></td>
            </tr>
            <tr>
              <td>Total Income:</td>
              <td>{sumIncome}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagramTab;
