import React, { useState, useEffect, useCallback, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../public/css/Table.module.css";
import { getUsers, getUser, updateStatus, getObjects } from "../routes/api.routes";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import ModalService from "./ModalService";

const TableServices = () => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [info, setInfo] = useState([]);
  const [responses, setResponses] = useState([]);
  const [userStatus, setUserStatus] = useState();
  const toast = useRef(null);
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const serviceGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken, table:'tbService' };
    const response = await getObjects(cookie);
    console.log(response);
    setInfo(response);
  }, [cookies.accessToken]);

  const getServiceEdit = useCallback(async (props) => {
    /* let cookie = { accessToken: cookies.accessToken };
    const response = await getUser(cookie, props.id);
    if (response.status) {
      setResponses(response);
      onClick("displayResponsive");
    } else {
      console.log("somthing went wrong");
    } */
  }, []);

  const updatedStatus = async (props) => {
    const statusNew = { id: props.id, condition: false, table_name: "tbService" };
    let cookie = { accessToken: cookies.accessToken };
    const response = await updateStatus(statusNew, cookie);
    console.log(response);
  };

  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Confirmed",
      detail: "User Updated Successfully",
      life: 3000,
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

  const empty = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "All Fields Are Empty",
      life: 3000,
    });
  };
  useEffect(() => {
    serviceGet();
  }, []);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
          autoFocus
        />
      </div>
    );
  };

  const buttonEdit = (props) => {
    return (
      <div>
        <Button
          className="p-button-info"
          icon="pi pi-pencil"
          onClick={() => getServiceEdit(props)}
        />
        &ensp;
        <Button
          className="p-button-danger"
          icon="pi pi-trash"
          onClick={() => updatedStatus(props)}
        />
      </div>
    );
  };

  const codeEditor = (props) => {
    return buttonEdit(props);
  };

  const header = (
    <div className="table-header">
      Services
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <Button onClick={serviceGet} icon="pi pi-refresh" />
      </div>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={info} header={header} responsiveLayout="scroll">
          <Column field="id" header="Cod."></Column>
          <Column field="name" header="Service Name"></Column>
          <Column field="price" header="Price"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="" header="Actions" body={codeEditor}></Column>
        </DataTable>

        <Toast ref={toast} />
        <Dialog
          header="Services"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <ModalService
            id={responses.id}
            name={responses.name}
            price={responses.price}
            description={responses.description}
            serviceGet={serviceGet}
            onHide={onHide}
            accept={accept}
            reject={reject}
            empty={empty}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default TableServices;
