import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    user: User;
  };
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  created_on: string;
  last_login: null | string;
}
