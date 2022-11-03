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

const FormUhS = (props) => {
  const [user, setUser] = useState("");
  const [method, setMethod] = useState("");
  const [dataU, setDataU] = useState("");
  const [dataS, setDataS] = useState("");
  const [dataM, setDataM] = useState("");
  const [dataEditU, setDataEditU] = useState("");
  const [dataEditS, setDataEditS] = useState("");
  const [dataEditM, setDataEditM] = useState("");
  const [service, setService] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  let userElement = [];
  let serviceElement = [];
  let methodElement = [];

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
    const newUhS = {
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
    console.log(response);
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

  /* Get Methods */
  const MethodGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "tbMethodPayment",
    };
    const response = await getObjects(cookie);
    setMethod(response);
    /* console.log(response); */
  }, [cookies.accessToken]);

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

  /* Get method */
  const getMethodEdit = useCallback(async (dataM) => {
    let dataMethod = {
      accessToken: cookies.accessToken,
      table: "tbMethodPayment",
      id: dataM,
    };
    const resMethod = await getEntityById(dataMethod);
    setDataEditM(resMethod);
    [cookies.accessToken];
  }, []);

  for (let i = 0; i < user.length; i++) {
    userElement.push({ label: user[i].name, value: user[i].id });
  }

  for (let i = 0; i < service.length; i++) {
    serviceElement.push({ label: service[i].name, value: service[i].idPrice });
  }

  for (let i = 0; i < method.length; i++) {
    methodElement.push({ label: method[i].name, value: method[i].id });
  }

  const render = () => {
    getUserEdit(dataU);
    getServiceEdit(dataS);
    getMethodEdit(dataM);
  };

  useEffect(() => {
    userGet();
    serviceGet();
    MethodGet();
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
            value={dataU}
            options={userElement}
            onChange={(e) => setDataU(e.value)}
            listStyle={{ maxHeight: "250px" }}
          />
        </Card>
        <Card
          className="p-card"
          title="Services"
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

        <Card
          className="p-card"
          title="Methods"
          style={{
            width: "25rem",
          }}
        >
          <ListBox
            value={dataM}
            options={methodElement}
            onChange={(e) => setDataM(e.value)}
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
        {/* <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
          aria-label="Cancel"
          onClick={desRender}
        /> */}
        <Button
          icon="pi pi-check"
          className="p-button-rounded"
          aria-label="Filter"
          onClick={render}
        />
      </div>

      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <h3>User Has Service</h3>
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
                disabled
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
                <i className="pi pi-box"></i>
              </span>
              <InputText
                id="nameS"
                name="nameS"
                disabled
                placeholder={dataEditS.nameService}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-dollar" />
              </span>
              <InputText
                id="price"
                name="price"
                disabled
                placeholder={dataEditS.price}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calculator" />
              </span>
              <InputText
                id="method"
                name="method"
                disabled
                placeholder={dataEditM.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="grid p-fluid">
          <div className="col-12 md:col-12">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-book" />
              </span>
              <InputText
                id="description"
                name="description"
                placeholder="Description"
                value={formik.values.description}
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
