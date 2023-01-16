import { createReducer } from "@bitalikrty/redux-create-reducer";
import { StoreActionKey } from "../../typing/enums";
import { Store } from "../../typing/interfaces";
import { TAccountActions } from "./types";

const initialState: Store.States.Account = {
  info: {
    data: null,
    isLoading: true,
  },
};

export const accountReducer = createReducer<
  Store.States.Account,
  TAccountActions
>(initialState, {
  [StoreActionKey.SET_ACCOUNT]: (state, action) => {
    return {
      ...state,
      info: {
        data: action.payload.account,
        isLoading: false,
      },
    };
  },

  [StoreActionKey.SET_ACCOUNT_LOADING]: (state, action) => {
    return {
      ...state,
      info: {
        ...state.info,
        isLoading: action.payload,
      },
    };
  },

  [StoreActionKey.RESET]: (state, action) => {
    return {
      ...initialState,
    };
  },
});
