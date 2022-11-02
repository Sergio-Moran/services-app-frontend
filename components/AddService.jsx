import React, { Component, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";

const AddService = () => {
  const [dataService, setDataService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const insertedServices = async () => {
    let cookie = { accessToken: cookies.accessToken };
    /* const response = await insertService({ ...dataUser }, cookie);
    console.log(response); */
    console.log(dataService);
  };

  const handlChange = (name, value) => {
    setDataService({
      ...dataService,
      [name]: value,
    });
  };

  return (
    <div
      className="card"
      style={{
        height: "100vh",
      }}
    >
      <h5>New Service</h5>
      <div className="grid p-fluid">
        <div className="col-12 md:col-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-cog"></i>
            </span>
            <InputText
              id="name"
              name="name"
              placeholder="Insert new service"
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 md:col-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-dollar" />
            </span>
            <InputText
              id="price"
              name="price"
              placeholder="Price"
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
            <span className="p-inputgroup-addon">.00</span>
          </div>
        </div>

        <div className="col-12 md:col-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-pencil" />
            </span>
            <InputText
              id="description"
              name="description"
              placeholder="Description"
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          label="Success"
          className="p-button-rounded p-button-success"
          onClick={insertedServices}
        />
      </div>
    </div>
  );
};

export default AddService;
