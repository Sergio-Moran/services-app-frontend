import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";

const FormPayServices = () => {
  return (
    <div
      className="card"
      style={{
        height: "100vh",
      }}
    >
        <h5>Addons</h5>
        <div className="grid p-fluid">
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Username" />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputNumber placeholder="Price" />
              <span className="p-inputgroup-addon">.00</span>
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">www</span>
              <InputText placeholder="Website" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default FormPayServices;
