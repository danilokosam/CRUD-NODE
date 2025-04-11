import { AppError } from "../utils/appError.js";
import { tryCatchFn } from "../utils/tryCatch.js";

const validate = (schema) => {
  const validateHandler = tryCatchFn(async (req, res, next) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new AppError(
        JSON.stringify({
          message: "Validation error",
          errors: formattedErrors,
        }),
        400
      );
    }

    req.validatedData = {
      body: result.data.body || {},
      params: result.data.params || {},
      query: result.data.query || {},
    };

    next();
  });

  return (req, res, next) => validateHandler(req, res, next);
};

export default validate;
