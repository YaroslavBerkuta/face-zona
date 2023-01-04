import { store } from ".";

interface Action<T = any> {
  type: T;
  payload?: any;
}

const storeDispatchMiddelware = (action: Action) => {
  store.dispatch({
    type: action.type,
    payload: action.payload,
  });
};

export const simpleDispatch = storeDispatchMiddelware;
