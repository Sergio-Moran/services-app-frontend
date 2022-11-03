import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { useCookies } from "react-cookie";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import randomColor from "randomcolor";

const StackedChart = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const [stackedData, setStackedData] = useState({
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
        data: [0, 84, 24, 75, 37, 65, 34],
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

  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Estado de los Servicios</h5>
    </div>
  );
  return (
    <>
      <Card header={headerMin}>
        <div className="card">
          <Chart type="bar" data={stackedData} options={stackedOptions} />
        </div>
      </Card>
    </>
  );
};

export default StackedChart;
