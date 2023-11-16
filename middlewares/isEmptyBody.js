const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  console.log(req.body);
  if (!keys.length) {
    return next(HttpError(400, "missing required name field"));
  }
  next();
};

// export default isEmptyBody;
