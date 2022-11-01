const ROUTE = "https://services-app-backend.vercel.app";
/* const ROUTE = "http://localhost:3002"; */

export const getUsers = async () => {
  const response = await fetch(`${ROUTE}/getUsers`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
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
