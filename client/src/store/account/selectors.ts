import { Store } from "../../typing/interfaces";

export const selectAccount = (store: Store.Root) => {
    return store.account.info;
  };
  
  export const selectRole = (store: Store.Root) => {
    const account = selectAccount(store);
    return account?.data?.role;
  };
  