import { RestAccountModule } from "./account/account.module";
import { RestAuthModule } from "./auth/auth.module";
import { RestBlogModule } from "./blog/blog.module";
import { RestAdminUsersModule } from "./_admin-group/users/users.module";

export const REST_MODULES = () => [
  RestAuthModule.forRoot(),
  RestAccountModule.forRoot(),
  RestBlogModule.forRoot(),

  // admin group
  RestAdminUsersModule.forRoot(),
];
