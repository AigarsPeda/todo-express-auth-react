import { ITodo } from "./../../types";
import {
  ADD_NEW_TODO,
  CLEAR_DATA,
  DELETE_TODO,
  SetDataTypes,
  SET_TODOS_DATA,
  UPDATE_TODO
} from "../types";

export interface ITodosInitialState {
  todos: ITodo[];
}

// Initial State
const initialState: ITodosInitialState = {
  todos: []
};

export default (state = initialState, action: SetDataTypes) => {
  switch (action.type) {
    case SET_TODOS_DATA:
      return {
        ...state,
        todos: action.payload
      };

    case ADD_NEW_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }

    case UPDATE_TODO: {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      return {
        ...state,
        todos: state.todos.splice(index, 1, action.payload)
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    }

    case CLEAR_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};
