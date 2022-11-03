import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListBox } from "primereact/listbox";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { getObjects, getUser, insertPaymentRecord } from "../routes/api.routes";
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
      price: "",
      user_service_id: "",
    },
    onSubmit: (data) => {
      setFormData(data);
    },
  });

  /* Insert data */
  const insertPr = async () => {
    const newPr = {
      price: formik.values.price,
      user_service_id: dataUhS,
      accessToken: cookies.accessToken,
    };
    const response = await insertPaymentRecord(newPr);
    if (response.status) {
      formik.resetForm();
    }
    console.log(response);
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
        console.log(response);
      } else {
        console.log("something went wrong");
      }
    },
    [cookies.accessToken]
  );

  for (let i = 0; i < uHs.length; i++) {
    uHsElement.push({ label: uHs[i].description, value: uHs[i].id });
  }

  const render = () => {
    getUserEdit(dataUhS);
  };

  useEffect(() => {
    uHsGet();
  }, []);

  return (
    <div>
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
                placeholder={dataEditUhS.name}
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
                placeholder={dataEditUhS.mail}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-money-bill" />
              </span>
              <InputText
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        &ensp; &ensp; &ensp; &ensp;
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            label="Success"
            type="button"
            className="p-button-rounded p-button-success"
            onClick={insertPr}
          />
        </div>
      </form>
    </div>
  );
};

export default FormPayServices;
