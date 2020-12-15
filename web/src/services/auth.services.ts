import { IUserSignUp } from "./../types";
// import { apiEndPoint, configHeader } from "./../Config";

import { ILoginResponse, IUserLogIn } from "../types";

// const API_ENDPOINT = apiEndPoint();
// const config = configHeader();

export const singInUser = async (userData: IUserLogIn) => {
  const rawResponse = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: userData.email, password: userData.password })
  });

  const response: ILoginResponse = await rawResponse.json();
  return response;
};

export const singUpUser = async (userData: IUserSignUp) => {
  const rawResponse = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      username: userData.username
    })
  });

  const response: ILoginResponse = await rawResponse.json();
  return response;
};
