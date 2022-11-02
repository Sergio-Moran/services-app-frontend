import React from "react";
import Register from "../components/Register";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../components/Layouts/Layout";

const LogPage = () => {
  return (
    <>
      <Layout>
        <Register />
      </Layout>
    </>
  );
};

export default LogPage;
