import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import MenuBar from "../components/MenuBar";
import FormPayServices from "../components/FormPayServices";
import { useRouter } from 'next/router'
import Layout from "../components/Layouts/Layout";
const menu = () => {
  return (
    <Layout>
      <FormPayServices />
    </Layout>
  );
};

export default menu;
