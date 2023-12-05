import { ChartModel } from "./Chart";
import css from "./Chart.module.css";

export const ChartWrapper = () => {
  return (
    <div className={css.chart}>
      <p className={css["chart-title"]}>Statisctics</p>
      <div className={css["chart-wrapper"]}>
        <ChartModel />
      </div>
    </div>
  );
};
