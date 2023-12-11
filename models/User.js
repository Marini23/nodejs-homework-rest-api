import Joi from "joi";

import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const subscriptionList = ["starter", "pro", "business"];

export const userSingUpSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "any.required": `missing required password field`,
    "string.min": `Password should have at least six characters`,
  }),

  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),

  subscription: Joi.string().valid(...subscriptionList),

  token: Joi.string(),
});

export const userSingInSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "any.required": `missing required password field`,
    "string.min": `Password should have at least six characters`,
  }),

  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),

  token: Joi.string(),
});

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required field email" }),
});

const User = model("user", userSchema);

export default User;
