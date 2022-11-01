import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import "../public/css/Table.module.css";
import { getUsers } from "../routes/api.routes";

const Table = () => {
  const [products, setProducts] = useState([]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const getUser = useCallback(async () => {
    const response = await getUsers();
    console.log(response);
    /* setProducts(response); */
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
        <DataTable
          value={products}
          header={header}
          responsiveLayout="scroll"
        >
          <Column field="name" header="Name"></Column>
          <Column
            field="email"
            header="Email"
            body={priceBodyTemplate}
          ></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
