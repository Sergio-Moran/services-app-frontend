import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import "../public/css/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      accept: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
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
      setShowMessage(true);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const a = () => {
    let as = 0;
    console.log("sub");
    let returnUrl = '/';
    if (as == 1) {
      returnUrl = "/LogPage";
    } else {
      console.log('no')
    }
    router.push(returnUrl);
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
        <Card title="Login" style={{ width: "25rem", marginBottom: "2em" }}>
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
              <div className="flex align-items-center flex-column pt-6 px-3">
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "5rem", color: "var(--green-500)" }}
                ></i>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  Your account is registered under name <b>{formData.name}</b>{" "}
                  ;be valid next 30 days without activation. Please check{" "}
                  <b>{formData.email}</b> for activation instructions.
                </p>
              </div>
            </Dialog>
            <div className="flex justify-content-center">
              <div className="card">
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field">
                    <h5 className="text-center">Login</h5>
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={classNames({
                          "p-invalid": isFormFieldValid("email"),
                        })}
                      />
                      <label
                        htmlFor="email"
                        className={classNames({
                          "p-error": isFormFieldValid("email"),
                        })}
                      >
                        Email*
                      </label>
                    </span>
                    {getFormErrorMessage("email")}
                    <br></br>
                    <br></br>
                  </div>
                  <div className="field">
                    <span className="p-float-label">
                      <Password
                        feedback={false}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        toggleMask
                        className={classNames({
                          "p-invalid": isFormFieldValid("password"),
                        })}
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
                  {/*<Link href="/LogPage"></Link> */}
                  <Button
                    type="submit"
                    onClick={a}
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

export default Login;
