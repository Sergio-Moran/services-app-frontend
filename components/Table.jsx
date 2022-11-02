import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../public/css/Table.module.css";
import { getUsers } from "../routes/api.routes";

import { useCookies } from "react-cookie";
import Layout from "./Layouts/Layout";
const Table = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [info, setInfo] = useState([]);

  const getUser = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    console.log(response);
    setInfo(response);
  }, [cookies.accessToken]);

  useEffect(() => {
    getUser();
  }, []);

  const header = (
    <div className="table-header">
      Users
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <Button onClick={getUser} icon="pi pi-refresh" />
      </div>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={info} header={header} responsiveLayout="scroll">
          <Column field="id" header="Cod."></Column>
          <Column field="name" header="Name"></Column>
          <Column field="mail" header="Email"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
