import React, { useEffect, useState } from "react";
import css from "./DiagramTab.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../redux/transactions/operations";
import MonthYearSelector from "../MonthYearSelector/MonthYearSelector";

const getCategoryColor = (category) => {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(`--color-category-${category}`);
};

const DiagramTab = ({ onDateChange }) => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState({
    filteredTransactions: [],
    sumExpenses: 0,
    sumIncome: 0,
  });

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const transactionsData = useSelector((state) => state.transactions) || [];

  const handleFilterChange = (newFilteredData) => {
    if (
      JSON.stringify(filteredData.filteredTransactions) !==
        JSON.stringify(newFilteredData.filteredTransactions) ||
      filteredData.sumExpenses !== newFilteredData.sumExpenses ||
      filteredData.sumIncome !== newFilteredData.sumIncome
    ) {
      setFilteredData(newFilteredData);
    }
  };

  const handleDateChange = (newDate) => {
    onDateChange(newDate);
  };

  return (
    <div className={css.diagramTab}>
      <div className={css.filters}>
        <MonthYearSelector
          transactionsData={transactionsData.transactions}
          onFilterChange={handleFilterChange}
          onDateChange={handleDateChange}
        />
      </div>
      <div className={css.tableArea}>
        <div className={css.tableHeader}>
          <div>Category</div>
          <div>SUM</div>
        </div>
        <div className={css.tableBody}>
          {filteredData.filteredTransactions.map((transaction, index) => (
            <div key={index} className={css.categoryRow}>
              <div
                className={css.categoryColorSquare}
                style={{
                  backgroundColor:
                    transaction.color ||
                    getCategoryColor(transaction.category),
                }}
              ></div>
              <div className={css.category}>{transaction.category}</div>
              <div className={css.sumColumn}>{transaction.summ}</div>
            </div>
          ))}
          <div className={css.totalRow}>
            <div>Total Expenses:</div>
            <div className={css.sumColumn}>{filteredData.sumExpenses}</div>
          </div>
          <div className={css.totalRow}>
            <div>Total Income:</div>
            <div className={css.sumColumn}>{filteredData.sumIncome}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramTab;
