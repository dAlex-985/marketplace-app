import AppError from "../utils/appError.js";

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue).at(0);
  const value = Object.values(err.keyValue).at(0);

  const message = `Duplicate value for field '${field}': "${value}". Please use another value!`;
  return new AppError(message, 401);
};

const handleValidationErrorsDB = (err) => {
  const errors = Object.values(err.erros).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  // in development mode we show the error object as it is with the status codes, messages etc. This makes the development more productive.
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // based on the .isOperational property we make sure that we created this error so it can be shown to the client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR :", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  // the error object is either created by us, which means is operational, or is a programming bug.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // based on the environment we either send a detailed error response or a not so detailed one with status and message.
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = Object.assign(err);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorsDB(error);

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
