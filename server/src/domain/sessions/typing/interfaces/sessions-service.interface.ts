import { UserRole } from "src/domain/users/typing";
import { ISession } from "./session.interface";

export interface IStartSessionPayload {
  userId: number;
  role: UserRole;
}

export interface ISessionsService {
  start(payload: IStartSessionPayload): Promise<ISession>;
  refresh(refreshToken: string): Promise<ISession>;
  checkTokenDeprecation(token: string): Promise<boolean>;
  closeAllUserSessions(userId: number, execludeIds?: number[]): Promise<void>;
}
