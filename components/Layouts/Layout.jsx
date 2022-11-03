import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React from "react";
import { Message } from "primereact/message";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { closeSession } from "../../routes/api.routes";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const items = [
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
      url: "/pay"
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
      label: "Roles",
      icon: "pi pi-fw pi-users",
      url: "/role"
    },
    /* {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    }, */
  ];

  const dash = () => {
    <Link></Link>;
  };

  const [cookies, setCookie] = useCookies(["accessToken"]);
  const router = useRouter();

  const closeActualSession = async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await closeSession(cookie);
    if(response.status){
      router.push("/");
    }
    console.log(response);
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
      onClick={closeActualSession}
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
