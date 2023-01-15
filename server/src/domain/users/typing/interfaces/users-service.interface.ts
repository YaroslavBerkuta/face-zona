import { FindOneOptions } from "typeorm";
import { UserRole } from "../enums";
import { IUser } from "./user.interface";

export interface IUserStorePayload {
  username: string;
  usersurname: string;
  phoneNumber: string;
  email: string;
  fullName?: string;
  password: string;
  role: UserRole;
}

export interface IUserUpdatePayload {
  username?: string;
  email?: string;
  fullName?: string;
  description?: string;
}

export interface IUsersService {
  store(payload: IUserStorePayload): Promise<IUser>;
  get(options: FindOneOptions<IUser>): Promise<IUser>;
  getOne(options: FindOneOptions<IUser>): Promise<IUser | null>;
  forceDelete(userId: number): Promise<void>;
  update(userId: number, payload: IUserUpdatePayload): Promise<IUser>;
  confirmEmail(userId: number): Promise<void>;
  validateUser(email: string): Promise<void>;
  changeEmail(userId: number, email: string): Promise<void>;
}
