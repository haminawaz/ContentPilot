import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().trim().required().min(2).max(50).messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be at most 50 characters long",
    "any.required": "First name is required",
    "string.empty": "First name is not allowed to be empty",
  }),
  last_name: Joi.string().trim().required().min(2).max(50).messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be at most 50 characters long",
    "any.required": "Last name is required",
    "string.empty": "Last name is not allowed to be empty",
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
  phone: Joi.string()
    .trim()
    .required()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must contain only digits",
      "any.required": "Phone number is required",
      "string.empty": "Phone number is not allowed to be empty",
    }),
  password: Joi.string().trim().required().min(6).max(30).messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
    "string.empty": "Password is not allowed to be empty",
  }),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
  terms: Joi.boolean().valid(true).required().messages({
    "any.only": "You must agree to the Terms of Service and Privacy Policy",
    "any.required": "You must agree to the Terms of Service and Privacy Policy",
  }),
});

const resendOTP = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
  password: Joi.string().trim().required().min(6).max(30).messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
    "string.empty": "Password is not allowed to be empty",
  }),
});

const authToken = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
  otp: Joi.string().trim().required().min(6).max(6).messages({
    "string.min": "OTP must be at least 6 characters long",
    "string.max": "OTP must be at most 6 characters long",
    "any.required": "OTP is required",
    "string.empty": "OTP is not allowed to be empty",
  }),
});

const profileUpdate = Joi.object({
  first_name: Joi.string().trim().required().min(2).max(50).messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be at most 50 characters long",
    "any.required": "First name is required",
    "string.empty": "First name is not allowed to be empty",
  }),
  last_name: Joi.string().trim().required().min(2).max(50).messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be at most 50 characters long",
    "any.required": "Last name is required",
    "string.empty": "Last name is not allowed to be empty",
  }),
  phone: Joi.string()
    .trim()
    .required()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must contain only digits",
      "any.required": "Phone number is required",
      "string.empty": "Phone number is not allowed to be empty",
    }),
});

const passwordUpdate = Joi.object({
  old_password: Joi.string().trim().min(6).required().messages({
    "string.base": "Old password must be a string",
    "string.min": "Old password must be at least 6 characters",
    "any.required": "Old password is required",
    "string.empty": "Old password is not allowed to be empty",
  }),

  new_password: Joi.string()
    .trim()
    .min(6)
    .disallow(Joi.ref("old_password"))
    .required()
    .messages({
      "string.base": "New password must be a string",
      "string.min": "New password must be at least 6 characters",
      "any.required": "New password is required",
      "string.empty": "New password is not allowed to be empty",
      "any.invalid": "New password must be different from old password",
    }),
});

const forgotPassword = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
});

const resetPassword = Joi.object({
  password: Joi.string().trim().required().min(6).max(30).messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
    "string.empty": "Password is not allowed to be empty",
  }),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
});

export const userSchemas = {
  register: registerSchema,
  login: loginSchema,
  resendOTP,
  authToken,
  profileUpdate,
  passwordUpdate,
  forgotPassword,
  resetPassword,
};
