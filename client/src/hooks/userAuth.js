import { useSelector } from "react-redux";
import {
  selectBalance,
  selectIsAuth,
  selectIsRefresh,
  selectToken,
  selectUser,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const balance = useSelector(selectBalance);
  const isAuth = useSelector(selectIsAuth);
  const isRefresh = useSelector(selectIsRefresh);
  return { user, token, balance, isAuth, isRefresh };
};
