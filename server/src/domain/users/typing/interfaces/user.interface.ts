import { UserRole, UserStatus } from "../enums";

export interface IUser {
  id: number;

  phoneNumber: string;
  email: string;
  username: string;
  usersurname: string;
  fullName: string;

  password: string;
  passwordSalt: string;

  role: UserRole;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}

export interface IUserGoal {
  id: number;

  userId: number;

  goalId: number;

  alreadyRead: boolean;

  createdAt: string;
  updatedAt: string;
}
