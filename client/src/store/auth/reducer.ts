import { createReducer } from "@bitalikrty/redux-create-reducer";
import { Store } from "../../typing/interfaces";


const initialState: Store.IAuthState = {
  accessToken: null,
  refreshToken: null,
};

export const authReducer = createReducer<Store.IAuthState>(initialState, {
  SAVE_ACCESS_TOKEN: (state, action) => {
    return {
      ...state,
      accessToken: action.payload.accessToken,
    };
  },

  SAVE_TOKENS: (state, action) => {
    return {
      ...state,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken || state.refreshToken,
    };
  },
  RESET_TOKENS: () => {
    return initialState;
  },
});

