import { Module } from "@nestjs/common";

import {
  getDatabaseConfig,
  getFilesStorageConfig,
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
import { FilesStorageModule } from "./libs/file-storage/files-storage.module";
import { SmsModule } from "./libs/sms/sms.module";
import { getEnv, stringToBoolean } from "./shared";
@Module({
  imports: [
    CommandModule,
    EventEmitterModule.forRoot(),
    JwtModule.forRoot(getJwtConfig()),
    DatabaseModule.forRoot(...getDatabaseConfig()),
    RedisModule.forRoot(getRedisConfig()),
    MailerModule.forRoot(getMailerConfig()),
    FilesStorageModule.forRoot(getFilesStorageConfig()),
    SmsModule.forRoot({ test: stringToBoolean(getEnv("SMS_TEST_MODE")) }),
    ...DOMAIN_MODULES(),
    ...REST_MODULES(),
  ],
})
export class AppModule {}
