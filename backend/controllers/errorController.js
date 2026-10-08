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
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;
