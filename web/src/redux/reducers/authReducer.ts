import { isToken } from "../../helpers/isToken";
import { AuthenticateActionTypes, AUTHENTICATE_USER } from "../types";

export interface IAuthInitialState {
  isAuthenticated: boolean;
  token: string;
}

// Initial State
const initialState: IAuthInitialState = {
  isAuthenticated: false,
  token: ""
};

export default (state = initialState, action: AuthenticateActionTypes) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      console.log("AUTH TOKEN: ", initialState);
      return {
        ...state,
        isAuthenticated: isToken(action.payload),
        token: action.payload
      };

    default:
      return state;
  }
};
