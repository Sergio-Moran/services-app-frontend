const ROUTE = "https://services-app-backend.vercel.app";

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
