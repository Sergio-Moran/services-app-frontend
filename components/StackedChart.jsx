import React, { useState } from "react";
import { Chart } from "primereact/chart";

const StackedChart = () => {
  const [stackedData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        backgroundColor: "#42A5F5",
        data: [50, 25, 12, 48, 90, 76, 42],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "#66BB6A",
        data: [21, 84, 24, 75, 37, 65, 34],
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "#FFA726",
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  });
  const getLightTheme = () => {
    let stackedOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      stackedOptions,
    };
  };

  const { stackedOptions } = getLightTheme();

  return (
    <div>
      <div className="card">
        <h5>Stacked</h5>
        <Chart type="bar" data={stackedData} options={stackedOptions} />
      </div>
    </div>
  );
};

export default StackedChart;
