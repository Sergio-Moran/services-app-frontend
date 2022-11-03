import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const DoughnutChart = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
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
  const footer = (
    <div className="flex justify-content-end">
      <Button
        icon="pi pi-th-large"
        onClick={() => setVisibleFullScreen(true)}
        className="mr-2"
      />
    </div>
  );

  const header = (
    <div className="flex justify-content-center">
      <h1>Hola Mundo</h1>
    </div>
  );
  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Hola Mundo</h5>
    </div>
  );
  return (
    <>
      <Sidebar
        visible={visibleFullScreen}
        fullScreen
        onHide={() => setVisibleFullScreen(false)}
      >
        <Card header={header}>
          <div
            className="card flex justify-content-center"
            style={{ justifyContent: "center" }}
          >
            <Chart
              type="doughnut"
              data={chartData}
              options={lightOptions}
              style={{ width: "35%", justifyContent: "center" }}
            />
          </div>
        </Card>
      </Sidebar>
      <Card header={headerMin} footer={footer}>
        <div className="card flex justify-content-center">
          <Chart type="doughnut" data={chartData} options={lightOptions} />
        </div>
      </Card>
    </>
  );
};

export default DoughnutChart;
