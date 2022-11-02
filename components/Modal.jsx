import React, { useCallback, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";

const Modal = ({id,name, mail}) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const deleted = (props) => {
    console.log(props.id);
  };

  return (
    <>
      <div
        className="card"
        style={{
          height: "auto",
          padding: 10,
        }}
      >
        <div className="grid p-fluid">
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder={name} />
            </div>
          </div>
          &ensp;
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">< i className="pi pi-google"/></span>
              <InputText disabled placeholder={mail} className="" />
            </div>
          </div>
          &ensp;
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">www</span>
              <InputText placeholder="New Password" />
            </div>
          </div>
        </div>
        &ensp;
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button label="Edit" className="p-button-rounded p-button-success" />
        </div>
      </div>
    </>
  );
};

export default Modal;
