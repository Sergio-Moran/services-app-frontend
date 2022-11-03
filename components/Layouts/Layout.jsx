import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { getRole } from "../../routes/api.routes";

const Layout = ({ children }) => {
  const [cookies] = useCookies(["accessToken", "userId"]);

  const [items, setItems] = useState([
    {
      label: "Services",
      icon: "pi pi-fw pi-credit-card",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          url: "/service",
        },
        {
          label: "List",
          icon: "pi pi-fw pi-bars",
          url: "/menuService",
        },
        {
          separator: true,
        },
        {
          label: "User has Service",
          icon: "pi pi-folder",
          url: "/tableUhS",
        },
      ],
    },
    {
      label: "Pay",
      icon: "pi pi-fw pi-money-bill",
      url: "/pay",
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
  ]);

  //OPCIONES DE MENU PARA USUARIO
  let itemsUser = [
    {
      label: "Services",
      icon: "pi pi-fw pi-credit-card",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          url: "/service",
        },
        {
          label: "List",
          icon: "pi pi-fw pi-bars",
          url: "/menuService",
        },
        {
          separator: true,
        },
        {
          label: "User has Service",
          icon: "pi pi-folder",
          url: "/tableUhS",
        },
      ],
    },
    {
      label: "Pay",
      icon: "pi pi-fw pi-money-bill",
      url: "/pay",
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
  ];

  const query = async () => {
    let data = {
      accessToken: cookies.accessToken,
      id: cookies.userId,
    };
    const response = await getRole(data);

    if (response.name == "user") {
      setItems(itemsUser);
    }
  };

  useEffect(() => {
    query();
  }, []);
  const dash = () => {
    <Link></Link>;
  };

  const start = (
    <Link href="/dashboard">
      <i
        className="pi pi-database"
        style={{ fontSize: "2em", marginRight: "10px" }}
      ></i>
    </Link>
  );
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
      <Card
        title=""
        style={{
          marginBottom: "100px",
          marginTop: "3%",
          width: "100%",
        }}
      >
        {children}
      </Card>
      <Menubar
        style={{
          display: "flex",
          position: "fixed",
          top: 0,
          width: "100%",
          justifyContent: "center",
        }}
        model={items}
        start={start}
        end={end}
      />
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
