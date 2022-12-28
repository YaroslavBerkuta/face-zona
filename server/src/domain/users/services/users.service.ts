import { Inject, Injectable } from "@nestjs/common";
import { FindOneOptions } from "typeorm";
import { USERS_PASSWORD_SERVICE } from "./../consts/index";
import { USERS_REPOSITORY } from "../consts";
import {
  IUser,
  IUsersPasswordService,
  IUsersRepository,
  IUsersService,
  IUserStorePayload,
  IUserUpdatePayload,
  UserRole,
  UserStatus,
} from "../typing";
import { EmailIsNotFreeExeption, UserAlreadyExistExeption } from "../exeptions";
import * as _ from "lodash";

@Injectable()
export class UsersService implements IUsersService {
  @Inject(USERS_REPOSITORY)
  private readonly usersRepository: IUsersRepository;

  constructor(
    @Inject(USERS_PASSWORD_SERVICE)
    private readonly passwordService: IUsersPasswordService
  ) {}

  public async store(payload: IUserStorePayload): Promise<IUser> {
    await this.validateUser(payload.email);

    const passwordSalt = this.passwordService.createSalt();
    payload.password = await this.passwordService.hashPassword(
      payload.password,
      passwordSalt
    );

    const user = await this.usersRepository.save({
      username: payload.username,
      usersurname: payload.usersurname,
      fullName: `${payload.username} ${payload.usersurname}`,
      email: payload.email,
      password: payload.password,
      passwordSalt: passwordSalt,
      role: UserRole.Client,
      status: UserStatus.Active,
    });

    return user;
  }
  public async get(options: FindOneOptions<IUser>): Promise<IUser> {
    if (!options.where) options.where = {};

    options.where["status"] = UserStatus.Active;

    return this.usersRepository.findOne(options);
  }
  public async getOne(options: FindOneOptions<IUser>): Promise<IUser> {
    if (!options.where) options.where = {};

    return this.usersRepository.findOne(options);
  }

  public async forceDelete(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  public async update(id: number, payload: IUserUpdatePayload): Promise<IUser> {
    let user = await this.usersRepository.findOne(id);

    user = this.usersRepository.merge(user, payload);
    await this.usersRepository.update(id, user);

    return user;
  }

  public async validateUser(email: string): Promise<void> {
    if (email) await this.validateEmail(email);
  }

  public async changeEmail(userId: number, email: string) {
    const user = await this.usersRepository.findOne(userId);
    if (user.email === email) return;

    const emailIsBusy = await this.usersRepository.findOne({ email });
    if (emailIsBusy) throw new EmailIsNotFreeExeption();

    await this.usersRepository.update(userId, { email });
  }

  private async validateEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ email });
    if (user) throw new UserAlreadyExistExeption();
  }

  private async validateUserName(username: string): Promise<void> {
    const user = await this.usersRepository.findOne({ username });
    if (user) throw new UserAlreadyExistExeption();
  }

  public async confirmEmail(userId: number): Promise<void> {
    await this.usersRepository.update(
      { id: userId },
      { status: UserStatus.Active }
    );
  }
}
