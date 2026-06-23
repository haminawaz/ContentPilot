import Joi from "joi";

export const adminPlanSchemas = {
  planId: Joi.object({
    id: Joi.number().required().messages({
      "number.base": "Plan ID must be a number",
      "number.empty": "Plan ID is required",
      "any.required": "Plan ID is required",
    }),
  }),
  createPlan: Joi.object({
    plan_name: Joi.string().trim().max(50).required().messages({
      "string.base": "Plan name must be a string",
      "string.empty": "Plan name is required",
      "string.max": "Plan name must be at most 50 characters",
      "any.required": "Plan name is required",
    }),
    price: Joi.number().integer().min(0).required().messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),
    interval: Joi.string().trim().valid("month", "year").required().messages({
      "any.only": "Interval must be month or year",
      "any.required": "Interval is required",
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    features: Joi.array().items(Joi.string().trim()).default([]).messages({
      "array.base": "Features must be a list",
    }),
    currency: Joi.string().trim().length(3).uppercase().required().messages({
      "string.length": "Currency must be a 3-letter code",
      "any.required": "Currency is required",
    }),
    credit_limit: Joi.number().integer().min(0).required().messages({
      "number.base": "Credit limit must be a number",
      "number.min": "Credit limit cannot be negative",
      "any.required": "Credit limit is required",
    }),
    active: Joi.boolean().default(true),
    stripe_price_id: Joi.string().trim().allow("").default(""),
  }),
  updatePlan: Joi.object({
    plan_name: Joi.string().trim().max(50).messages({
      "string.max": "Plan name must be at most 50 characters",
    }),
    price: Joi.number().integer().min(0).messages({
      "number.min": "Price cannot be negative",
    }),
    interval: Joi.string().trim().valid("month", "year").messages({
      "any.only": "Interval must be month or year",
    }),
    description: Joi.string().trim(),
    features: Joi.array().items(Joi.string().trim()),
    currency: Joi.string().trim().length(3).uppercase().messages({
      "string.length": "Currency must be a 3-letter code",
    }),
    credit_limit: Joi.number().integer().min(0).messages({
      "number.min": "Credit limit cannot be negative",
    }),
    active: Joi.boolean(),
    stripe_price_id: Joi.string().trim().allow(""),
  })
    .min(1)
    .messages({
      "object.min": "Provide at least one field to update",
    }),
};
