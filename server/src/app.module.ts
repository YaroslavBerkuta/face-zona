import { Module } from "@nestjs/common";

import {
  getDatabaseConfig,
  getJwtConfig,
  getMailerConfig,
  getRedisConfig,
} from "./config";
import { DOMAIN_MODULES } from "./domain";
import { DatabaseModule } from "./libs/database";
import { JwtModule } from "./libs/jwt";
import { CommandModule } from "nestjs-command";
import { REST_MODULES } from "./rest";
import { RedisModule } from "./libs/redis";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MailerModule } from "./libs/mailer/mailer.module";
@Module({
  imports: [
    CommandModule,
    EventEmitterModule.forRoot(),
    JwtModule.forRoot(getJwtConfig()),
    DatabaseModule.forRoot(...getDatabaseConfig()),
    RedisModule.forRoot(getRedisConfig()),
    MailerModule.forRoot(getMailerConfig()),
    ...DOMAIN_MODULES(),
    ...REST_MODULES(),
  ],
})
export class AppModule {}
