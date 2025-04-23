import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { executeDbOperation } from "../utils/executeDbOperation.js";
import { AppError } from "../utils/appError.js";
import { Token } from "../models/tokenModel.js";
import { sendEmail } from "../utils/email/senEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.development" });

const JWTSECRET = process.env.JWT_SECRET;
const BCRYPT_SALT = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

export const registerUser = async (userData) => {
  return executeDbOperation(async () => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    // If not, create a new user
    const user = new User(userData);
    await user.save();

    // Generate JWT token after user registration
    const token = jwt.sign({ id: user._id, role: user.role }, JWTSECRET, {
      expiresIn: "1h",
    });

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

export const requestPasswordReset = async (email) => {
  return executeDbOperation(async () => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    // Check if a token already exists for this user and delete it
    const existingToken = await Token.findOne({ userId: user._id });
    if (existingToken) {
      await existingToken.deleteOne();
    }

    // Generate a new token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(BCRYPT_SALT || 10));

    // Save the token in the database associated with the user
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    // Create a reset link
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    // Send the email with the reset link
    await sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.name, link },
      "./template/requestResetPassword.handlebars"
    );

    return { link };
  }, "Error requesting password reset");
};

export const resetPassword = async (userId, token, newPassword) => {
  return executeDbOperation(async () => {
    // Validate inputs
    if (!userId || !token || !newPassword) {
      throw new AppError("Missing required fields", 400);
    }

    // Find the password reset token
    const passwordResetToken = await Token.findOne({
      userId,
    });
    if (!passwordResetToken) {
      throw new AppError("Invalid or expired password reset token", 400);
    }

    // Compare the provided token with the stored hash
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new AppError("Invalid or expired password reset token", 400);
    }

    // Hash the new password
    const hash = await bcrypt.hash(newPassword, Number(BCRYPT_SALT || 10));

    // Update the user's password
    const updateResult = await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    if (updateResult.matchedCount === 0) {
      throw new AppError("User not found", 404);
    }

    // Fetch the updated user to get the email
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Send confirmation email
    await sendEmail(
      user.email,
      "Password Reset Successfully",
      { name: user.name },
      "./template/resetPassword.handlebars"
    );

    // Delete the used token
    await passwordResetToken.deleteOne();

    return { message: "Password reset successfully" };
  }, "Error resetting password");
};

export const updateUser = async (userId, updates) => {
  return executeDbOperation(async () => {
    // Validate that updates are provided
    if (!updates || Object.keys(updates).length === 0) {
      throw new AppError("No updates provided", 400);
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Fields that can be updated
    const allowedUpdates = ["name", "email", "password"];
    const updateFields = Object.keys(updates);
    const isValidUpdate = updateFields.every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidUpdate) {
      throw new AppError(
        "Invalid updates, only name, email and password can be updated",
        400
      );
    }

    // Handle password update ( hash the new password )
    if (updates.password) {
      updates.password = await bcrypt.hash(
        updates.password,
        Number(BCRYPT_SALT || 10)
      );
    }

    // Handle email update ( check for uniqueness )
    if (updates.email && updates.email !== user.email) {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser) {
        throw new AppError("Email is already in use", 400);
      }
    }

    // Update the user
    Object.assign(user, updates);
    await user.save();

    // Send confirmation email if email or password was updated
    if (updates.email || updates.password) {
      await sendEmail(
        user.email,
        "Profile Updated Successfully",
        { name: user.name },
        "./template/profileUpdated.handlebars"
      );
    }

    return { message: "User updated successfully", user };
  }, "Error updating user");
};
