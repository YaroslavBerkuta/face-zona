import { Inject, Injectable } from "@nestjs/common";
import * as randomstring from "randomstring";
import * as bcrypt from "bcryptjs";
import { IUsersPasswordService, IUsersRepository } from "../typing";
import { PASSWORD_HASH_SALT, USERS_REPOSITORY } from "../consts";
import { UserNotFoundExeption } from "../exeptions";

@Injectable()
export class UsersPasswordService implements IUsersPasswordService {
  private readonly saltRounds: number = 10;

  constructor(
    @Inject(PASSWORD_HASH_SALT)
    private localHashSalt: string,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository
  ) {}

  public async comparePassword(
    userId: number,
    password: string
  ): Promise<boolean> {
    const user = await this.findOneWithPassword(userId);

    return this.compare(password, user.passwordSalt, user.password);
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(this.getSalt(salt) + password, this.saltRounds);
  }

  public createSalt(): string {
    return randomstring.generate(10);
  }

  private getSalt(salt: string): string {
    return this.localHashSalt + salt;
  }

  private async compare(
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(this.getSalt(salt) + password, hash);
  }

  private async findOneWithPassword(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ["id", "password", "passwordSalt"],
    });

    if (!user) throw new UserNotFoundExeption();

    return user;
  }

  public async changeUserPassword(userId: number, newPassword: string) {
    const user = await this.findOneWithPassword(userId);
    user.password = await this.hashPassword(newPassword, user.passwordSalt);
    await this.usersRepository.save(user);
  }
}
