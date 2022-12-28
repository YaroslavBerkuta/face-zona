import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser, UserRole, UserStatus } from "../typing";

@Entity("users")
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  usersurname: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, select: false })
  passwordSalt: string;

  @Column({ type: "varchar", nullable: false })
  role: UserRole;

  @Column({
    type: "varchar",
    nullable: false,
    default: UserStatus.WaitingEmailConfirmation,
  })
  status: UserStatus;

  @CreateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "LOCALTIMESTAMP" })
  updatedAt: string;
}
