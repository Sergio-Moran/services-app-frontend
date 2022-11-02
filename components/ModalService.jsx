import React, { useCallback, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { updateUser } from "../routes/api.routes";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ModalService = ({
  id,
  name,
  price,
  description,
  onHide,
  accept,
  empty,
  reject,
  serviceGet,
}) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [dataUser, setDataUser] = useState({
    id: id,
    name: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      updated,
      reject,
    });
  };

  const updated = async () => {
    if (dataUser.name != "") {
      console.log(cookies.accessToken);
      let cookie = { accessToken: cookies.accessToken };
      const response = await updateUser({ ...dataUser }, cookie);
      serviceGet();
      onHide("displayResponsive");
      accept();
    } else if (dataUser.password != "") {
      const response = await updateUser({ ...dataUser }, cookie);
      serviceGet();
      accept();
    } else {
      empty();
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
                id="price"
                name="price"
                placeholder={price}
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
                id="description"
                name="description"
                placeholder={description}
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
          <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Are you sure you want to proceed?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            accept={updated}
            reject={reject}
          />
          <Button
            onClick={() => setVisible(true)}
            icon="pi pi-check"
            label="Confirm"
          />
        </div>
      </div>
    </>
  );
};

export default ModalService;
