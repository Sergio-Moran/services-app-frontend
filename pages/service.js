import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import AddService from "../components/AddService";
import Layout from "../components/Layouts/Layout";

const service = () => {
  return (
    <Layout>
        <AddService />
    </Layout>
  )
}

export default service