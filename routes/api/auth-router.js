import express from "express";

import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isEmptyBodyEmail from "../../middlewares/isEmptyBodyEmail.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";
import {
  userSingInSchema,
  userSingUpSchema,
  userSubscriptionSchema,
  userEmailSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(userSingUpSchema),
  authController.signup
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  validateBody(userEmailSchema),
  authController.resendVerify
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
