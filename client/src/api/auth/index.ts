import { ISession } from "../../typing/interfaces";
import api from "../http.service";
import { ISignInPayload } from "./auth.interface";

export const signInReq = (payload: ISignInPayload) => {
  return api.post<ISession>("/auth/sign-in", payload);
};
