import { ITodo } from "./../../types";
import {
  ADD_NEW_TODO,
  CLEAR_DATA,
  DELETE_TODO,
  SetDataTypes,
  SET_TODOS_DATA
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

    case CLEAR_DATA: {
      return initialState;
    }

    case ADD_NEW_TODO: {
      return {
        ...state
      };
    }

    case DELETE_TODO: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
