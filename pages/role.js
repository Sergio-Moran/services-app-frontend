import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Layout from "../components/Layouts/Layout";
import FormRole from "../components/FormRole";

const role = () => {
  return (
    <Layout>
        <FormRole />
    </Layout>
  )
}

export default role