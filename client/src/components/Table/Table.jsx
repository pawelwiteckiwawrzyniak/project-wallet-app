import { useDispatch } from "react-redux";
import { useTransactions } from "../../hooks/userTransactions";
import css from "./Table.module.css";
import { deleteTransaction } from "../../redux/transactions/operations";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/transactions/categories";
import { formatDate } from "../../utils/formatDate.js";

export const Table = () => {
  const distpatch = useDispatch();
  const { transactions } = useTransactions();

  // // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const loadCategories = async () => {
  //     const responce = await fetchCategories();
  //     if (responce) {
  //       setCategories(responce);
  //     }
  //   };
  //   loadCategories();
  //   // fetchCategories().then((responce) => {
  //   //   const data = responce.json();
  //   //   console.log("categories", data);
  //   // });
  // }, []);

  const handleDeleteContact = (id) => {
    console.log(id);
    distpatch(deleteTransaction(id));
  };

  return (
    <div className={css.wrapper}>
      <table className={css.table}>
        <thead className={css["table-head"]}>
          <tr className={css["table-head-row"]}>
            <td>Date</td>
            <td>Type</td>
            <td>Category</td>
            <td>Comment</td>
            <td>Sum</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction._id} className={css["table-body-row"]}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.value}</td>
                <td>
                  <svg
                    className={css.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 13"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_37400_514)">
                      <path
                        d="M10.5001 5.83343L8.16672 3.5001M1.45837 12.5418L3.43259 12.3224C3.67379 12.2956 3.79439 12.2822 3.90712 12.2457C4.00713 12.2133 4.1023 12.1676 4.19006 12.1097C4.28897 12.0445 4.37478 11.9587 4.54638 11.7871L12.2501 4.08343C12.8944 3.4391 12.8944 2.39443 12.2501 1.75009C11.6057 1.10576 10.5611 1.10576 9.91672 1.75009L2.21305 9.45375C2.04144 9.62536 1.95564 9.71116 1.89041 9.81008C1.83254 9.89783 1.7868 9.99301 1.75442 10.093C1.71793 10.2057 1.70453 10.3263 1.67773 10.5675L1.45837 12.5418Z"
                        stroke="black"
                        strokeOpacity="0.8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_37400_514">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </td>
                <td>
                  <button
                    className={css["delete-button"]}
                    onClick={() => handleDeleteContact(transaction._id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
