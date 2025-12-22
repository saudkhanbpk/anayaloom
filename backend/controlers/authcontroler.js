import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateOTP from "../utilities/otp.js";
import sendOTPEmail from "../config/mailer.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Optional verification check
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







// ✅ Register User
export const registerUser = async (req, res) => {  // Changed exports. to export const
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 1 * 60 * 1000, // 5 minutes
    });

    await sendOTPEmail(email, otp);

    res.status(201).json({
      success: true,
      message: "OTP sent to email",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {  
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const newOTP = generateOTP();
    
    // Update user with new OTP
    user.otp = newOTP;
    user.otpExpiry = Date.now() + 1 * 60 * 1000; // 5 minutes
    await user.save();

    // Send new OTP email
    await sendOTPEmail(email, newOTP);

    res.status(200).json({
      success: true,
      message: "New OTP sent to your email"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};