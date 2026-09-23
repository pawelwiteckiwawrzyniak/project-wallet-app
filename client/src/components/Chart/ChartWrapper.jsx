import { useState } from "react";
import { ChartModel } from "./Chart";
import css from "./Chart.module.css";
import DiagramTab from "../DiagramTab/DiagramTab";
import WrapperCss from "./ChartWrapper.module.css";

export const ChartWrapper = () => {
  const [selectedDate, setSelectedDate] = useState({
    selectedMonth: null,
    selectedYear: null,
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className={WrapperCss.chartWrapper}>
      <div className={css.chart}>
        <p className={css["chart-title"]}>Statistics</p>
        <div className={WrapperCss["chart-container"]}>
          <ChartModel selectedDate={selectedDate} />
        </div>
      </div>
      <div className={WrapperCss.diagram}>
        <DiagramTab onDateChange={handleDateChange} />
      </div>
    </div>
  );
};
