import { StoreActionKey } from "../../typing/enums";
import { IUserAccount, Store } from "../../typing/interfaces";

export class SaveAccount implements Store.Action {
  readonly type = StoreActionKey.SET_ACCOUNT;
  constructor(public readonly payload: { account: IUserAccount }) {}
}

export class SetAccountLoading implements Store.Action {
  readonly type = StoreActionKey.SET_ACCOUNT_LOADING;
  constructor(public readonly payload: boolean) {}
}

export class Reset implements Store.Action {
  readonly type = StoreActionKey.RESET;
}

export type TAccountActions = SaveAccount | Reset | SetAccountLoading;
