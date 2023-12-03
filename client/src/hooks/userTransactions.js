import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectTransactions,
} from "../redux/transactions/selectors";

export const useTransactions = () => {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return { transactions, isLoading, error };
};
