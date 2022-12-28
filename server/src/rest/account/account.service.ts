import { USERS_SERVICE } from "src/domain/users/consts";
import { SESSIONS_SERVICE } from "src/domain/sessions/consts";
import { USERS_PASSWORD_SERVICE } from "src/domain/users/consts";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ChangePasswordPayloadDto } from "./dtos/change-password.dto";
import { ISessionsService } from "src/domain/sessions/typing";
import {
  IUser,
  IUsersService,
  IUsersPasswordService,
} from "src/domain/users/typing";

@Injectable()
export class RestAccountService {
  @Inject(USERS_SERVICE) private readonly usersService: IUsersService;
  @Inject(USERS_PASSWORD_SERVICE)
  private usersPasswordsService: IUsersPasswordService;
  @Inject(SESSIONS_SERVICE) private SessionsService: ISessionsService;

  public async get(userId: number): Promise<IUser> {
    const account = await this.usersService.getOne({ where: { id: userId } });
    return account;
  }

  public async del(userId: number): Promise<void> {
    await this.usersService.forceDelete(userId);
  }

  public async changePassword(userId: number, dto: ChangePasswordPayloadDto) {
    const user = await this.usersService.get({ where: { id: userId } });

    const passwordsCompare = await this.usersPasswordsService.comparePassword(
      user.id,
      dto.password
    );
    if (!passwordsCompare)
      throw new BadRequestException("Old password incorect");

    await this.usersPasswordsService.changeUserPassword(
      userId,
      dto.newPassword
    );

    await this.SessionsService.closeAllUserSessions(userId);

    const session = await this.SessionsService.start({
      userId: user.id,
      role: user.role,
    });

    return session;
  }
}
