import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

const PieChart = () => {
  const [chartData] = useState({
    labels: ["True", "False"],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
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
    <Card>
      <div className="card flex justify-content-center">
        <Chart type="pie" data={chartData} options={lightOptions} />
      </div>
    </Card>
  );
};

export default PieChart;
