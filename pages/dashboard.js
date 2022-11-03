import { useState, React } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layouts/Layout";
import TableServices from "../components/TableServices";
import DoughnutChart from "../components/DChart.jsx";
import StackedChart from "../components/StackedChart";
import PolarChart from "../components/PolarChart";
import PieChart from "../components/PieChart";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const dashboard = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexGrow: 2 }}>
          <DoughnutChart />
        </div>
        <div style={{ flexGrow: 2 }}>
          <PieChart />
        </div>
        <div style={{ flexGrow: 2 }}>
          <DoughnutChart />
        </div>
        <div style={{ flexGrow: 2 }}>
          <PieChart />
        </div>
        <div style={{ flexGrow: 2 }}>
          <StackedChart />
        </div>
      </div>
    </Layout>
  );
};

export default dashboard;
