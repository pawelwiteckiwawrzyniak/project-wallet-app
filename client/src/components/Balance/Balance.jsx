import { useAuth } from "../../hooks/userAuth";
import css from "./Balance.module.css";
export const Balance = () => {
  const { balance } = useAuth();

  return (
    <div className={css.balance}>
      <div className={css.wrapper}>
        <div className={css.title}>Your balance</div>
        <div className={css.value}>zł {balance}</div>
      </div>
    </div>
  );
};
