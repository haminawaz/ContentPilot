import Joi from "joi";

export const adminContentSchemas = {
  contentId: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Content ID must be a number",
      "number.empty": "Content ID is required",
      "any.required": "Content ID is required",
    }),
  }),
};
