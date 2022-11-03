import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { getObjects } from "../routes/api.routes";
import { useCookies } from "react-cookie";

const DoughnutChart = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const [chartData, setCharData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });
  const query = async () => {
    let data = {
      accessToken: cookies.accessToken,
      table: "reportAmountUserService",
    };
    const response = await getObjects(data);
    console.log(response.map);
    let dataset = [];
    let label = [];
    for (let i = 0; i < response.length; i++) {
      label.push(response[i].name);
      dataset.push(response[i].total);
    }
    let charData = {
      labels: label,
      datasets: [
        {
          data: dataset,
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    };
    setCharData(charData);
  };

  useEffect(() => {
    query();
  }, []);
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
      <h1>Cantidad de Servicios por Usuario</h1>
    </div>
  );
  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Cantidad de Servicios por Usuario</h5>
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
              type="polarArea"
              data={chartData}
              options={lightOptions}
              style={{ width: "35%", justifyContent: "center" }}
            />
          </div>
        </Card>
      </Sidebar>
      <Card header={headerMin} footer={footer}>
        <div className="card flex justify-content-center">
          <Chart type="polarArea" data={chartData} options={lightOptions} />
        </div>
      </Card>
    </>
  );
};

export default DoughnutChart;
