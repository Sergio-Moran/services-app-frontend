import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

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
      <Card>
        <div className="card flex justify-content-center">
          <Chart type="doughnut" data={chartData} options={lightOptions} />
        </div>
      </Card>
    </>
  );
};

export default DoughnutChart;
