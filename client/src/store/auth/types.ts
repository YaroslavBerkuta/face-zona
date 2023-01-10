import { Action } from "redux";
import { TokensPair } from "../../typing/interfaces";

export class SaveTokens implements Action {
  readonly type = "SAVE_TOKENS";
  constructor(public readonly payload: TokensPair) {}
}

export class SaveAccessToken implements Action {
  readonly type = "SAVE_ACCESS_TOKEN";
  constructor(
    public readonly payload: {
      accessToken: string;
    }
  ) {}
}

export class ResetTokens {
  readonly type = "RESET_TOKENS";
}

export type TAuthActions = SaveTokens | SaveAccessToken | ResetTokens;
