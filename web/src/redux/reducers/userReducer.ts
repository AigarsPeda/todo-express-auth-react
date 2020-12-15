import { IUser } from "./../../types";
import { CLEAR_USER_DATA, SET_USER_DATA, UserActionTypes } from "../types";

export interface IUserInitialState {
  user: IUser | {};
}

// Initial State
const initialState: IUserInitialState = {
  user: {}
};

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload
      };

    case CLEAR_USER_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};
