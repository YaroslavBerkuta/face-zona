/* eslint-disable @typescript-eslint/no-namespace */
import { StoreActionKey } from "../../enums";
import { IUserAccount } from "../entities";

export namespace Store {
  type StoreData<T> = {
    data: T;
    isLoading: boolean;
  };
  export interface IAuthState {
    accessToken: string;
    refreshToken: string;
  }
  export interface INewEmployer {
    count: string;
  }
  export interface Action {
    type: StoreActionKey;
    payload?: any;
  }

  export namespace States {
    export interface Account {
      info: StoreData<IUserAccount>;
    }
  }
  export interface Root {}
}
