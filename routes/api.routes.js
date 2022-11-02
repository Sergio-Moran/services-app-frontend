/* const ROUTE = "https://services-app-backend.vercel.app"; */
const ROUTE = "http://localhost:3002";

export const getUsers = async (data) => {
  const response = await fetch(`${ROUTE}/getUsers`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": data.accessToken,
    },
  });
  return await response.json();
};

export const getUser = async (data, id) => {
  const response = await fetch(`${ROUTE}/getUser/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": data.accessToken,
    },
  });
  return await response.json();
};

export const validateUser = async (userCredentials) => {
  console.log(userCredentials);
  const response = await fetch(`${ROUTE}/validateUser`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  return await response.json();
};

export const insertUser = async (data) => {
  const response = await fetch(`${ROUTE}/insertUser`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": data.accessToken,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const updateUser = async (data, cookie) => {
  const response = await fetch(`${ROUTE}/updateUser`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": cookie.accessToken,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateStatus = async (data, cookie) => {
  const response = await fetch(`${ROUTE}/updateStatus`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": cookie.accessToken,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
