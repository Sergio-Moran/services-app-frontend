const ROUTE = "https://services-app-backend.vercel.app";

export const getUsers = async () => {
  const response = await fetch(`${ROUTE}/getUsers`, {
    method: "GET",
  });
  return await response.json();
};

export const validateUser = async (userCredentials) => {
  console.log(userCredentials)
  const response = await fetch(`${ROUTE}/validateUser`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  return await response;
};
