import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again in an hour!",
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const app = express();

app.use(helmet());
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Marketplace API is healthy and running",
  });
});

app.use("/api/v1/users", userRouter);

app.use("/api/v1/products", productRouter);

// this point is reached if none of the routes above were matched. matches every HTTP method and route.
app.use((req, res, next) => {
  // this AppError object ends up in the error handler middleware, which has 4 parameters.
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
