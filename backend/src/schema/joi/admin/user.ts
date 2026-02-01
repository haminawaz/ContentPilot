import Joi from "joi";

export const adminUserSchemas = {
  updateStatus: Joi.object({
    status: Joi.string().valid("active", "blocked").required().messages({
      "string.base": "Status must be a string",
      "string.empty": "Status is required",
      "any.required": "Status is required",
      "any.only": "Status must be active or blocked",
    }),
  }),
  userId: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "User ID must be a number",
      "number.empty": "User ID is required",
      "any.required": "User ID is required",
    }),
  }),
};
