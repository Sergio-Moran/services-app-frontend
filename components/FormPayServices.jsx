import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListBox } from "primereact/listbox";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import {
  getEntityById,
  getObjects,
  getUser,
  getUsers,
  insertUserHasService,
} from "../routes/api.routes";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";

const FormPayServices = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [uHs, setuHs] = useState("");
  const [dataUhS, setDataUhS] = useState("");
  const [dataEditUhS, setDataEditUhS] = useState("");
  let uHsElement = [];

  /* Formik */
  const formik = useFormik({
    initialValues: {
      service_id: "",
      description: "",
      user_id: "",
      method_id: "",
    },
    onSubmit: (data) => {
      setFormData(data);
    },
  });

  /* Insert data */
  const insertedUhS = async () => {
    /* const newUhS = {
      service_id: dataS,
      description: formik.values.description,
      user_id: dataU,
      method_id: dataM,
      accessToken: cookies.accessToken,
    };
    const response = await insertUserHasService(newUhS);
    if (response.status) {
      formik.resetForm();
    }
    console.log(response); */
  };

  /* Get services */
  const uHsGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "tbUserHasService",
    };
    const response = await getObjects(cookie);
    setuHs(response);
  }, [cookies.accessToken]);

  /* Get user to edit */
  const getUserEdit = useCallback(
    async (dataUhS) => {
      let cookie = { accessToken: cookies.accessToken };
      const response = await getUser(cookie, dataUhS);
      if (response.status) {
        setDataEditUhS(response);
      } else {
        console.log("something went wrong");
      }
    },
    [cookies.accessToken]
  );

  for (let i = 0; i < uHs.length; i++) {
    uHsElement.push({ label: uHs[i].name, value: uHs[i].id });
  }

  const render = () => {
    getUserEdit(dataUhS);
  };

  return (
    <div
      style={{
        height: "75vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 40,
        }}
      >
        <Card
          className="p-card"
          title="Users"
          style={{
            width: "25rem",
          }}
        >
          <ListBox
            value={dataUhS}
            options={uHsElement}
            onChange={(e) => setDataUhS(e.value)}
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
          icon="pi pi-check"
          className="p-button-rounded"
          aria-label="Filter"
          onClick={render}
        />
      </div>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <h3>Pay Service</h3>
        <div className="grid p-fluid">
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                id="name"
                name="name"
                disabled
                /* placeholder={dataEditU.name} */
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-google" />
              </span>
              <InputText
                id="mail"
                name="mail"
                disabled
                /* placeholder={dataEditU.mail} */
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-pencil" />
              </span>
              <InputText
                id="status"
                name="status"
                disabled
                /* placeholder={dataEditU.status == true ? "ACTIVE" : "INACTIVE"} */
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormPayServices;
