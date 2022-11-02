import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../public/css/Table.module.css";
import { getUsers, getUser } from "../routes/api.routes";
import { useCookies } from "react-cookie";
import { Dialog } from "primereact/dialog";
import Modal from "./Modal";

const Table = () => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [info, setInfo] = useState([]);
  const [responses, setResponses] = useState([]);

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

  const userGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    console.log(response);
    setInfo(response);
  }, [cookies.accessToken]);

  const getUserEdit = useCallback(async (props) => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUser(cookie, props.id);
    if (response.status) {
      setResponses(response);
      onClick("displayResponsive");
    } else {
      console.log("somthing went wrong");
    }
  }, []);

  const deleted = (props) => {
    console.log(props.id);
  };

  useEffect(() => {
    userGet();
  }, []);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-check"
          onClick={() => onHide(name)}
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
          onClick={(e) => getUserEdit(props)}
        />
        &ensp;
        <Button
          className="p-button-danger"
          icon="pi pi-trash"
          onClick={(e) => deleted(props)}
        />
      </div>
    );
  };

  const codeEditor = (props) => {
    return buttonEdit(props);
  };

  const header = (
    <div className="table-header">
      Users
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <Button onClick={userGet} icon="pi pi-refresh" />
      </div>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={info} header={header} responsiveLayout="scroll">
          <Column field="id" header="Cod."></Column>
          <Column field="name" header="Name"></Column>
          <Column field="mail" header="Email"></Column>
          <Column field="" header="Actions" body={codeEditor}></Column>
        </DataTable>
        <Dialog
          header="Header"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <Modal id={responses.id} name={responses.name} mail={responses.mail} />
        </Dialog>
      </div>
    </div>
  );
};

export default Table;
