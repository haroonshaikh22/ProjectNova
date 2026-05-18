import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import crypto from "node:crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  // next();

  this.password = await bcrypt.hash(this.password, 10);
  // next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

userSchema.methods.generateRefreshToken = function () { 
  return jwt.sign(
    {
      _id: this._id, //payload body
    },
    process.env.REFRESH_TOKEN_SECRET, // local secret key
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // token expiry time
    },
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex"); // Generate a random token

  const hashedToken = crypto
    .createHash("sha256") // Create a SHA-256 hash instance
    .update(unHashedToken) // Update the hash with the unhashed token
    .digest("hex"); // Hash the token using SHA-256

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // Set token expiry time (e.g., 10 minutes)

  return { unHashedToken, hashedToken, tokenExpiry }; // Return both the unhashed and hashed tokens along with expiry
};
export const User = mongoose.model("User", userSchema);
