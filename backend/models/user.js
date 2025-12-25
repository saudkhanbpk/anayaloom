import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
      role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",   // 👈 normal signup → user
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetOTP: String,
    resetOTPExpiry: Date,
    resetToken: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
