import { signInReq, signUpReq } from "../../api";
import { ISignInPayload, ISignUpPayload } from "../../api/auth/auth.interface";
import { SaveTokens } from "../../store/auth";
import { simpleDispatch } from "../../store/store-helpers";
import { StorageKey } from "../../typing/enums";
import { TokensPair } from "../../typing/interfaces";
import { storageService } from "../system";

export const signIn = async (payload: ISignInPayload) => {
  try {
    const { data } = await signInReq(payload);
    if (data) {
      const token: TokensPair = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      await saveSession(token);
    }
  } catch (e: any) {
    throw {
      ...e.response.data,
    };
  }
};
export const signUp = async (payload: ISignUpPayload) => {
  try {
    const { data } = await signUpReq(payload);
    if (data) {
      const token: TokensPair = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      await saveSession(token);
    }
  } catch (e) {
    console.log(e);
  }
};
const saveSession = async (tokens: TokensPair) => {
  try {
    await storageService.set(StorageKey.AccessToken, tokens.accessToken);
    await storageService.set(StorageKey.RefreshToken, tokens.refreshToken);
    simpleDispatch(new SaveTokens(tokens));
  } catch (e) {
    logOut();
  }
};
const removeTokens = async () => {
  await storageService.remove(StorageKey.AccessToken);
  await storageService.remove(StorageKey.RefreshToken);
};

export const logOut = async () => {
  removeTokens();
  location.pathname = "/";
};
