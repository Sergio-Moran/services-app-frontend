import React, { useCallback, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { updateUser } from "../routes/api.routes";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ModalService = ({
  idService,
  idPrice,
  nameService,
  price,
  descriptionService,
  onHide,
  accept,
  empty,
  reject,
  serviceGet,
}) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [dataService, setService] = useState({
    id: idService,
    name: "",
    description: "",
  });

  const [dataPrice, setPrice] = useState({
    id: idPrice,
    price: "",
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
    setService({
      ...dataService,
      [name]: value,
    });
    setPrice({
      ...dataPrice,
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
                <i className="pi pi-cog"></i>
              </span>
              <InputText
                id="name"
                name="name"
                placeholder={nameService}
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
                type="number"
                id="price"
                name="price"
                placeholder={price}
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
                placeholder={descriptionService}
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
