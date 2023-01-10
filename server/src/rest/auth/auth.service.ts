import { SignInPayloadDto } from "./dtos/sign-in-payload.dto";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SESSIONS_SERVICE } from "src/domain/sessions/consts";
import { ISession, ISessionsService } from "src/domain/sessions/typing";
import { USERS_PASSWORD_SERVICE, USERS_SERVICE } from "src/domain/users/consts";
import {
  IUsersPasswordService,
  IUsersService,
  UserRole,
  UserStatus,
} from "src/domain/users/typing";
import { RefreshSessionPayloadDto, SignUpPayloadDto } from "./dtos";

@Injectable()
export class RestAuthService {
  @Inject(USERS_SERVICE) private usersService: IUsersService;
  @Inject(USERS_PASSWORD_SERVICE)
  private usersPasswordService: IUsersPasswordService;
  @Inject(SESSIONS_SERVICE) private sessionsService: ISessionsService;

  public async signUp(dto: SignUpPayloadDto): Promise<ISession> {
    await this.usersService.validateUser(dto.email);

    const user = await this.usersService.store({
      email: dto.email,
      password: dto.password,
      username: dto.username,
      usersurname: dto.usersurname,
      role: UserRole.Client,
    });
    const session = await this.sessionsService.start({
      userId: user.id,
      role: user.role,
    });

    return session;
  }

  public async signIn(dto: SignInPayloadDto): Promise<ISession> {
    const user = await this.usersService.getOne({
      where: { email: dto.email },
    });
    if (!user || user.status === UserStatus.Disabled)
      throw new BadRequestException("Username or password incorrect");

    const passwordsCompare = await this.usersPasswordService.comparePassword(
      user.id,
      dto.password
    );
    if (!passwordsCompare)
      throw new BadRequestException("Username or password incorrect");

    const session = await this.sessionsService.start({
      userId: user.id,
      role: user.role,
    });
    return session;
  }

  public async refreshSession({
    refreshToken,
  }: RefreshSessionPayloadDto): Promise<ISession> {
    return await this.sessionsService.refresh(refreshToken);
  }
}
