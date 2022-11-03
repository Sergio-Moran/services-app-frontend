import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { getObjects } from "../routes/api.routes";
import { useCookies } from "react-cookie";
import randomColor from "randomcolor";

const DoughnutChartService = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const [chartData, setCharData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2",
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });
  const query = async () => {
    let data = {
      accessToken: cookies.accessToken,
      table: "reportAmountServiceUser",
    };
    const response = await getObjects(data);
    console.log(response.map);
    let dataset = [];
    let label = [];
    let colors = [];
    for (let i = 0; i < response.length; i++) {
      label.push(response[i].name);
      dataset.push(response[i].total);
      colors.push(randomColor());
    }
    let charData = {
      labels: label,
      datasets: [
        {
          data: dataset,
          backgroundColor: colors,
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
      <h1>Cantidad de Usuarios por Servicios</h1>
    </div>
  );
  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Cantidad de Usuarios por Servicios</h5>
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

export default DoughnutChartService;
