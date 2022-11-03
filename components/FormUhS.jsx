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
} from "../routes/api.routes";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useFormik } from "formik";

const FormUhS = (props) => {
  const [user, setUser] = useState("");
  const [dataU, setDataU] = useState("");
  const [dataS, setDataS] = useState("");
  const [dataEditU, setDataEditU] = useState("");
  const [dataEditS, setDataEditS] = useState("");
  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  let userElement = [];
  let serviceElement = [];

  /* Formik */
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    onSubmit: (data) => {
      setFormData(data);
    },
  });

  /* Insert data */
  const insertedUhS = async () => {
    const newService = {
      name: formik.values.name,
      description: formik.values.description,
      price: formik.values.price,
      accessToken: cookies.accessToken,
    };
  };

  /* Get users */
  const userGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    setUser(response);
  }, [cookies.accessToken]);

  /* Get services */
  const serviceGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "getServiceWithPrices",
    };
    const response = await getObjects(cookie);
    setService(response);
  }, [cookies.accessToken]);

  /* Get user to edit */
  const getUserEdit = useCallback(
    async (dataU) => {
      let cookie = { accessToken: cookies.accessToken };
      const response = await getUser(cookie, dataU);
      if (response.status) {
        setDataEditU(response);
      } else {
        console.log("something went wrong");
      }
    },
    [cookies.accessToken]
  );

  /* Get service and price */
  const getServiceEdit = useCallback(
    async (dataS) => {
      let dataPrice = {
        accessToken: cookies.accessToken,
        table: "tbServicePrice",
        id: dataS,
      };
      const resPrice = await getEntityById(dataPrice);

      let dataService = {
        accessToken: cookies.accessToken,
        table: "tbService",
        id: resPrice.service_id,
      };
      const resService = await getEntityById(dataService);

      console.log(resService);
      console.log(resPrice);
      if (resService.status && resPrice.status) {
        const response = {
          idService: resService.id,
          idPrice: resPrice.id,
          nameService: resService.name,
          price: resPrice.price,
          descriptionService: resService.description,
        };
        setDataEditS(response);
      } else {
        console.log("something went wrong");
      }
    },
    [cookies.accessToken]
  );

  for (let i = 0; i < user.length; i++) {
    userElement.push({ label: user[i].name, value: user[i].id });
  }

  for (let i = 0; i < service.length; i++) {
    serviceElement.push({ label: service[i].name, value: service[i].idPrice });
  }

  const render = () => {
    getUserEdit(dataU);
    getServiceEdit(dataS);
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
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <h5>User Has Service</h5>
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
                placeholder={dataEditU.name}
                value={formik.values.name}
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
                type="number"
                id="mail"
                name="mail"
                disabled
                placeholder={dataEditU.mail}
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
                placeholder={dataEditU.status == true ? "ACTIVE" : "INACTIVE"}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
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
                placeholder={dataEditU.name}
                value={formik.values.name}
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
                type="number"
                id="mail"
                name="mail"
                disabled
                placeholder={dataEditU.mail}
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
                placeholder={dataEditU.status == true ? "ACTIVE" : "INACTIVE"}
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
            onClick={insertedUhS}
          />
        </div>
      </form>
    </div>
  );
};

export default FormUhS;
