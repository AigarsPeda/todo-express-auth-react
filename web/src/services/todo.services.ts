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

export const changeStatus = async (
  status: boolean,
  token: string,
  todosId: number
) => {
  const rawResponse = await fetch(
    `http://localhost:8000/todos/status/${todosId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: status
      })
    }
  );

  const response: ITodo[] = await rawResponse.json();
  return response;
};
