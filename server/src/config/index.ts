import { DatabaseModule } from "src/libs/database";
import { IMailerModuleOptions } from "src/libs/mailer/interfaces";
import { IRedisModuleOptions } from "src/libs/redis/interfaces";
import { getEnv, stringToBoolean } from "src/shared";
import { ENTITIES } from "./entities.config";

export const getDatabaseConfig = (): Parameters<
  typeof DatabaseModule["forRoot"]
> => {
  return [
    {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      synchronize: false,
    },
    ENTITIES,
  ];
};

export const getJwtConfig = () => {
  return { jwtKey: getEnv("JWT_KEY"), paylodKey: getEnv("JWT_PAYLOAD_KEY") };
};

export const getRedisConfig = (): IRedisModuleOptions => {
  return {
    port: Number(getEnv("REDIS_PORT")),
    host: getEnv("REDIS_HOST"),
    password: getEnv("REDIS_PASS"),
  };
};

export const getMailerConfig = (): IMailerModuleOptions => {
  const mod = getEnv("MAILER_MODE");
  if (mod === "test") return { test: true };
  if (mod === "smtp")
    return {
      test: false,
      smtp: {
        domain: getEnv("MAILER_DOMAIN"),
        port: Number(getEnv("MAILER_PORT")),
        password: getEnv("MAILER_PASSWORD"),
        login: getEnv("MAILER_LOGIN"),
        protocol: getEnv("MAILER_PROTOCOL"),
        secure: stringToBoolean(getEnv("MAILER_SECURE")),
      },
    };
  // if (mod === 'sendgrid') {
  // 	return {
  // 		test: false,
  // 		sendGrid: {
  // 			apiKey: getEnv('SENDGRID_API_KEY'),
  // 		},
  // 	}
  // }
};
