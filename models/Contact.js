import Joi from "joi";

import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .pattern(new RegExp(/^[A-Za-z\s'-]+$/))
    .messages({
      "any.required": `missing required name field`,
      "string.pattern.base": `Name may contain only letters, apostrophe, dash, and spaces.`,
    }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "any.required": `missing required phone field`,
      "string.pattern.base": `Phone number must be in the format (000) 000-0000`,
    }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp(/^[A-Za-z\s'-]+$/))
    .messages({
      "string.pattern.base": `Name may contain only letters, apostrophe, dash, and spaces.`,
    }),
  email: Joi.string().email().messages({
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": `Phone number must be in the format (000) 000-0000`,
    }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
