import { ITodo } from "./../../types";
import { CLEAR_DATA, SetDataTypes, SET_TODOS_DATA } from "../types";

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

    default:
      return state;
  }
};
