import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../public/css/Table.module.css";
import { getUsers } from "../routes/api.routes";

const Table = () => {
  const [info, setInfo] = useState([]);

  const getUser = useCallback(async () => {
    const response = await getUsers();
    console.log(response);
    setInfo(response);
  }, []);

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
