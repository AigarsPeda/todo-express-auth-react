export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export type AuthenticateActionTypes = IAuthenticateUserAction;

// LOGOUT
export const LOGOUT = "LOGOUT";
interface ILogout {
  type: typeof LOGOUT;
  payload: null;
}

export type LogOutActionTypes = ILogout;
