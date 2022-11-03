import React, { useState, useEffect, useCallback, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../public/css/Table.module.css";
import {
  updateStatus,
  getObjects,
} from "../routes/api.routes";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import ModalUhS from "./ModalUhS";
import { useRouter } from "next/router";

const TableMR = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [info, setInfo] = useState([]);
  const [position, setPosition] = useState("center");
  const [responses, setResponses] = useState([]);
  const toast = useRef(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const userHasServiceGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "reportPaymentRecord",
    };
    const response = await getObjects(cookie);
    console.log(response);
    setInfo(response);
  }, [cookies.accessToken]);

  const getUhS = useCallback(async (props) => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "reportPaymentRecord",
    };
    const response = await getObjects(cookie);
    if (response.status) {
      setResponses(response);
      onClick("displayResponsive");
    } else {
      console.log("somthing went wrong");
    }
  }, []);

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
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

  const goForm = () => {
    router.push("/formPayService");
  };

  const empty = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "All Fields Are Empty",
      life: 3000,
    });
  };

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
  const updatedStatus = async (props) => {
    const statusNew = {
      id: props.id,
      condition: false,
      table_name: "tbPaymentRecord",
    };
    let cookie = { accessToken: cookies.accessToken };
    const response = await updateStatus(statusNew, cookie);
    userHasServiceGet();
    console.log(response);
  };

  const buttonEdit = (props) => {
    return (
      <div>
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

  useEffect(() => {
    userHasServiceGet();
  }, []);

  const header = (
    <div className="table-header">
      Payment Recod
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={goForm}
          icon="pi pi-plus"
          className="p-button-success"
        />
        &ensp; &ensp;
        <Button onClick={userHasServiceGet} icon="pi pi-refresh" />
      </div>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={info} header={header} responsiveLayout="scroll">
          <Column field="id" header="Cod."></Column>
          <Column field="service_name" header="Service"></Column>
          <Column field="description" header="Comment"></Column>
          <Column field="user_name" header="Customer"></Column>
          <Column field="method_name" header="Payment Method"></Column>
          <Column field="period" header="Date"></Column>
          <Column field="interest" header="Interest"></Column>
          <Column field="" header="Actions" body={codeEditor}></Column>
        </DataTable>

        <Toast ref={toast} />
        <Dialog
          header="Header"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <ModalUhS />
        </Dialog>
      </div>
    </div>
  );
};

export default TableMR;
