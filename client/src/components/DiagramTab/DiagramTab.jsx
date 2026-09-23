import React, { useEffect, useState } from "react";
import css from "./DiagramTab.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../redux/transactions/operations";
import MonthYearSelector from "../MonthYearSelector/MonthYearSelector";

const getCategoryColor = (category) => {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(`--color-category-${category}`);
};

const DiagramTab = () => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState({
    filteredTransactions: [],
    sumExpenses: 0,
    sumIncome: 0,
  });

  const [filterChanged, setFilterChanged] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);

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
      setFilterChanged(true);
      setDateChanged(false);
    }
  };

  const handleDateChange = (newDate) => {
    setDateChanged(true);
    setFilterChanged(false);
  };

  return (
    <div
      className={`${css.diagramTab} ${
        filterChanged ? css.onFilterChange : ""
      } ${dateChanged ? css.onDateChange : ""}`}
    >
      <div className={css.filterContainer}>
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
          {filteredData.filteredTransactions.length > 0 ? (
            filteredData.filteredTransactions.map((transaction) => (
              <div key={transaction.id} className={css.categoryRow}>
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
            ))
          ) : (
            <div className={css.noTransactionsMessage}>
              No transactions available.
            </div>
          )}
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
