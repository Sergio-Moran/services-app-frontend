import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListBox } from "primereact/listbox";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { getObjects, getUsers } from "../routes/api.routes";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const FormUhS = (props) => {
  const [user, setUser] = useState("");
  const [dataU, setDataU] = useState("");
  const [dataS, setDataS] = useState("");
  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  let userElement = [];
  let serviceElement = [];

  const userGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    setUser(response);
  }, [cookies.accessToken]);

  const serviceGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "getServiceWithPrices",
    };
    const response = await getObjects(cookie);
    setService(response);
  }, [cookies.accessToken]);

  for (let i = 0; i < user.length; i++) {
    userElement.push({ label: user[i].name, value: user[i].id });
  }

  for (let i = 0; i < service.length; i++) {
    serviceElement.push({ label: service[i].name, value: service[i].id });
  }

  const render = () => {
    console.log(dataU);
    console.log(dataS);
  };

  useEffect(() => {
    userGet();
    serviceGet();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 50,
        }}
      >
        <Card
          className="p-card"
          style={{
            width: "25rem",
          }}
        >
          <ListBox
            value={dataU}
            options={userElement}
            onChange={(e) => setDataU(e.value)}
            listStyle={{ maxHeight: "250px" }}
          />
        </Card>
        <Card
          className="p-card"
          style={{
            width: "25rem",
          }}
        >
          <ListBox
            value={dataS}
            options={serviceElement}
            onChange={(e) => setDataS(e.value)}
            listStyle={{ maxHeight: "250px" }}
          />
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
          aria-label="Cancel"
        />
        &ensp;
        <Button
          icon="pi pi-check"
          className="p-button-rounded"
          aria-label="Filter"
          onClick={render}
        />
      </div>
      &ensp;
      <div className="card">
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
    </div>
  );
};

export default FormUhS;
