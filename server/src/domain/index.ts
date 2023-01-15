import { getEnv } from "src/shared";
import { BlogModule } from "./blog/blog.module";
import { ConfirmationCodesModule } from "./confirmation-codes/confirmation-codes.module";
import { SessionsModule } from "./sessions/sessions.module";
import { UsersModule } from "./users/users.module";
export const DOMAIN_MODULES = () => [
  UsersModule.forRoot({
    passwordHashSalt: getEnv("LOCAL_HASH_SALT"),
  }),
  SessionsModule,
  ConfirmationCodesModule,
  BlogModule,
];
