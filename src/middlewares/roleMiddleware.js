import { AppError } from "../utils/appError.js";

const roleMiddleware = (roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new AppError(
      JSON.stringify({
        message: "Authorization error",
        errors: [
          {
            field: "role",
            message: "You do not have permission to perform this action",
          },
        ],
      }),
      403
    ); // 403 for forbidden access or invalid token
  }
  next(); // Proceed to the next middleware
};

export default roleMiddleware;
