import React, { useCallback, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { updateUser } from "../routes/api.routes";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const Modal = ({ id, name, mail }) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [dataUser, setDataUser] = useState({
    id: id,
    name: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Confirmed",
      detail: "User Updated Successfully",
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      updated,
      reject,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const updated = async () => {
    if (dataUser.name != "") {
      console.log(cookies.accessToken);
      let cookie = { accessToken: cookies.accessToken };
      const response = await updateUser({ ...dataUser }, cookie);
      accept();
    } else if (dataUser.password != "") {
      const response = await updateUser({ ...dataUser }, cookie);
      accept();
    } else {
      console.log("Empty");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "All Fields Are Empty",
        life: 3000,
      });
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
        <Toast ref={toast} />
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

export default Modal;
