import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/globalErrorHandler.js";
import { AppError } from "./utils/appError.js";
import productRouter from "./routes/productRouter.js";
import morgan from "morgan";
import winston from "winston";

const app = express();

// Logger configuration using Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Middleware for security headers
app.use(helmet());

// Middleware for parsing JSON bodies
app.use(express.json());

app.use("/api/v1/products", productRouter);

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
