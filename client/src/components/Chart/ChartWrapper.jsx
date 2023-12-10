import { ChartModel } from "./Chart";
import css from "./Chart.module.css";
import DiagramTab from "../DiagramTab/DiagramTab";
import WrapperCss from "./ChartWrapper.module.css";

export const ChartWrapper = () => {
  return (
    <div className={WrapperCss.chartWrapper}>
      <div className={css.chart}>
        <p className={css["chart-title"]}>Statistics</p>
        <div className={WrapperCss["chart-container"]}>
          <ChartModel />
        </div>
      </div>
      <div className={WrapperCss.diagram}>
        <DiagramTab />
      </div>
    </div>
  );
};
