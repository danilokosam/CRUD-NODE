import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/globalErrorHandler.js";
import { AppError } from "./utils/appError.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";
import morgan from "morgan";
import winston from "winston";
import cors from "cors";

const app = express();

// Logger configuration using Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Middleware for CORS
app.use(cors());

// Middleware for security headers
app.use(helmet());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middlewarre for logging requests
app.use(morgan("dev"));

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);

// Handle unknown routes
app.use((req, _res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

export default app;
