import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import randomColor from "randomcolor";
import { useCookies } from "react-cookie";
import { getObjects } from "../routes/api.routes";

const BarChar = () => {
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const [basicData, setBasicData] = useState({});

  const query = async () => {
    let data = {
      accessToken: cookies.accessToken,
      table: "reportAmountPaymentService",
    };
    const response = await getObjects(data);
    console.log(response.map);
    let dataset = [];
    let label = [];
    for (let i = 0; i < response.length; i++) {
      label.push(response[i].service_name);
      dataset.push(response[i].payments);
    }
    let charData = {
      labels: label,
      datasets: [
        {
          label: "Payments",
          backgroundColor: randomColor(),
          data: dataset,
        },
      ],
    };
    setBasicData(charData);
  };

  useEffect(() => {
    query();
  }, []);

  const getLightTheme = () => {
    let horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
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
      horizontalOptions,
      stackedOptions,
    };
  };

  const { horizontalOptions } = getLightTheme();

  const headerMin = (
    <div className="flex justify-content-center">
      <h5>Cantidad de Pagos por Servicio</h5>
    </div>
  );
  return (
    <>
      <Card header={headerMin}>
        <div className="card">
          <Chart type="bar" data={basicData} options={horizontalOptions} />
        </div>
      </Card>
    </>
  );
};

export default BarChar;
