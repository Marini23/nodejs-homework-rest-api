const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  console.log(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing  fields"));
  }
  next();
};

export default isEmptyBody;
