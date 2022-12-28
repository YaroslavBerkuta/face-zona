import { SESSIONS_REPOSITORY } from "./../consts/index";
import { Inject, Injectable } from "@nestjs/common";
import {
  ISession,
  ISessionsRepository,
  ISessionsService,
  IStartSessionPayload,
} from "../typing";
import { REDIS_SERVICE } from "src/libs/redis/consts";
import { IRedisService } from "src/libs/redis/interfaces";
import { UserRole } from "src/domain/users/typing";
import { JwtService } from "src/libs/jwt";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WrongRefreshTokenExeption } from "../exeptions";
import { In } from "typeorm";
import { Events } from "src/shared/enums";
import * as _ from "lodash";

@Injectable()
export class SessionsService implements ISessionsService {
  @Inject(SESSIONS_REPOSITORY)
  private readonly sessionsRepository: ISessionsRepository;

  @Inject(REDIS_SERVICE)
  private readonly redisService: IRedisService;

  constructor(
    private readonly jstService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async start(payload: IStartSessionPayload): Promise<ISession> {
    const session: ISession = {
      accessToken: " ",
      refreshToken: " ",
      userId: payload.userId,
    };

    const resultInsert = await this.sessionsRepository.insert(session);
    const sessionId = resultInsert.identifiers[0].id;

    const tokens = this.generateTokens(payload.userId, payload.role, sessionId);

    await this.sessionsRepository.update(sessionId, tokens);

    return {
      ...session,
      ...tokens,
    };
  }

  public async refresh(refreshToken: string): Promise<ISession> {
    let session: ISession = await this.sessionsRepository.findOne({
      refreshToken,
    });

    if (!session) throw new WrongRefreshTokenExeption();

    const decoded = this.jstService.decodeToken(refreshToken);
    const tokens = this.generateTokens(
      session.userId,
      decoded.role,
      session.id
    );

    session = await this.sessionsRepository.save({
      id: session.id,
      userId: session.userId,
      ...tokens,
    });

    return session;
  }

  private async storeToken(token: string) {
    await this.redisService.set(token, "true", 360);
  }

  public async checkTokenDeprecation(token: string): Promise<boolean> {
    const exist = await this.redisService.get(token);

    return Boolean(exist);
  }

  private generateTokens(userId: number, role: UserRole, sessionId: number) {
    return {
      accessToken: this.jstService.createToken({ id: userId, role, sessionId }),
      refreshToken: this.jstService.createToken({
        id: `_${userId}`,
        role,
        sessionId,
        expiresIn: null,
      }),
    };
  }

  public async closeAllUserSessions(userId: number, execludeIds?: number[]) {
    const query = this.sessionsRepository
      .createQueryBuilder("it")
      .select(["it.id", "it.accessToken"])
      .where("it.userId = :userId", { userId });

    if (!_.isEmpty(execludeIds))
      query.andWhere("it.id <> ANY(:execludeIds)", { execludeIds });

    const sessions = await query.getMany();
    const sessionsIds = _.map(sessions, "id");

    if (!sessions?.length) return;
    await this.sessionsRepository.delete({ id: In(sessionsIds) });
    await Promise.all(
      sessions.map(async (it) => await this.storeToken(it.accessToken))
    );

    this.eventEmitter.emit(Events.StopSessions, {
      userId,
      sessionsIds,
    });
  }
}
