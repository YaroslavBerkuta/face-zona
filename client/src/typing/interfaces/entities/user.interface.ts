export interface IUser {
  id: number;
  mail: string;
  phoneNumber: string;
  fullName: string;
  lastName: string;
  description: string;
  alreadyRead: true;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserAccount extends IUser {}

export interface ITokenPair {
  accessToken: string;
  refreshToken?: string;
}
