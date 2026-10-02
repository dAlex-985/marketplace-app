const globalErrorHandler = (err, req, res, next) => {
  // if we call the next method with an argument we end up in this controller. a controller with 4 parameters is an error handler. the err object is the one that we throw with new AppError - this has the message and statusCode parameters.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
