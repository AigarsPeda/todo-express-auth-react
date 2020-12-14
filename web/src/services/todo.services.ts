import { ITodo } from "../types";

export const getTodos = async (token: string) => {
  const rawResponse = await fetch("http://localhost:8000/todos", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const response: ITodo[] = await rawResponse.json();
  return response;
};
