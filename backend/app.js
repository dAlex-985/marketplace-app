import express from "express";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Marketplace API is healthy and running",
  });
});

// this point is reached if none of the routes above were matched. matches every HTTP method and route.
app.use((req, res, next) => {
  // this AppError object ends up in the error handler middleware, which has 4 parameters.
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
