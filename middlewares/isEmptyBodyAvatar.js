const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const isEmptyBodyAvatar = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "Missing field avatar"));
  }
  next();
};

export default isEmptyBodyAvatar;
