//? This file contains the Joi validation schemas for the signup and login routes.

import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password must be atleast 8 characters long.",
      "string.max": "Password cannot exceed 20 chracters.",
      "string.pattern.base":
        "Password must contain one uppercase letter, one lowercase letter, one number and one special character.",
      "any.required": "Password is required.",
    }),
  fullname: Joi.string().max(20).required().messages({
    "string.max": "Fullname cannot exceed 20 chracters.",
    "any.required": "Please provide your fullname.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password must be atleast 8 characters long.",
      "string.max": "Password cannot exceed 20 chracters.",
      "string.pattern.base":
        "Password must contain one uppercase letter, one lowercase letter, one number and one special character.",
      "any.required": "Password is required.",
    }),
});
