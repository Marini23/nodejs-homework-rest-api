const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const isEmptyBodyEmail = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing required field email"));
  }
  next();
};

export default isEmptyBodyEmail;
