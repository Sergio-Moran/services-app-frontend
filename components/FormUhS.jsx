import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListBox } from "primereact/listbox";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { getUsers } from "../routes/api.routes";

const FormUhS = (props) => {
  const [user, setUser] = useState("");
  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const userGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    /* console.log(response); */
    setUser(response);
  }, [cookies.accessToken]);

  const userList = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  const serviceList = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  const render = () => {
/*     console.log(user);
    console.log(service); */
  };

  useEffect(() => {
    userGet();
  }, []);
console.log(user);
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
            value={user}
            options={userList}
            onChange={(e) => setUser(e.value)}
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
            value={service}
            options={serviceList}
            onChange={(e) => setService(e.value)}
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
    </div>
  );
};

export default FormUhS;
