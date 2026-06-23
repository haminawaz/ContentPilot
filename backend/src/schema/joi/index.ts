import { userSchemas } from "./user/auth";
import { searchSchemas } from "./user/search";
import { paginationSchema } from "./common";
import { adminUserSchemas } from "./admin/user";
import { adminContentSchemas } from "./admin/content";
import { adminPlanSchemas } from "./admin/plan";

export default {
  ...userSchemas,
  ...searchSchemas,
  ...adminUserSchemas,
  ...adminContentSchemas,
  ...adminPlanSchemas,
  pagination: paginationSchema,
};
