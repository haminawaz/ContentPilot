import { userSchemas } from "./user/auth";
import { searchSchemas } from "./user/search";
import { paginationSchema } from "./common";
import { adminUserSchemas } from "./admin/user";

export default {
  ...userSchemas,
  ...searchSchemas,
  ...adminUserSchemas,
  pagination: paginationSchema,
};
