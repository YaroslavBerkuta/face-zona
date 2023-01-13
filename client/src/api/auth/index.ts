import { ISession } from "../../typing/interfaces";
import api from "../http.service";
import { ISignInPayload, ISignUpPayload } from "./auth.interface";

export const signInReq = (payload: ISignInPayload) => {
  return api.post<ISession>("/auth/sign-in", payload);
};

export const signUpReq = (payload: ISignUpPayload) => {
  return api.post<ISession>("/auth/sign-up", payload);
};
