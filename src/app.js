import express from "express";
import { errorHandler } from "./middlewares/globalErrorHandler.js";
import { AppError } from "./utils/appError.js";

const app = express();

console.log(process.env.NODE_ENV);

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware de logging (se ejecuta primero para todas las solicitudes)
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next(); // Pasa al siguiente manejador
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Test route for middleware error checking
app.get("/test-error", (req, res) => {
  throw new AppError("Test error", 400);
});

app.use(errorHandler);

export default app;
