import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { executeDbOperation } from "../utils/executeDbOperation.js";

export const registerUser = async (userData) => {
  return executeDbOperation(async () => {
    const user = new User(userData);
    await user.save();

    // Generate JWT token after user registration
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  }, "Error registering user");
};

export const loginUser = async ({ email, password }) => {
  return executeDbOperation(async () => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return null; // User not found or incorrect password passed to controller
    }

    // Generate JWT token after user login
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  }, "Error logging in user");
};
