import { Store } from "../typing/interfaces";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./auth";

const rootReducer = combineReducers<Store.Root>({
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeWithDevTools());
