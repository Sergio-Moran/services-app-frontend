import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import "../public/css/Form.module.css";
import { useCookies } from "react-cookie";
import { insertUser } from "../routes/api.routes";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      mail: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.mail) {
        errors.mail = "mail is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.mail)
      ) {
        errors.mail = "Invalid mail address. E.g. example@mail.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
    },
  });

  const [cookies, setCookie] = useCookies(["accessToken"]);

  const userInsert = async () => {
    const newUser = {
      name: formik.values.name,
      mail: formik.values.mail,
      password: formik.values.password,
      accessToken: cookies.accessToken,
    };
    const result = await insertUser(newUser);
    let returnUrl = "";
    console.log(result);
    if (result.status) {
      returnUrl = "/menu";
    } else {
      formik.resetForm();
      returnUrl = "/register";
    }
    router.push(returnUrl);
  };

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card title="Register" style={{ width: "25rem", marginBottom: "2em" }}>
          <div className="form-demo">
            <Dialog
              visible={showMessage}
              onHide={() => setShowMessage(false)}
              position="top"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
            </Dialog>

            <div className="flex justify-content-center">
              <div className="card">
                <h5 className="text-center">Register</h5>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        autoFocus
                        className={classNames({
                          "p-invalid": isFormFieldValid("name"),
                        })}
                      />
                      <label
                        htmlFor="name"
                        className={classNames({
                          "p-error": isFormFieldValid("name"),
                        })}
                      >
                        Name*
                      </label>
                    </span>
                    {getFormErrorMessage("name")}
                    <br></br>
                    <br></br>
                  </div>
                  <div className="field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="mail"
                        name="mail"
                        value={formik.values.mail}
                        onChange={formik.handleChange}
                        className={classNames({
                          "p-invalid": isFormFieldValid("mail"),
                        })}
                      />
                      <label
                        htmlFor="mail"
                        className={classNames({
                          "p-error": isFormFieldValid("mail"),
                        })}
                      >
                        mail*
                      </label>
                    </span>
                    {getFormErrorMessage("mail")}
                    <br></br>
                    <br></br>
                  </div>
                  <div className="field">
                    <span className="p-float-label">
                      <Password
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        toggleMask
                        className={classNames({
                          "p-invalid": isFormFieldValid("password"),
                        })}
                        header={passwordHeader}
                        footer={passwordFooter}
                      />
                      <label
                        htmlFor="password"
                        className={classNames({
                          "p-error": isFormFieldValid("password"),
                        })}
                      >
                        Password*
                      </label>
                    </span>
                    {getFormErrorMessage("password")}
                  </div>
                  <br></br>
                  <Button
                    type="submit"
                    onClick={userInsert}
                    label="Submit"
                    className="mt-2"
                  />
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
