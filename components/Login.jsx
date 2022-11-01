import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import "../public/css/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { validateUser } from "../routes/api.routes";
import { useCookies } from "react-cookie";

const Login = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.mail) {
        errors.mail = "mail is required.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.mail)) {
        errors.mail = "Invalid mail address. E.g. example@mail.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      /* console.log(data); */
      /* setShowMessage(true); */
      /* formik.resetForm(); */
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

  const [cookies, setCookie] = useCookies(["accessToken"]);

  const user = async () => {
    const user = { mail: formik.values.mail, password: formik.values.password };
    const result = await validateUser(user);
    let returnUrl = "";
    console.log(result);
    if (result.status) {
      const accessToken = result.access_token;
      setCookie("accessToken", accessToken, { path: "/" });
      returnUrl = "/LogPage";
    } else {
      formik.resetForm();
      returnUrl = "/";
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
            ></Dialog>
            <div className="flex justify-content-center">
              <div className="card">
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field">
                    <h5 className="text-center">Login</h5>
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
                    onClick={user}
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
