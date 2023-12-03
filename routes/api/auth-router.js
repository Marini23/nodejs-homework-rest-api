import express from "express";

import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";
import {
  userSingInSchema,
  userSingUpSchema,
  userSubscriptionSchema,
} from "../../models/User.js";
import isEmptyBodyAvatar from "../../middlewares/isEmptyBodyAvatar.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userSingUpSchema),
  authController.signup
);

authRouter.post(
  "/login",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userSingInSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userSubscriptionSchema),
  authController.updateUserSubscription
);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateUserAvatar
);

export default authRouter;
