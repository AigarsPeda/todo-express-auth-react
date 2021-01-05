import { IAPIMessage, ITodo } from "../types";

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

export const newTodo = async (
  description: string,
  tags: string[],
  token: string
) => {
  const rawResponse = await fetch(`http://localhost:8000/todos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      description: description,
      tags: tags
    })
  });

  const response: ITodo = await rawResponse.json();
  return response;
};

export const changeTodoDescription = async (
  description: string,
  tags: string[],
  token: string,
  id: string
) => {
  // "/todo/:id"

  const rawResponse = await fetch(`http://localhost:8000/todo/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      description: description,
      tags: tags
    })
  });

  const response: ITodo = await rawResponse.json();
  // console.log("response: ", response);
  return response;
};

export const removeTodo = async (id: number, token: string) => {
  const rawResponse = await fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const response: IAPIMessage = await rawResponse.json();
  return response;
};
