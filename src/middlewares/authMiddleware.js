import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

const authMiddleware = (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from authorization header ( Bearer token )

  if (!token) {
    throw new AppError(
      JSON.stringify({
        message: "Authentication error",
        errors: [{ field: "token", message: "No token provided" }],
      }),
      401
    ); // 401 for without token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // { id, role }
    next(); // Proceed to the next middleware
  } catch (error) {
    throw new AppError(
      JSON.stringify({
        message: "Authentication error",
        errors: [{ field: "token", message: "Invalid or expired token" }],
      }),
      403
    ); // 403 for forbidden access or invalid token
  }
};

export default authMiddleware;