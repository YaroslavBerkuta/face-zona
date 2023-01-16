import { Store } from "../typing/interfaces";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./auth";
import { accountReducer } from "./account/reduser";

const rootReducer = combineReducers<Store.Root>({
  auth: authReducer,
  account: accountReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeWithDevTools());
