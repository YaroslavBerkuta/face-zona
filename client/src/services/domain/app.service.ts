import { Service } from "../../core/abstract";
import { SetAccountLoading } from "../../store/account/types";
import { storageService } from "../system";
import { accountService } from "./account.service";

export class AppService extends Service {
  public async load() {
    try {
      const accessToken = storageService.get("accessToken");
      if (!accessToken) throw new Error();

      await accountService.load();
    } catch (e) {
      if (location.pathname == "/account") location.pathname = "/";
      this.dispatch(new SetAccountLoading(false));
    }
  }
}

export const appService = new AppService();

