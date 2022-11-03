import React, { Component, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import { insertService } from "../routes/api.routes";

const AddService = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    onSubmit: (data) => {
      setFormData(data);
    },
  });

  const [cookies, setCookie] = useCookies(["accessToken"]);

  const insertedServices = async () => {
    const newService = {
      name: formik.values.name,
      description: formik.values.description,
      price: formik.values.price,
      accessToken: cookies.accessToken,
    };
    const response = await insertService(newService);
    if (response.status) {
      formik.resetForm();
    }
    console.log(response);
    console.log(newService);
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      }}
    >
      <form onSubmit={formik.handleSubmit} className="p-fluid">
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
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-dollar" />
              </span>
              <InputText
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
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
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        &ensp; &ensp; &ensp; &ensp;
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            label="Success"
            type="button"
            className="p-button-rounded p-button-success"
            onClick={insertedServices}
          />
        </div>
      </form>
    </div>
  );
};

export default AddService;
