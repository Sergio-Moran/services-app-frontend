const ROUTE = "https://services-app-backend.vercel.app";
/* const ROUTE = "http://localhost:3002"; */

/* Functions for Users */
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

/* Function for services */
export const insertService = async (data) => {
  const response = await fetch(`${ROUTE}/newService`, {
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

export const getObjects = async (data) => {
  const response = await fetch(`${ROUTE}/getObjects/${data.table}`, {
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

export const getEntityById = async (data) => {
  const response = await fetch(
    `${ROUTE}/getEntityById/${data.table}/${data.id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": data.accessToken,
      },
    }
  );
  return await response.json();
};

export const getRole = async (data) => {
  const response = await fetch(`${ROUTE}/getRole/${data.id}`, {
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

export const updateEntity = async (body, data) => {
  const response = await fetch(`${ROUTE}/update${data.table}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": data.accessToken,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const getCountStatus = async (data) => {
  const response = await fetch(`${ROUTE}/getCountStatus/${data.table}`, {
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
/* Function for user has service */
export const insertUserHasService = async (data) => {
  const response = await fetch(`${ROUTE}/insertUserHasService`, {
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

/* Function for user has service */
export const insertPaymentRecord = async (data) => {
  const response = await fetch(`${ROUTE}/insertPaymentRecord`, {
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

/* Function for user has role */
export const insertUserHasRole = async (data) => {
  const response = await fetch(`${ROUTE}/insertUserHasRole`, {
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

/* Function for role has permission */
export const insertRoleHasPermission = async (data) => {
  const response = await fetch(`${ROUTE}/insertRoleHasPermission`, {
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

export const closeSession = async (data) => {
  const response = await fetch(`${ROUTE}/closeSession`, {
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