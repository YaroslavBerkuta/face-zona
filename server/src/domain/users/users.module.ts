import { PASSWORD_HASH_SALT, USERS_PASSWORD_SERVICE } from "./consts/index";
import { provideEntity } from "src/libs/database";
import { provideClass } from "src/shared";
import { USERS_REPOSITORY, USERS_SERVICE } from "./consts";
import { UsersPasswordService, UsersService, USERS_SERVICES } from "./services";
import { IUsersModuleOptions } from "./typing";
import { DynamicModule, Module } from "@nestjs/common";
import { User } from "./entities";
import { USERS_SEEDS } from "./seedes";

@Module({})
export class UsersModule {
  static options: IUsersModuleOptions;

  static getProviders() {
    return [
      provideEntity(USERS_REPOSITORY, User),
      provideClass(USERS_SERVICE, UsersService),
      provideClass(USERS_PASSWORD_SERVICE, UsersPasswordService),
      ...USERS_SERVICES,
      ...USERS_SEEDS,
      {
        provide: PASSWORD_HASH_SALT,
        useValue: UsersModule.options.passwordHashSalt,
      },
    ];
  }

  static imports() {
    return [];
  }

  static forRoot(options: IUsersModuleOptions): DynamicModule {
    UsersModule.options = options;
    return {
      module: UsersModule,
      providers: [...UsersModule.getProviders()],
      imports: UsersModule.imports(),
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: UsersModule,
      providers: [...UsersModule.getProviders()],
      imports: UsersModule.imports(),
      exports: [USERS_SERVICE, USERS_PASSWORD_SERVICE, USERS_REPOSITORY],
    };
  }
}
