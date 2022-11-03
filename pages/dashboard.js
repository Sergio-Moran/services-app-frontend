import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layouts/Layout";
import TableServices from "../components/TableServices";
import DoughnutChart from "../components/DChart.jsx";

const menuService = () => {
  return (
    <Layout>
      <DoughnutChart />
    </Layout>
  );
};

export default menuService;
