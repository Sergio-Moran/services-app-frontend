import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React, { useEffect, useRef } from "react";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";

const Layout = ({ children }) => {
  const items = [
    {
      label: "Services",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          url: "/service"
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
          url: "/register",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
              url: "/table",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
    /* {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    }, */
  ];

  const start = <i className="pi pi-database" style={{ fontSize: "2em" }}></i>;
  const end = (
    <Button
      icon="pi pi-times"
      className="p-button-rounded p-button-secondary p-button-text"
      aria-label="Cancel"
    />
  );

  const footer = (
    <span>
      <Message
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
        }}
        severity="alert"
        text="Services App Copyright &copy;"
      />
    </span>
  );

  return (
    <>
      <div>
        <div className="card">
          <Menubar model={items} start={start} end={end} />
        </div>
      </div>
      <Card title="">{children}</Card>
      <div
        className="footer"
        style={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card
          title=""
          footer={footer}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
          }}
        ></Card>
      </div>
    </>
  );
};

export default Layout;
