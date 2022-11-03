import React, { useState } from "react";
import { Chart } from "primereact/chart";

const DoughnutChart = () => {
  const [chartData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  return (
    <>
      <div>
        <div className="card flex justify-content-center">
          <Chart
            type="doughnut"
            data={chartData}
            options={lightOptions}
            style={{ position: "relative", width: "40%" }}
          />
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
