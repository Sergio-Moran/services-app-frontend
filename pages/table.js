import React from "react";
import Table from "../components/Table";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../components/Layouts/Layout";

const table = () => {
  return (
    <Layout>
      <Table />
    </Layout>
  );
};

export default table;
