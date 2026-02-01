import Joi from "joi";

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),
  pageSize: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Page size must be a number",
    "number.integer": "Page size must be an integer",
    "number.min": "Page size must be at least 1",
    "number.max": "Page size must be at most 100",
  }),
  search: Joi.string().trim().allow("").optional().messages({
    "string.base": "Search query must be a string",
  }),
});
