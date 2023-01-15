import { BLOG_ENTITY } from "src/domain/blog/entities";
import { SESSIONS_ENTITIES } from "src/domain/sessions/entities";
import { USERS_ENTITIES } from "src/domain/users/entities";

export const ENTITIES = [
  ...USERS_ENTITIES,
  ...SESSIONS_ENTITIES,
  ...BLOG_ENTITY,
];
