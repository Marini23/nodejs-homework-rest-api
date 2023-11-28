import express from "express";
import contactController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isEmptyBodyStatus from "../../middlewares/isEmptyBodyStatus.js";
import validateBody from "../../decorators/validateBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactController.add
);

contactsRouter.delete("/:id", isValidId, contactController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyStatus,
  validateBody(contactFavoriteSchema),
  contactController.updateStatusContact
);

export default contactsRouter;
