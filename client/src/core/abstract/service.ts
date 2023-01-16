import { message } from "antd";
import { store } from "../../store";
import { Store } from "../../typing/interfaces";

export abstract class Service {
  protected dispatch(action: Store.Action) {
    store.dispatch({
      type: action.type,
      payload: action.payload,
    });
  }

  protected getState<T extends keyof Store.Root>(
    key?: T
  ): Store.Root | Store.Root[T] {
    const state = store.getState();
    if (key) return state[key];
    return state;
  }

  protected select<T>(selector: (state: Store.Root) => T): T {
    const state = this.getState() as Store.Root;
    return selector(state);
  }

  protected showError(
    text = "An unexpected error has occurred, please try again later"
  ) {
    message.error(text);
  }
  protected showErrorT(key: string) {
    message.error(key);
  }

  protected showMessage(text: string) {
    message.success(text);
  }
  protected showMessageT(key: string) {
    message.success(key);
  }
}
