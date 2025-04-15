import { AppError } from "../utils/appError.js";
import { tryCatchFn } from "../utils/tryCatch.js";

/**
 * Creates a middleware to validate incoming requests against a Zod schema.
 * @param {import('zod').ZodObject} schema - The Zod schema to validate the request against.
 * @returns {Function} An Express middleware function that validates req.body, req.params, and req.query.
 */
const validate = (schema) => {
  // Wrap the validation logic in tryCatchFn to handle aync errors
  const validateHandler = tryCatchFn(async (req, _res, next) => {
    // Validate the request data ( body, params, query) against the provided schema
    const result = await schema.safeParseAsync({
      body: req.body, // Request body (e.g., POST or PUT data)
      params: req.params, // URL parameters (e.g., /products/:productsId)
      query: req.query, // Query parameters (e.g., ?sort=asc)
    });

    // If validation fails, format and throw an error
    if (!result.success) {
      // Transform zod errors into a readable format with field paths and messages
      const formattedErrors = result.error.errors.map((err) => ({
        field: err.path.join("."), // Join path array into a string (e.g., "body.price")
        message: err.message, // Error message from the schema (e.g., "Price cannot be negative")
      }));
      // Throw an AppError with a JSON-stringified payload for consistent error handling
      throw new AppError(
        JSON.stringify({
          message: "Validation error", // Generic message for validation failures
          errors: formattedErrors, // Detailed list of validation errors
        }),
        400 // HTTP status code for Bad Request
      );
    }

    // If validation succeeds, attach validated data to req.validatedData
    req.validatedData = {
      body: result.data.body || {}, // Validated body data, default to empty object if undefined
      params: result.data.params || {}, // Validated URL params, default to empty object if undefined
      query: result.data.query || {}, // Validated query params, default to empty object if undefined
    };
    // Pass control to the next middleware or route handler
    next();
  });
  // Return the middleware function to be used by Express
  return (req, res, next) => validateHandler(req, res, next);

  /* 
   Return the middleware function to be used by Express
  return (req, res, next) => {
     👇 Aquí agregamos lógica extra antes y después de validateHandler
    console.log("🟡 Validando la solicitud...");

     Llamamos a validateHandler y capturamos su resultado
    validateHandler(req, res, (err) => {
      if (err) {
        console.error("🔴 Error en la validación:", err.message);
        return next(err); // Pasa el error si hubo
      }

      console.log("🟢 Validación exitosa.");
      next(); // Continúa al siguiente middleware
    });
  };
  */
};

export default validate;
