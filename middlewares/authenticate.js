import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (!authorization) {
    next(HttpError(401, "Not authorized"));
  }
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized!"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, error.message));
  }
};

export default authenticate;
