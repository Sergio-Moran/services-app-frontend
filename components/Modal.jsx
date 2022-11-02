import React, { useCallback, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { updateUser } from "../routes/api.routes";

const Modal = ({ id, name, mail }) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [dataUser, setDataUser] = useState({
    id: id,
    name: "",
    password: "",
  });

  const updatedUser = async () => {
    if (dataUser.name != "") {
      let cookie = { accessToken: cookies.accessToken };
      const response = await updateUser({ ...dataUser }, cookie);
    } else if (dataUser.password != "") {
      const response = await updateUser({ ...dataUser }, cookie);
    } else {
      console.log("Empty");
    }
  };

  const handlChange = (name, value) => {
    setDataUser({
      ...dataUser,
      [name]: value,
    });
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
              <InputText
                id="name"
                name="name"
                placeholder={name}
                onChange={(e) => handlChange(e.target.id, e.target.value)}
              />
            </div>
          </div>
          &ensp;
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-google" />
              </span>
              <InputText
                id="mail"
                name="mail"
                placeholder={mail}
                disabled
                onChange={(e) => handlChange(e.target.id, e.target.value)}
              />
            </div>
          </div>
          &ensp;
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock" />
              </span>
              <InputText
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
                onChange={(e) => handlChange(e.target.id, e.target.value)}
              />
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
          <Button
            label="Edit"
            className="p-button-rounded p-button-success"
            onClick={updatedUser}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;