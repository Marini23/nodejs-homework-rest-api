import contactController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";

import express from "express";

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:id", contactController.getById);

contactsRouter.post("/", isEmptyBody, contactController.add);

contactsRouter.delete("/:id", contactController.deleteById);

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default contactsRouter;
