import api from "../http.service";
import { GetAccountResult } from "./account.interface";

export const getAccountReq = (payload?: any) => {
  return api.get<GetAccountResult>("/account", payload);
};
