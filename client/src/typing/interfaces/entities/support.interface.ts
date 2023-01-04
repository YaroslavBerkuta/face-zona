import { SupportMessageStatus } from "../../enums";

export interface ISupport {
  id: number;
  message: string;
  status: SupportMessageStatus;
  userEmail: string;
  userName: string;

  createdAt?: string;
}
