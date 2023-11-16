import * as contactService from "../models/contacts.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contact-schemas.js";

const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const getAll = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name! field");
    }
    const result = await contactService.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  deleteById,
  add,
};
