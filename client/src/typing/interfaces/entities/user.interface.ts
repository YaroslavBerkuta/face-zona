export interface IUser {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
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
