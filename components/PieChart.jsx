import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { getCountStatus } from "../routes/api.routes";
import { useCookies } from "react-cookie";

const PieChart = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const [chartData, setCharData] = useState({
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  });

  const querys = async () => {
    let data = { accessToken: cookies.accessToken, table: "tbService" };
    const response = await getCountStatus(data);
    let charData = {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          data: [response.true, response.false],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    };
    setCharData(charData);
  };

  useEffect(() => {
    querys();
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
      <h1>Estado de los Servicios</h1>
    </div>
  );
  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Estado de los Servicios</h5>
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
              type="pie"
              data={chartData}
              options={lightOptions}
              style={{ width: "35%", justifyContent: "center" }}
            />
          </div>
        </Card>
      </Sidebar>
      <Card footer={footer} header={headerMin}>
        <div className="card flex justify-content-center">
          <Chart type="pie" data={chartData} options={lightOptions} />
        </div>
      </Card>
    </>
  );
};

export default PieChart;
