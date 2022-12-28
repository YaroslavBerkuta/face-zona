import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ISession } from "../typing";

@Entity("sessions")
export class Sessions implements ISession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  createdAt?: string;
}
