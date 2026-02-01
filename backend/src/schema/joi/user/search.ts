import Joi from "joi";

const searchSchema = Joi.object({
  topic: Joi.string().trim().required().messages({
    "any.required": "Topic is required",
    "string.empty": "Topic cannot be empty",
  }),
  word_count: Joi.number().integer().default(1500),
  language: Joi.string().trim().optional(),
});

export const searchSchemas = {
  searchSchema,
};
