import { getAccountReq } from "../../api/account";
import { Service } from "../../core/abstract";
import { SaveAccount } from "../../store/account/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class AccountService extends Service {
  public async load() {
    const { data } = await getAccountReq();

    this.dispatch(new SaveAccount({ account: data }));
  }
}

export const accountService = new AccountService();
