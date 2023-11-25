import express from "express";

import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import {
  userSingInSchema,
  userSingUpSchema,
  userSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSingUpSchema),
  authController.signup
);

authRouter.post(
  "/login",
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

export default authRouter;
