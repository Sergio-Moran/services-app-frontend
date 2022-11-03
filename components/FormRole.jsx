import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
  getObjects,
  getUsers,
  insertRoleHasPermission,
  insertUserHasRole,
} from "../routes/api.routes";
import { useCookies } from "react-cookie";

const FormRole = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPerm, setSelectedPerm] = useState(null);
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [perm, setPerm] = useState("");
  let userElement = [];
  let roleElement = [];
  let permElement = [];

  /* Get users */
  const userGet = useCallback(async () => {
    let cookie = { accessToken: cookies.accessToken };
    const response = await getUsers(cookie);
    setUser(response);
  }, [cookies.accessToken]);

  /* Get Roles */
  const roleGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "tbRole",
    };
    const response = await getObjects(cookie);
    setRole(response);
  }, [cookies.accessToken]);

  /* Get Permission */
  const permGet = useCallback(async () => {
    let cookie = {
      accessToken: cookies.accessToken,
      table: "tbPermission",
    };
    const response = await getObjects(cookie);
    setPerm(response);
  }, [cookies.accessToken]);

  for (let i = 0; i < user.length; i++) {
    userElement.push({ name: user[i].name, code: user[i].id });
  }

  for (let i = 0; i < role.length; i++) {
    roleElement.push({ name: role[i].name, code: role[i].id });
  }

  for (let i = 0; i < perm.length; i++) {
    permElement.push({ name: perm[i].name, code: perm[i].id });
  }

  const onUserChange = (e) => {
    setSelectedUser(e.value);
  };

  const onRoleChange = (e) => {
    setSelectedRole(e.value);
  };

  const onPermChange = (e) => {
    setSelectedPerm(e.value);
  };

  const insertRole = async () => {
    const newUhR = {
      role_id: selectedRole.code,
      user_id: selectedUser.code,
      accessToken: cookies.accessToken,
    };

    const newRhP = {
      role_id: selectedRole.code,
      permission_id: selectedPerm.code,
      accessToken: cookies.accessToken,
    };

    const response1 = await insertUserHasRole(newUhR);
    const response2 = await insertRoleHasPermission(newRhP);

    console.log(response1);
    console.log(response2);
  };

  useEffect(() => {
    userGet();
    roleGet();
    permGet();
  }, []);

  return (
    <div
      style={{
        height: "75vh",
      }}
    >
      <div
        className="dropdown-demo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div className="card">
          <Dropdown
            value={selectedUser}
            options={userElement}
            onChange={onUserChange}
            optionLabel="name"
            placeholder="Select a User"
          />
          &ensp; &ensp; &ensp; &ensp;
          <Dropdown
            value={selectedRole}
            options={roleElement}
            onChange={onRoleChange}
            optionLabel="name"
            placeholder="Select a Role"
          />
          &ensp; &ensp; &ensp; &ensp;
          <Dropdown
            value={selectedPerm}
            options={permElement}
            onChange={onPermChange}
            optionLabel="name"
            placeholder="Select a Permission"
          />
        </div>
        &ensp; &ensp; &ensp; &ensp;
      </div>
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
          onClick={insertRole}
        />
      </div>
    </div>
  );
};

export default FormRole;
